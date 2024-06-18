import { Link } from "expo-router";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Header from "../../layout_patterns_components/Header";
import ProtectedRoute from "../../../protected_router/ProtectedRoute";
import api from "../../../api";
import { useEffect, useState } from "react";


function Caixa_relatos_admin() {

    const [relatos, setRelatos] = useState([])
    const [tipoRelatos, setTipoRelatos] = useState([])
    const [carregamento, setCarregamento] = useState(false)
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
                const response = await api.get("/api/ouvidoria/v1/reclamacoes/")

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


    // const relatos = [
    //     {
    //         id_chamado: 1,
    //         titulo: "Radio com problema",
    //         texto_chamado: "Radio está com problemas elétricos",
    //         id_bloco: "",
    //         id_sala: "",
    //         campos: "IFPI-Floriano",
    //         status: "lida",
    //         situação: "1-aberto"
    //     },
    //     {
    //         id_chamado: 2,
    //         titulo: "Radio com problema",
    //         texto_chamado: "Radio está com problemas elétricos",
    //         id_bloco: "",
    //         id_sala: "",
    //         campos: "IFPI-Floriano",
    //         status: "lida",
    //         situação: "1-aberto"
    //     },
    //     {
    //         id_chamado: 3,
    //         titulo: "Radio com problema",
    //         texto_chamado: "Radio está com problemas elétricos",
    //         id_bloco: "",
    //         id_sala: "",
    //         campos: "IFPI-Floriano",
    //         status: "lida",
    //         situação: "1-aberto"
    //     },

    // ]

    useEffect(() => {
        const get_status_reclamacao =  async () => {

            try {
                const response = await api.get("/api/ouvidoria/v1/tiposeclamacoes/");
    
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

    console.log("\ntipo_chamado_reclamação: ", tipoRelatos) 

    const relatosCompletos = relatos.map(relato => {
        const tipoRelatoDescricao = tipo_relato.find(tr => tr.id === relato.status_reclamacao)?.descricao || "";
        return tipoRelatoDescricao
    });

    console.log("Rela: ", relatosCompletos)

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

                {relatos ? 
                        (<FlatList
                            data={relatos}
                            renderItem={({item}) => (
                                <View style={styles.list_item}>
                                    <Text style={{color: "darkblue", fontSize: 25, fontWeight: "500"}}>{item.titulo}</Text>

                                    <Text>{item.descricao_reclamacao}</Text>

                                    <Text style={{fontWeight: 500, fontSize: 12}}>
                                        Status: <Text>
                                                    {item.status_reclamacao === 1 ? "Estrutural" : ""}
                                                    {item.status_reclamacao === 2 ? "Pessoal" : ""}
                                                    {item.status_reclamacao === 3 ? "Acadêmico" : ""}
                                                </Text>
                                    </Text>

                                    <Pressable onPress={() => Alert.alert("É melhoor")}>
                                        <Text style={styles.botao_fechamento}>
                                            Solicitar fechamento
                                        </Text>
                                    </Pressable>

                                    <Text style={{marginTop: 50}}>{item.data_reclamacao}</Text>
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
    }
})