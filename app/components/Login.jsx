import { useState } from "react";
import { 
    Text, 
    StyleSheet,
    TextInput, 
    View, 
    TouchableOpacity,
} from "react-native";
import Header from "./Header";

function Login() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    // função que altera o texto
    const toggleName = (text) => {
        setUserName(text)
    }

    const togglePassword = (senha) => {
        setPassword(senha)
    }

    const toggleResetar = () => {
        setUserName('')
        setPassword('')
    }

    return (
        <>  
            <Text style={styles.nome}>Olá, Dev, seja bem-vindo!</Text>
            <Header/>
            <View style={styles.caixa}>
                <Text style={styles.texto}>Login {username ? `do ${username}` : ""}</Text>
                <TextInput 
                    placeholder="Informe seu nome" 
                    value={username} 
                    onChangeText={toggleName}
                    style={styles.inputText}
                />

                <TextInput
                    style={styles.inputText}
                    placeholder="Informe sua senha"
                    value={password}
                    onChangeText={togglePassword}
                />


                <View style={styles.button}>
                    <TouchableOpacity onPressIn={toggleResetar}>
                        <Text style={styles.buttonText}>Resetar</Text>
                    </TouchableOpacity>
                </View>

                {username && (
                    <Text>Olá, {username}</Text>
                )}
            </View>
        </>
    )
}

export default Login;

const styles = StyleSheet.create({
    caixa: {
        backgroundColor: "#fff",
        height: "50%",
        width: "100%",
        marginTop: "5%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 10,
        gap: 30
    },
    texto:{
        fontWeight: "500",
        fontSize: 20
    },
    nome: {
        color: "#fff",
        marginTop: 100,
        marginBottom: 50,
        fontWeight: "500",
        fontSize: 30,
        textShadowColor: "#000",
        textShadowRadius: 10
    },
    inputText: {
        color: "#000",
        backgroundColor:"transparent",
        height: "10%",
        width: 300,
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: "#000",
        borderWidth: 1
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#297ded",
        width: 100,
        height: 30,
    },
    buttonText: {
        color: "#fff"
    }
});