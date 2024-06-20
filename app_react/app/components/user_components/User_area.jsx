import { Link } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import Footer from "../layout_patterns_components/Footer";
import ProtectedRoute from "../../protected_router/ProtectedRoute";
import { useAuth } from "../../auth_context/AuthContext";

function Perfil() {
    const {logout} = useAuth()

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
                <Link style={styles.nova_interacao} href="../user_components/nova_interacao/Nova_interacao">  
                    <Text style={styles.texto_grande}>Nova interação{`\n`}</Text>
                    <Text style={styles.texto_pequeno}>
                        Nos diga o que você quer nos contar ;)
                    </Text>
                </Link>
                <Link style={styles.acompanha_interacoes} href="../user_components/user_interacoes/User_interacoes">
                    <Text style={styles.texto_grande}>Acompanhe suas interações{`\n`}</Text>
                    <Text style={styles.texto_pequeno}>
                        Vejas as interaçõea ativas ;)*
                    </Text>
                </Link>
                <Link style={styles.interacoes_finalizadas} href="../user_components/Interacoes_finalizadas/Interacoes_usuario_finalizadas">
                    <Text style={styles.texto_grande}>Interações finalizadas{`\n`}</Text>
                    <Text style={styles.texto_pequeno}>
                        Revisite suas ideias ;)*
                    </Text>
                </Link>
            </View>

            <Footer/>
        </ProtectedRoute>
    )
}

export default Perfil


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
        flex: 1,
        alignItems: 'center',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 50,
        marginTop: 100,
        width: "100%",
        height: "auto",
        // backgroundColor: "red",
    },
    nova_interacao: {
        backgroundColor: "#ef4949",
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
    acompanha_interacoes: {
        backgroundColor: "#d0d508",
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
        backgroundColor: "#2bd508",
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
    texto_grande: {
        fontSize: 20,
        fontWeight: "800"
    },
    texto_pequeno: {
        fontSize: 13
    }
})