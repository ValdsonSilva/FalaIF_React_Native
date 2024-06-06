import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import Area_admin from "./components/admin_components/Area_admin";
import Login from "./components/login/Login"
import User_area from "./components/user_components/User_area"

export default function Page() {
  return (
    <View style={styles.container}>
      {/* <Login/> */}
      <User_area/>
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
