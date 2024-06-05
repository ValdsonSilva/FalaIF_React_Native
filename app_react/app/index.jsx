import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import Login from "./Login"
import Dashboard from "./components/admin_components/Dashboard"
import Area_admin from "./components/admin_components/Area_admin";
import Caixa_relatos_admin from "./components/admin_components/Caixa_relatos_admin";


export default function Page() {
  return (
    <View style={styles.container}>
      {/* <Area_admin/> */}
      <Caixa_relatos_admin/>
      {/* <Login/> */}
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
