import { Text } from "react-native"
import ProtectedRoute from "../../../protected_router/ProtectedRoute"

function User_interacoes() {
    return (
        <ProtectedRoute>    
            <Text>Suas interacoes</Text>
        </ProtectedRoute>
    )
}

export default User_interacoes