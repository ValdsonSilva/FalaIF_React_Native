import { View, Text } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "../auth_context/AuthContext";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
    // acessando o estado do nosso contexto
    const {isAuthenticated} = useAuth()
    const segments = useSegments()
    const router = useRouter()

   
    useEffect(() => {
         /* o usuário é retornado para a tela de login caso
         a condição seja verdadeira */
        if (!isAuthenticated && segments[0] !== 'login') {
            router.replace('/')
        }
    }, [isAuthenticated, segments])

    if (!isAuthenticated) {
        return null // ou um loader enquanto verifica a autenticação
    }

    return children;
}

export default ProtectedRoute;