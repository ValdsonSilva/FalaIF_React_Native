import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import Area_admin from "./components/admin_components/Area_admin";
import Login from "./components/login/Login"
// import index from "./components/admin_components/relatos/Caixa_relatos_admin"

export default function Page() {
  return (
    <View style={styles.container}>
      {/* <Area_admin/> */}
      {/* <Caixa_relatos_admin/> */}
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
