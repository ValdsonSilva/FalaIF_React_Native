import { Link } from "expo-router";
import { Text } from "react-native";
import Area_admin from "../Area_admin";

function Interacoes_finalizadas() {
    return (
        <>
            <Text>Tela do Admin</Text>
            <Link href="../Area_admin">
                Ir par o perfil
            </Link>
        </>
    )
}

export default Interacoes_finalizadas