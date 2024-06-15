import { Link } from "expo-router";
import { Text } from "react-native";
import Area_admin from "../Area_admin";
import ProtectedRoute from "../../../protected_router/ProtectedRoute";

function Interacoes_finalizadas() {
    return (
        <ProtectedRoute>
            <Text>Tela do Admin</Text>
            <Link href="../Area_admin">
                Ir par o perfil
            </Link>
        </ProtectedRoute>
    )
}

export default Interacoes_finalizadas