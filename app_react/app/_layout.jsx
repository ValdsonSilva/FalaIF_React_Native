import { Slot } from "expo-router";
import { View, ImageBackground, StyleSheet } from "react-native";
import { AuthProvider } from "./auth_context/AuthContext";

/* Configurar as Rotas:
Use o componente ProtectedRoute para proteger suas rotas.
 */

// layou padrão de todas as telas 
export default function Layout() {
    return (
      <AuthProvider>
        <ImageBackground style={styles.background}>
            <View style={styles.overlay}>
                <Slot/>
            </View>
        </ImageBackground>
      </AuthProvider>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    overlay: {
      flex: 1,
      backgroundColor: '#64ffbb', // Opcional: overlay para melhorar a legibilidade
      alignItems: 'center',
    },
  });