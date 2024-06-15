import { createContext, useState, useContext, useEffect } from "react";
import api from "../api"; // instancia do Axios
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { router } from "expo-router";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import url_base from "../url_base";


// módulo de verificação de login dos usuários do sistema

// criamos uma instancia do hook useContext()
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    // criar um estado de autenticação
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)


    useEffect(() => {
        const loadStoredAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token')
                const storedRefreshToken = await AsyncStorage.getItem('refreshToken')
                
                if (storedToken && storedRefreshToken) {
                    setToken(storedToken)
                    setRefreshToken(storedRefreshToken)
                    setIsAuthenticated(true)
                    // await verifyToken(storedToken, storedRefreshToken)
                }
            } catch (error) {
                console.error("Falha ao carregar dados da autenticação armazenada");
            }
        }

        loadStoredAuth();
    }, [token])

    // função de login que altera para true o estado inicial
    const login = async (CPF, senha) => {
        try {
            const response = await api.post('/api/token/', {
                cpf : CPF,
                password : senha
            })

            if (response.status >= 200 && response.status < 300) {
                const accessToken = response.data.access;
                const refreshToken = response.data.refresh;
    
                setToken(accessToken)
                setRefreshToken(refreshToken)
                setIsAuthenticated(true)
    
                await AsyncStorage.setItem('token', accessToken);
                await AsyncStorage.setItem('refreshToken', refreshToken);

                console.log("token: ", accessToken)
                console.log("\nrefreshToken: ", refreshToken)
    
                redirecionarParaProximaTela(accessToken)
            } else {
                // Se a resposta não for bem-sucedida, lança um erro
                throw new Error(`Falha ao fazer login: ${response.status}`);
            }

        } catch (error) {
            Alert.alert("Falha no login, tente novamenete!")
            console.error("Falha no login", error)
        }
    }

    async function redirecionarParaProximaTela(token) {
  
        const tokenDecodificado = decodeToken(token)
        console.log(tokenDecodificado)

        /* `api/gerusuarios/v1/users/${id}` */
        
        // verificando o tipo de usuário
        await verificarTipoUsuario(tokenDecodificado.user_id).then((resp) => {
            let url;
        
            switch (resp.nome_tipo) {
                case "admin":
                    url = "./components/admin_components/Area_admin"
                    break;
                case "aluno":
                    url = './components/user_components/User_area'
                    break;
                default:
                    Alert.alert("Usuário inexistente no sistema!");
                    url = "/";
            }
            router.push(url);
        });
    }

    // retorna varias infos do user, inclusive o tipo
    async function verificarTipoUsuario(id) {

        try {
            const response = await api.get(`api/gerusuarios/v1/users/${id}`)
            if (response.status < 200 && response.status >= 300) {
                throw new Error("Erro ao puxar os usuários" + response.status);
            }

            const data = response.data;
            console.log("Aqui está o usuário: ", data);
            return data;

        } catch (error) {
            console.error("Erro durante a requisição dos usuários: ", error.message);
            return null
        }
    }

    // função de logout
    const logout = async () => {
        setToken(null)
        setRefreshToken(null)

        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        setIsAuthenticated(false)
    }

    // função que verifica se o usuário tem um token válido
    const verifyToken = async (token, refresh) => {

        try {
            const response = await api.post("/api/token/verify/", {token: token})

            if (response.status < 200 || response.status >= 300) {
                throw new Error("Erro ao verificar o token: " + response.status);
            }

            // se der certo, não ocorre nada e o user permanece no logado no app
            console.log("O token foi aceito")
            return ""
            
        } catch (error) {
            // Lidar com erros
            console.error("Ocorreu um erro ao verificar o token: ", error.message);

            if (error.response && error.response.status === 401) {
                // Consumir o endpoint do refresh token
                await refreshAccessToken(refresh);

            } else {
                logout()
                // router.push('/')
            }
        }
    }

    const refreshAccessToken = async (refreshToken) => {

        const data = {
            refresh: refreshToken
        }

        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post(url_base + "api/token/refresh/", data, options)

            // Se a resposta não for OK (status code não está entre 200 e 299), lançar um erro
            if (!response.status < 200 || response.status >= 300) {
                throw new Error(`Erro ao atualizar o token: ${response.status}`);
            }

            const {access} = response.data;
            setToken(access)
            await AsyncStorage.setItem('token', ac)
            setIsAuthenticated(true);
            console.log("Token de acesso atualizado com sucesso!")

        } catch (error) {
            console.error("Tempo de sessão expirado!");
            logout();
            router.push("/");
        }
    }

    function decodeToken(token) {
        try {
            const decodeToken = jwtDecode(token)
            console.log('Token decodificado', decodeToken)
            return decodeToken;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error.message); 
            return null
        }
    }

    // retornando o nosso provider com os dados do nosso contexto
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, verifyToken}}>
            {children}
        </AuthContext.Provider>
    );
}

// exportando o nosso CustomHook para o resto da aplicação
export const useAuth = () => useContext(AuthContext);