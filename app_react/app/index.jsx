import { StyleSheet, Text, View } from "react-native";
import Login from './components/login/Login'
// import second from "./components/admin_components/Area_admin"


export default function Page() {
    return (
        <View style={styles.container}>
          <Login/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#64ffbb",
    alignItems: 'center',
  },
});
