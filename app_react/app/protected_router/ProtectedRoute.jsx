import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { router, useRouter, useSegments } from "expo-router";
import { useAuth } from "../auth_context/AuthContext";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProtectedRoute = ({ children }) => {
    // acessando o estado do nosso contexto
    const {isAuthenticated, verifyToken, logout} = useAuth();

    /*useSegments é um hook do expo-router que fornece a informação 
    sobre a rota atual, segmentada por partes da URL. */
    const segments = useSegments()

    console.log("Estado da autenticação no protectedRoute: ", isAuthenticated)
    
    // useEffect é um hook que permite executar efeitos colaterais em componentes funcionais.
    useEffect(() => {
        
        /* o usuário é retornado para a tela de login caso
         a condição seja verdadeira */
        const checkAuthentication = async () => {
            if (!isAuthenticated) {
                    logout()
                    router.push('/')

            } else {
                try {
                    const token = await AsyncStorage.getItem('token');
                    const refreshToken = await AsyncStorage.getItem('refreshToken');

                    if (token && refreshToken) {
                        verifyToken(token, refreshToken)
                    } else {
                        throw new Error('Token ou refresh token não encontrado')
                    }

                } catch (error) {
                    console.error('Erro ao verificar o token:', error.message);
                    logout()
                    router.push('/')
                }   
            }
        }
        checkAuthentication();

    }, [isAuthenticated, segments])

    if (!isAuthenticated) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={"large"} color={"#0000ff"}/>
            </View>
        )
    }

    return children;
}

export default ProtectedRoute;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


/*
Para proteger rotas no seu aplicativo React Native usando tokens de autenticação (token, refresh token e verify token) com Expo Router, você pode seguir uma abordagem que inclui:

-Gerenciar tokens e autenticação no estado global usando Context API.
-Interagir com a API para autenticação e verificação de tokens.
-Proteger rotas com base no estado de autenticação.
 */


/*
Loader enquanto verifica a autenticação:

-Um ActivityIndicator é mostrado enquanto a verificação de autenticação está em andamento para melhorar a experiência do usuário.
 */