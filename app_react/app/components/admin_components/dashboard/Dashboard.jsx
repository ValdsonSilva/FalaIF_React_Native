import { Link } from "expo-router";
import { Text } from "react-native";

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