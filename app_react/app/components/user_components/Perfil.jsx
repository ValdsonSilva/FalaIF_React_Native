import { Link } from "expo-router";
import { Text } from "react-native";


function Perfil() {
    return (
        <>
            <Text>Tela do usuário aluno</Text>
            <Link href={"/"}>
                Home
            </Link>
        </>
    )
}

export default Perfil