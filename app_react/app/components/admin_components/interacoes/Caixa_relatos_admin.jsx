import { Link, router, useSegments } from "expo-router";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Header from "../../layout_patterns_components/Header";
import ProtectedRoute from "../../../protected_router/ProtectedRoute";
import api from "../../../api";
import { useEffect, useState } from "react";
import { useAuth } from "../../../auth_context/AuthContext";


function Caixa_relatos_admin() {
    const {getCurrentDateFormatted} = useAuth()
    const [relatos, setRelatos] = useState([])
    const [tipoRelatos, setTipoRelatos] = useState([])
    const [carregamento, setCarregamento] = useState(false)
    const [loading, setLoading] = useState({})
    const segments = useSegments();
    const tipo_relato = [
        {   
            descricao: "Estrutural", 
            id: 1}, 
        {
            descricao: "Pessoal", 
            id: 2
        }, 
        {
            descricao: "Acadêmico", 
            id: 3
        }
    ]

    useEffect(() => {

        const carregar_relatos = async () => {
            setCarregamento(true)
            try {
                const response = await api.get(`/api/ouvidoria/v1/reclamacoes/`)

                if (response.status < 200 || response.status >= 300) {
                    throw new Error("Erro nos relatos" + response.status)
                }

                setRelatos(response.data.results)
                console.log("Relatos: ", response.data.results)
                

            } catch (error) {
                console.log("Erro ao carregar relatos " + error.status)

            } finally {
                setCarregamento(false)
            }
        }

        carregar_relatos()
    }, [])

    useEffect(() => {
        const get_status_reclamacao =  async () => {

            try {
                const response = await api.get("/api/ouvidoria/v1/statusreclamacoes/");
    
                if (response.status < 200 && response.status >= 300) {
                    throw new Error("Erro");
                }
    
                setTipoRelatos(response.data.results)
            } catch (error) {
                console.log("Erro ao puxar os status de reclamação")
            }
        }
        get_status_reclamacao()
    }, [])

    function handleFechamento(id, id_usuario, tipo_reclamacao, bloco, data_reclamacao, descricao, titulo) {
        
        const solicitar_fechamento = async (id, id_usuario, tipo_reclamacao, bloco, data_reclamacao, descricao, titulo) => {
            setLoading(prevState => ({...prevState, [id]: true}))
            try {
                const response = await api.patch(`/api/ouvidoria/v1/reclamacoes/${id}/`, {
                    usuario: id_usuario,
                    status_reclamacao: 2, // manual (finalizada == 2)
                    tipo_reclamacao: tipo_reclamacao,
                    bloco: bloco,
                    data_reclamacao: data_reclamacao,
                    descricao_reclamacao: descricao,
                    titulo: titulo,
                    lida: true // manual
                })

                if (response.status < 200 && response.status >= 300) {
                    throw new Error("Erro")
                }
                console.log("Fechamento: ", response)

            } catch (error) {
                console.log("Erro ao solicitar fechamento da reclamação: " + error.status)
            } finally {
                setLoading(prevState => ({...prevState, [id]: false}))
                reloadScreen()
            }
        }

        solicitar_fechamento(id, id_usuario, tipo_reclamacao, bloco, data_reclamacao, descricao, titulo)
    }

    const reloadScreen = () => {
        const currentRoute = segments.join('/');
        router.replace(currentRoute);
    };

    console.log("tipo_chamado_reclamação: ", tipoRelatos) 

    const relatosCompletos = relatos.map(relato => {
        const tipoRelatoDescricao = tipo_relato.find(tr => tr.id === relato.status_reclamacao)?.descricao || "";
        return tipoRelatoDescricao
    });

    const relatosFiltrados = relatos.filter(relato => relato.status_reclamacao == 1)

    console.log("Rela: ", relatosCompletos)
    console.log("Relatos em Andamento: ", relatosFiltrados)

    return (
        <ProtectedRoute>
            <Header/>

            <View style={styles.titulo_container}>
                <Text style={styles.titulo}>
                    Acompanhe as sugestões dos alunos
                </Text>
            </View>
            
            <View style={styles.container}>

                {carregamento ? <ActivityIndicator size={"large"} color="#fff"/> : ""}

                {relatosFiltrados ? 
                        (<FlatList
                            data={relatosFiltrados}
                            renderItem={({item}) => (
                                <View style={styles.list_item}>
                                    <Text style={{color: "darkblue", fontSize: 25, fontWeight: "500"}}>{item.titulo}</Text>
                                    <Text>{item.descricao_reclamacao}</Text>
                                    <Text>{item.status_reclamacao}</Text>
                                    <Text style={{fontWeight: 500, fontSize: 12}}>
                                        Status: <Text>
                                                    {item.tipo_reclamacao === 1 ? "Estrutural" : ""}
                                                    {item.tipo_reclamacao === 2 ? "Pessoal" : ""}
                                                    {item.tipo_reclamacao === 3 ? "Acadêmico" : ""}
                                                </Text>
                                    </Text>

                                    <Pressable  onPress={item.status_reclamacao !== 2 ? () => handleFechamento(item.id, item.usuario, item.status_reclamacao, item.bloco, item.data_reclamacao, item.descricao_reclamacao, item.titulo) : null}>

                                        {loading[item.id] ? (<ActivityIndicator size={"small"} color="blue"/>) : (<Text style={ item.status_reclamacao !== 2 ? styles.botao_fechamento : styles.botao_fechamento_desabilitado}>
                                            Solicitar fechamento
                                        </Text>)}

                                    </Pressable>

                                    <Text style={{marginTop: 50}}>{getCurrentDateFormatted(item.data_reclamacao)}</Text>
                                    <Text>IFPI-Floriano</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled
                        />)
                : (<Text>Não há relatos!</Text>)}

            </View>
        </ProtectedRoute>
    )
}

export default Caixa_relatos_admin



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
    botao_fechamento_desabilitado : {
        backgroundColor: "#d1d1da", 
        color: "#a9a9ac",
        width: 200,
        height: 50,
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 16,
        borderRadius: 20,
        borderStyle: "solid",
        borderColor: "#000",
    }
})