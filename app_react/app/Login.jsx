import { useState } from "react";
import { 
    Text, 
    StyleSheet,
    TextInput, 
    View, 
    TouchableOpacity,
    Platform,
    Alert,
} from "react-native";
import Footer from "./Footer";

function Login() {
    // estado inicial
    const [formData, setFormData] = useState({
        login: '',
        senha: ''
    })

    // atuliazar estados
    const handleInputChange = (login, value) => {
        setFormData({
            ...formData,
            [login]: value
        })
    }

    // exibir os dados enviados
    const handleSubmit = () => {
        Alert.alert('Form Submitted', `Name: ${formData.login}\nEmail: ${formData.senha}`);
        setFormData({
            login: '',
            senha: '',
        })
    }

    return (
        <>  
            <View style={styles.header_container}>
                <Text style={styles.header}>
                    Central de Comunicação do IFPI
                </Text>
                <Text style={styles.texto_menor}>
                    Sua opinião também é importante!{'\n'}
                    Nos conte como podemos melhorar ou se algo está fora do lugar!
                </Text>
            </View>

            {/* formulário */}
            <View style={styles.form}>

                <View style={styles.titulo_container}>
                    <Text style={styles.titulo}>
                        SIGEM
                    </Text>
                </View>

                <View style={styles.container}>
                    <Text>Login:</Text>
                    <TextInput 
                        placeholder="Informe seu nome" 
                        value={formData.login} 
                        onChangeText={(value) => handleInputChange('login', value)}
                        style={styles.inputText}
                    />
                </View>

                <View style={styles.container}>
                    <Text>Senha:</Text>                
                    <TextInput
                        style={styles.inputText}
                        placeholder="Informe sua senha"
                        value={formData.senha}
                        onChangeText={(value) => handleInputChange('senha', value)}
                    />
                </View>

                <View style={styles.button}>
                    <TouchableOpacity onPressIn={handleSubmit}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* footer */}
            <Footer/>
        </>
    )
}

export default Login;

const styles = StyleSheet.create({
    header_container : {
        width: "100%",
        height: 200,
        backgroundColor: "#06b8ff",
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
    texto_menor: {
        color: "#fff",
        marginLeft: 10,
        fontWeight: "500",
        fontSize: 15,
        textShadowColor: "#000",
        textShadowRadius: 10
    },
    titulo_container: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#06b8ff",
        width: 300,
        height: 40,
        borderRadius: 6,
    },
    titulo:{
        fontWeight: "500",
        fontSize: 20,
        color: "#fff",
        marginLeft: 5
    },
    form: {
        // backgroundColor: "#fff",
        height: "50%",
        width: "100%",
        marginTop: 60,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 10,
        gap: 30
    },
    inputText: {
        color: "#000",
        backgroundColor:"#fff",
        height: 30,
        width: 300,
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: "#000",
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
        })
    },
    container : {
        display: "flex",
        gap: 1,
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
        color: "#000"
    },
});