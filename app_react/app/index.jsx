import { StyleSheet, Text, View } from "react-native";
import Login from './components/login/Login'
import Caixa_relatos from "./components/admin_components/relatos/Caixa_relatos_admin"


export default function Page() {
    return (
        <View style={styles.container}>
          <Login/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#64ffbb",
    alignItems: 'center',
  }
});
