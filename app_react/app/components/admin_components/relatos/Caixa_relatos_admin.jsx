import { Link } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Header from "../../layout_patterns_components/Header";


function Caixa_relatos_admin() {

    const relatos = [
        {
            id_chamado: 1,
            titulo: "Radio com problema",
            texto_chamado: "Radio está com problemas elétricos",
            id_bloco: "",
            id_sala: "",
            campos: "IFPI-Floriano",
            status: "lida",
            situação: "1-aberto"
        },
        {
            id_chamado: 2,
            titulo: "Radio com problema",
            texto_chamado: "Radio está com problemas elétricos",
            id_bloco: "",
            id_sala: "",
            campos: "IFPI-Floriano",
            status: "lida",
            situação: "1-aberto"
        },
        {
            id_chamado: 3,
            titulo: "Radio com problema",
            texto_chamado: "Radio está com problemas elétricos",
            id_bloco: "",
            id_sala: "",
            campos: "IFPI-Floriano",
            status: "lida",
            situação: "1-aberto"
        },

    ]

    return (
        <>
            <Header/>

            <View style={styles.titulo_container}>
                <Text style={styles.titulo}>
                    Acompanhe as sugestões dos alunos
                </Text>
            </View>
            
            <View style={styles.container}>
                <FlatList
                    data={relatos}
                    renderItem={({item}) => (
                        <View style={styles.list_item}>
                            <Text style={{color: "darkblue", fontSize: 25, fontWeight: 500}}>{item.titulo}</Text>
                            <Text>{item.texto_chamado}</Text>
                            <Text style={{fontWeight: 500, fontSize: 12}}>Status: <Text>{item.status}</Text></Text>

                            <Pressable onPress={() => Alert.alert("É melhoor")}>
                                <Text style={styles.botao_fechamento}>
                                    Solicitar fechamento
                                </Text>
                            </Pressable>
                            <Text style={{marginTop: 50}}>Jun, 05, 2024, 5:59 p.m.</Text>
                            <Text>IFPI-Floriano</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id_chamado.toString()}
                    scrollEnabled
                />
            </View>
        </>
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