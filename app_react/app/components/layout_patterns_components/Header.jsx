import { Link } from "expo-router"
import { StyleSheet, View } from "react-native"
// import second from '../user_components/User_area'


function Header() {
    return (
        <View style={styles.header_container}>
            <View style={styles.button}>
                {/* dessa forma o link retorna a tela anterior */}
                <Link href='../' style={styles.buttonText}>
                    Voltar
                </Link>
            </View>            
        </View>
    )
}

export default Header

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
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
    },
    buttonText: {
        color: "#000",
        fontSize: 20,
    },
})