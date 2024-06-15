import { Text } from "react-native";
import ProtectedRoute from "../../../protected_router/ProtectedRoute";

function Interacoes_finalizadas() {
    return (
        <ProtectedRoute>
            <Text>Suas interacoes finalizadas!</Text>
        </ProtectedRoute>
    )
}

export default Interacoes_finalizadas