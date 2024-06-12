import { useState } from "react";
import { Text, StyleSheet,TextInput, View, TouchableOpacity,Platform, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Footer from "../layout_patterns_components/Footer";
import { router } from "expo-router";
// import {} from "../admin_components/Area_admin"

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

    const validLogins = {
        login1 : {
            nome : "Admin",
            senha : "1"
        },
        login2 : {
            nome : "Usuario",
            senha : "2"
        }
    }


    // exibir os dados enviados
    const handleSubmit = () => {
        const { login, senha } = formData;

        // Se os campos forem vazios, retorna uma mensagem de alerta
        if (!login & !senha) {
            Alert.alert("Preencha os campos do formulário!")
            router.push("/")

        } else {

            if (validLogins.login1.nome === login & validLogins.login1.senha === senha) {
                // se for Admin
                router.push("./components/admin_components/Area_admin")

            } else if (validLogins.login2.nome === login & validLogins.login2.senha === senha) {
                // se for um aluno
                router.push('./components/user_components/User_area') 

            } else {
                Alert.alert("Usuário não encontrado")
                router.push("/")
            }
        }

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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                    secureTextEntry={true}
                                />
                            </View>

                            <View style={styles.button}>
                                <TouchableOpacity onPressIn={handleSubmit}>
                                    <Text style={styles.buttonText}>Entrar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* footer */}
            {/* <Footer />s */}
        </>
    );
}

export default Login;

const styles = StyleSheet.create({
    header_container : {
        width: "100%",
        height: 200,
        backgroundColor: "#06b8ff",
        marginTop: 50,
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
        flex: 1,
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
        height: 50,
        width: 300,
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: "#000",
        borderWidth: 1,
        ...Platform.select({
            ios: {
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
        borderRadius: 7,
        backgroundColor: "#12c6ff",
        width: 100,
        height: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0,
        shadowRadius: 50,
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "500",
    },
});