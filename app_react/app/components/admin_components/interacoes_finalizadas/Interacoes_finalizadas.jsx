import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Area_admin from "../Area_admin";
import ProtectedRoute from "../../../protected_router/ProtectedRoute";
import { useEffect, useState } from "react";
import Header from "../../layout_patterns_components/Header";
import api from "../../../api";
import { useAuth } from "../../../auth_context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons"

function Interacoes_finalizadas() {
    const {decodeToken, getCurrentDateFormatted} = useAuth();
    const [usuarioId, setUsuarioId] = useState("")
    const [carregamento, setCarregamento] = useState(false)
    const [interacoesFinalizadas, setInteracoesFinalizadas] = useState([])

    const loadToken = async () => {
        try {
            const token_response = await AsyncStorage.getItem("token")
            return token_response

        } catch (error) {
            console.log("Erro ao acessar o token")
        }
    }

    useEffect(() => {
        const processToken = async () => {
            const token = await loadToken();
            console.log("Token no usuário: " + token);
        
            if (token) {
                try {
                    const tokenDecodificado = decodeToken(token);
                    console.log("Token decode no nova_interação: ", tokenDecodificado);
                    setUsuarioId(tokenDecodificado.user_id)
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

    // puxar interações finalizadas - GET
    useEffect(() => {

        const interacoes_finalizadas = async () => {
            setCarregamento(true)
            try {
                const response = await api.get(`/api/ouvidoria/v1/reclamacoes/?status_reclamacao_id=${encodeURIComponent(2)}`)
                
                if (response.status < 200 && response.status >= 300) {
                    throw new Error("Erro ao alterar interação")
                }

                console.log("Interações finalizadas: ", response.data)
                setInteracoesFinalizadas(response.data.results)

            } catch (error) {
                console.log("Erro ao puxar as interções finalizadas: " + error.status)
            } finally {
                setCarregamento(false)
            }
        }
    
        interacoes_finalizadas(usuarioId)
    }, [])

    const handleRemoveItem = (id) => {
        setInteracoesFinalizadas(interacoesFinalizadas.filter(item => item.id !== id))
    }

    return (
        <ProtectedRoute>
             <Header/>

            <View style={styles.titulo_container}>
                <Text style={styles.titulo}>
                    Acompanhe as sugestões finalizadas
                </Text>
            </View>
            
            <View style={styles.container}>

                {carregamento ? <ActivityIndicator size={"large"} color="#fff"/> : ""}

                {interacoesFinalizadas ? 
                    <FlatList
                    data={interacoesFinalizadas}
                    renderItem={({item}) => (
                        <View style={styles.list_item}>
                                    <Text style={{color: "darkblue", fontSize: 25, fontWeight: "500"}}>{item.titulo}</Text>
                                    <Text>{item.descricao_reclamacao}</Text>

                                    <Text style={{fontWeight: 500, fontSize: 12}}>
                                        Tipo: <Text>
                                                    {item.tipo_reclamacao === 2 ? "Pessoal" : ""}
                                                    {item.tipo_reclamacao === 3 ? "Acadêmico" : ""}
                                                    {item.tipo_reclamacao === 1 ? "Estrutural" : ""}
                                                </Text>
                                    </Text>
                                    <Text style={{fontWeight: 500, fontSize: 12}}>
                                        Status: <Text>
                                                    {item.status_reclamacao === 1 ? "Andamento" : ""}
                                                    {item.status_reclamacao === 2 ? "Finalizada" : ""}
                                                    {item.status_reclamacao === 3 ? "Cancelada" : ""}
                                                </Text>
                                    </Text>

                                    <Pressable onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                                        <Icon name="trash" size={20} color={"red"}/>
                                    </Pressable>

                                    <Text style={{marginTop: 50}}>{getCurrentDateFormatted(item.data_reclamacao)}</Text>
                                    <Text>IFPI-Floriano</Text>
                                </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled
                  />
                : <Text>Não há relatos!</Text>}
            </View>
        </ProtectedRoute>
    )
}

export default Interacoes_finalizadas

const styles = StyleSheet.create({
    header_container : {
        width: "100%",
        height: 200,
        backgroundColor: "#06b8ff",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5, // For Android
    },
    header: {
        color: "#fff",
        marginTop: 10,
        marginLeft: 10,
        fontWeight: "500",
        fontSize: 30,
        textShadowColor: "#000",
        textShadowRadius: 10
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#fff",
        width: 100,
        height: 30,
        shadowColor: "#000",
        shadowRadius: 5,
        marginLeft: 20,
    },
    buttonText: {
        color: "#000",
        fontSize: 20,
    },
    titulo_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#06b8ff",
        width: 300,
        height: 60,
        borderRadius: 10,
        marginTop: 50,
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
        fontWeight: "500",
        textAlign: "center"
    },
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: 50,
        marginTop: 15,
        paddingBottom: 5,
    },
    list_item: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: 300,
        height: 300,
        backgroundColor: "#fff",
        borderRadius: 20,
        marginBottom: 20,
        padding: 20,
        gap: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 50,
        elevation: 2, // For Android
    },
    botao_fechamento: {
        backgroundColor: "#12c6ff", 
        color: "#fff",
        width: 200,
        height: 50,
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 16,
        borderRadius: 20,
        borderStyle: "solid",
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
})