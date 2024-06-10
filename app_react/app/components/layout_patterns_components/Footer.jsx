import { StyleSheet, Text, View } from "react-native"

function Footer() {
    return (
        <>
            {/* footer */}
            <View style={styles.footer}>
                <Text style={styles.footer_text}>
                    @ 2024 IFPI-Campus Floriano. Todos os direitos reservados.
                </Text>
            </View>
        </>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#000",
        position:"absolute", // essa propo e 
        bottom: 0, // essa prop fazem com que o footer fique fixo na parte de baixo
        width: "100%",
        height: 80,
    },
    footer_text: {
        color: "#fff"
    }
})