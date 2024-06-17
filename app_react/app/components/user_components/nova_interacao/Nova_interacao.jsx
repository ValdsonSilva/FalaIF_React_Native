import { View, TextInput, StyleSheet, Text, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import Header from "../../layout_patterns_components/Header"
import Footer from "../../layout_patterns_components/Footer"
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../../protected_router/ProtectedRoute';
import api from '../../../api';
import { useAuth } from '../../../auth_context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate
}

function Nova_interacao() {
    const [idTipoChamado, setIdTipoChamado] = useState('');
    const [titulo, setTitulo] = useState('');
    const [textoChamado, setTextoChamado] = useState('');
    const [bloco, setBloco] = useState('');
    const [mensagem, setMensagem] = useState("")
    const {decodeToken} = useAuth();
    const [user_id, setUserid] = useState("")
    const date = getCurrentDate();

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

        try {
                const response = await api.post("/api/ouvidoria/v1/reclamacoes/",{
                    usuario: user_id,
                    status_reclamacao: 0,
                    tipo_reclamacao: idTipoChamado,
                    bloco: bloco,
                    data_reclamacao: date,
                    descricao_reclamacao: textoChamado,
                    titulo: titulo,
                    lida: true
                })
                setMensagem("Reclamação registrada!")
        } catch (error) {
                setMensagem("Erro ao enviar reclamação!")
        } 

        Alert.alert('Formulário enviado!', `Tipo Chamado: ${idTipoChamado}\nTítulo: ${titulo}\nTexto: ${textoChamado}\nBloco: ${bloco}`);
    };

    setTimeout(() => {
        setMensagem("")
    }, 5000)

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
                    <TextInput
                        style={styles.input}
                        value={idTipoChamado}
                        onChangeText={setIdTipoChamado}
                        placeholder="Informe o tipo do chamado"
                    />
                    
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
                    <TextInput
                        style={styles.input}
                        value={bloco}
                        onChangeText={setBloco}
                        placeholder="Informe bloco"
                    />
                    
                    <Pressable
                        onPress={handleSubmit}
                    >
                        <Text style={styles.botao_enviar}>Enviar</Text>
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
        // flex: 1,
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