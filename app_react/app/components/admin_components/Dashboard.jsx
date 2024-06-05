import { Link } from "expo-router";
import { Text } from "react-native";
import Perfil from "../user_components/Perfil";

function Dashboard() {
    return (
        <>
            <Text>Tela do Admin</Text>
            <Link href={"../user_components/Perfil"}>
                Ir par o perfil
            </Link>
        </>
    )
}

export default Dashboard