import { View, TextInput, StyleSheet, Text, Alert, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import Header from "../../layout_patterns_components/Header"
import Footer from "../../layout_patterns_components/Footer"
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../../protected_router/ProtectedRoute';
import api from '../../../api';
import { useAuth } from '../../../auth_context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from "@react-native-picker/picker";

const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate
}

function Nova_interacao() {
    const [idTipoChamado, setIdTipoChamado] = useState('');
    const [titulo, setTitulo] = useState('');
    const [textoChamado, setTextoChamado] = useState('');
    const [mensagem, setMensagem] = useState("")
    const [bloco, setBloco] = useState('');
    const {decodeToken} = useAuth();
    const [user_id, setUserid] = useState("")
    const date = getCurrentDate();
    const [loading, setLoading] = useState(false);

    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;

        } catch (error) {
            console.error("Error fetching token", error);
            return null;

        }
    };

    useEffect(() => {
        const processToken = async () => {
            const token = await loadToken();
            console.log("Token no usuário: " + token);
        
            if (token) {
                try {
                    const tokenDecodificado = decodeToken(token);
                    console.log("Token decode no nova_interação: ", tokenDecodificado);
                    setUserid(tokenDecodificado.user_id)
                } catch (error) {
                    console.error("Erro ao decodificar o token: ", error);
                }
            } else {
                console.log("No token found");
                return null
            }
        };
        processToken()
    }, [])

    // const token_processado = processToken()
    // setUserid(token_processado)
    console.log("Id do usuário: ", user_id)

    const handleSubmit = async () => {
        // Aqui você pode adicionar a lógica de envio do formulário
        setLoading(true)
        try {
                const response = await api.post("/api/ouvidoria/v1/reclamacoes/",{
                    usuario: user_id,
                    status_reclamacao: 1,
                    tipo_reclamacao: idTipoChamado,
                    bloco: bloco,
                    data_reclamacao: date,
                    descricao_reclamacao: textoChamado,
                    titulo: titulo,
                    lida: false
                })
                setMensagem("Reclamação registrada!")
        } catch (error) {
                setMensagem("Erro ao enviar reclamação!")
        } finally {         
            console.log("Form enviado")
            setIdTipoChamado('');
            setTitulo('')
            setTextoChamado('')
            setBloco('')
            setLoading(false)
        }
    };

    useEffect(() => {
        const get_status_reclamacao =  async () => {

            try {
                const response = await api.get("/api/ouvidoria/v1/blocos/");
    
                if (response.status < 200 && response.status >= 300) {
                    throw new Error("Erro");
                }
    
                console.log("\ntipo_chamado_reclamação: ", response.data)
    
            } catch (error) {
                console.log("Erro ao puxar os status de reclamação")
            }
        }
        get_status_reclamacao()
    }, [])

    setTimeout(() => {
        setMensagem("")
    }, 20000)

    return (
        <ProtectedRoute>
            <Header/>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
            <View style={styles.titulo_container}>
                <Text style={styles.titulo}>
                    Registre a sua reclamação
                </Text>
            </View>

            <View style={styles.container}>
                    <Text style={mensagem === "Reclamação registrada!" ? styles.sucesso : styles.erro}>{mensagem !== "" ? mensagem : ""}</Text>
                    <Text style={styles.label}>Tipo chamado</Text>
                    <Picker 
                        selectedValue={idTipoChamado}
                        style={styles.input}
                        onValueChange={(itemValue, itemIndex) => setIdTipoChamado(itemValue)}
                    >
                        <Picker.Item label='Informe o tipo do chamado' value={""}/>
                        <Picker.Item label='Estrutural' value={1}/>
                        <Picker.Item label='Pessoal' value={2}/>
                        <Picker.Item label='Acadêmico' value={3}/>
                    </Picker>
                    
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        style={styles.input}
                        value={titulo}
                        onChangeText={setTitulo}
                        placeholder="Informe o título do chamado"
                    />
                    
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={styles.input}
                        value={textoChamado}
                        onChangeText={setTextoChamado}
                        placeholder="Informe a descrição do chamado"
                        multiline
                    />
                    
                    <Text style={styles.label}>Bloco</Text>
                    <Picker
                        selectedValue={bloco}  
                        onValueChange={setBloco}
                        style={styles.input}  
                    >
                        <Picker.Item label="Informe o bloco"  value={""}/>
                        <Picker.Item label="Bloco J" value={1}/>
                        <Picker.Item label="Bloco T" value={2}/>
                        <Picker.Item label="Pátio" value={3}/>
                        <Picker.Item label="Laboratório de informática" value={4}/>
                    </Picker>
                    
                    <Pressable
                        onPress={handleSubmit}
                    >   
                        <Text style={styles.botao_enviar}>
                            {loading ? (
                                        <ActivityIndicator size={"small"} color={"#fff"}/>
                                    ) : (
                                        <Text>Enviar</Text>
                                    )}
                        </Text>
                    </Pressable>
            </View>


            {/* <Footer/> */}
            </KeyboardAvoidingView>
        </ProtectedRoute>
    )
}

export default Nova_interacao

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#64ffbb",
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingBottom:30,
    },
    scrollContainer: {
        // padding: 20,
        // flexGrow: 1,
    },
    sucesso : {
        fontSize: 30,
        fontWeight: "600",
        color: "green"
    },
    erro : {
        fontSize: 30,
        fontWeight: "600",
        color: "red"
    },
    titulo_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#06b8ff",
        width: 300,
        height: 60,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0,
        shadowRadius: 50,
        elevation: 5, // For Android
    },
    titulo: {
        color: "#fff",
        textShadowColor: "#000",
        textShadowRadius: 7,
        fontSize: 16,
        fontWeight: "500"
    },
    botao_enviar: {
        backgroundColor: "#12c6ff", 
        color: "#fff",
        width: 200,
        height: 50,
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 16,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
    },
    label: {
        color: "#000",
        fontWeight: "500",
        textAlign: "left",
        width: 300
    },
    input: {
        backgroundColor: "#fff",
        width: 300,
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
    }
})