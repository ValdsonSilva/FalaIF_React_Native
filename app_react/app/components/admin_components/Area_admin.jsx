import { Link } from "expo-router"
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native"
import Footer from "../layout_patterns_components/Footer"
import ProtectedRoute from "../../protected_router/ProtectedRoute"
import { useAuth } from "../../auth_context/AuthContext"


function Area_admin() {

    const {logout} = useAuth();

    return (
        <ProtectedRoute>  
            {/* header */}
            <View style={styles.header_container}>
                <Text style={styles.header}>
                    FalaIF
                </Text>

                <View style={styles.button}>
                    <Link style={styles.buttonText} href="/" onPress={() => logout()}>
                        Sair
                    </Link>
                </View>
            </View>

            {/* Links de navegação */}
            <View style={styles.nav_container}>
                <Link style={styles.interacoes_alunos} href="./interacoes/Caixa_relatos_admin">  
                    Acompanhe as interações dos alunos{`\n`}
                    <Text style={styles.texto_pequeno}>
                        Vejas as interaçõea ativas ;)
                    </Text>
                </Link>
                <Link style={styles.interacoes_finalizadas} href="./interacoes_finalizadas/Interacoes_finalizadas">
                    Interações finalizadas{`\n`}
                    <Text style={styles.texto_pequeno}>
                        Vejas as interaçõea finalizadas ;)*
                    </Text>
                </Link>
            </View>

            <Footer/>
        </ProtectedRoute>
    )
}

export default Area_admin


const styles = StyleSheet.create({
    header_container : {
        width: "100%",
        height: 200,
        backgroundColor: "#06b8ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 200,
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
    },
    buttonText: {
        color: "#000",
        fontSize: 20,
    },
    nav_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
        marginTop: 100,
        width: "100%",
        height: "auto",
        // backgroundColor: "red",
    },
    interacoes_alunos: {
        backgroundColor: "#e0e804",
        color: "#fff",
        // sintaxe para desenvolver voltado para o so
        ...Platform.select({
            ios: {
                // Shadow for iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 5,
            },
            android: {
                elevation: 10,
            }
        }),
        width: 300,
        height: 80,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 5,
        textShadowColor: "#000",
        textShadowRadius: 5,
        fontSize: 15,
        fontWeight: "500"
    },
    interacoes_finalizadas: {
        backgroundColor: "#2ec80e",
        color: "#fff",
        // sintaxe para desenvolver voltado para o so
        ...Platform.select({
            ios: {
                // Shadow for iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 5,
            },
            android: {
                elevation: 10,
            }
        }),
        width: 300,
        height: 80,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 5,
        textShadowColor: "#000",
        textShadowRadius: 5,
        fontSize: 20,
        fontWeight: "500"
    }, 
    texto_pequeno: {
        fontSize: 10,
        textAlign: "right"
    }
})