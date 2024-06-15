import { useState } from "react";
import { Text, StyleSheet,TextInput, View, TouchableOpacity,Platform, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import Footer from "../layout_patterns_components/Footer";
import { router } from "expo-router";
import { useAuth } from "../../auth_context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";


function Login() {

    const {login, verifyToken} = useAuth();
    const token = AsyncStorage.getItem('token') ? AsyncStorage.getItem('token') : "";
    const refreshToken = AsyncStorage.getItem('refreshToken') ? AsyncStorage.getItem("refreshToken") : "";

    const [loading, setLoading] = useState(false);

    // estado inicial
    const [formData, setFormData] = useState({
        loginForm: '',
        senha: ''
    })

    // atuliazar estados
    const handleInputChange = (login, value) => {

        if (login === 'loginForm') {
            value = value.replace(/[^0-9]/g, '')
        }
        setFormData({
            ...formData,
            [login] : value
        })
    }

    // exibir os dados enviados
    const handleSubmit = async () => {
        const { loginForm, senha } = formData;

        console.log("Login e senha: ", {loginForm, senha})
        setLoading(true)

        // Se os campos forem vazios, retorna uma mensagem de alerta
        if (!loginForm || !senha) {
            Alert.alert("Preencha os campos do formulário!")
            router.push("/")
        } else if (loginForm || senha) {
            // criar os tokens/fazer login no app
            await login(loginForm, senha)
            setFormData({
                loginForm: '',
                senha: '',
            })
        } else {
            Alert.alert("Usuário não encontrado!")
        }

        setLoading(false)
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
                                    placeholder="Informe seu CPF" 
                                    value={formData.loginForm} 
                                    onChangeText={(value) => handleInputChange('loginForm', value)}
                                    style={styles.inputText}
                                    maxLength={11}
                                    keyboardType="default"
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
                                    maxLength={9}
                                    keyboardType="default"
                                />
                            </View>

                            <View style={styles.button}>
                                <TouchableOpacity onPressIn={handleSubmit}>
                                    <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                                        {loading ? (
                                            <ActivityIndicator size={"small"} color={"#fff"}/>
                                        ) : (
                                            <Text style={styles.buttonText}>Entrar</Text>
                                        )}
                                    </TouchableOpacity>
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