import { View, TextInput, Button, StyleSheet, Text, Alert, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Header from "../../layout_patterns_components/Header"
import Footer from "../../layout_patterns_components/Footer"
import { useState } from 'react';
import ProtectedRoute from '../../../protected_router/ProtectedRoute';

function Nova_interacao() {
    const [idTipoChamado, setIdTipoChamado] = useState('');
    const [titulo, setTitulo] = useState('');
    const [textoChamado, setTextoChamado] = useState('');
    const [idBloco, setIdBloco] = useState('');
    const [idSala, setIdSala] = useState('');

    const handleSubmit = () => {
        // Aqui você pode adicionar a lógica de envio do formulário
        Alert.alert('Formulário enviado!', `Tipo Chamado: ${idTipoChamado}\nTítulo: ${titulo}\nTexto: ${textoChamado}\nBloco: ${idBloco}\nSala: ${idSala}`);
    };

    return (
        <ProtectedRoute>
            <Header/>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
            <View style={styles.titulo_container}>
                <Text style={styles.titulo}>
                    Acompanhe as sugestões dos alunos
                </Text>
            </View>
            {/* <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.label}>ID Tipo Chamado</Text>
                    <TextInput
                        style={styles.input}
                        value={idTipoChamado}
                        onChangeText={setIdTipoChamado}
                        placeholder="Digite o ID Tipo Chamado"
                    />
                    
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        style={styles.input}
                        value={titulo}
                        onChangeText={setTitulo}
                        placeholder="Digite o Título"
                    />
                    
                    <Text style={styles.label}>Texto Chamado</Text>
                    <TextInput
                        style={styles.input}
                        value={textoChamado}
                        onChangeText={setTextoChamado}
                        placeholder="Digite o Texto Chamado"
                        multiline
                    />
                    
                    <Text style={styles.label}>ID Bloco</Text>
                    <TextInput
                        style={styles.input}
                        value={idBloco}
                        onChangeText={setIdBloco}
                        placeholder="Digite o ID Bloco"
                    />
                    
                    <Text style={styles.label}>ID Sala</Text>
                    <TextInput
                        style={styles.input}
                        value={idSala}
                        onChangeText={setIdSala}
                        placeholder="Digite o ID Sala"
                    />
                    
                    <Pressable
                        onPress={handleSubmit}
                    >
                        <Text style={styles.botao_enviar}>Enviar</Text>
                    </Pressable>
            </ScrollView> */}
            <View style={styles.container}>
                    <Text style={styles.label}>ID Tipo Chamado</Text>
                    <TextInput
                        style={styles.input}
                        value={idTipoChamado}
                        onChangeText={setIdTipoChamado}
                        placeholder="Digite o ID Tipo Chamado"
                    />
                    
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        style={styles.input}
                        value={titulo}
                        onChangeText={setTitulo}
                        placeholder="Digite o Título"
                    />
                    
                    <Text style={styles.label}>Texto Chamado</Text>
                    <TextInput
                        style={styles.input}
                        value={textoChamado}
                        onChangeText={setTextoChamado}
                        placeholder="Digite o Texto Chamado"
                        multiline
                    />
                    
                    <Text style={styles.label}>ID Bloco</Text>
                    <TextInput
                        style={styles.input}
                        value={idBloco}
                        onChangeText={setIdBloco}
                        placeholder="Digite o ID Bloco"
                    />
                    
                    <Text style={styles.label}>ID Sala</Text>
                    <TextInput
                        style={styles.input}
                        value={idSala}
                        onChangeText={setIdSala}
                        placeholder="Digite o ID Sala"
                    />
                    
                    <Pressable
                        onPress={handleSubmit}
                    >
                        <Text style={styles.botao_enviar}>Enviar</Text>
                    </Pressable>
            </View>


            <Footer/>
            </KeyboardAvoidingView>
        </ProtectedRoute>
    )
}

export default Nova_interacao

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#64ffbb",
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingBottom: 100,
    },
    scrollContainer: {
        // padding: 20,
        // flexGrow: 1,
    },
    titulo_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#06b8ff",
        width: 300,
        height: 60,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0,
        shadowRadius: 50,
        elevation: 5, // For Android
    },
    titulo: {
        color: "#fff",
        textShadowColor: "#000",
        textShadowRadius: 7,
        fontSize: 16,
        fontWeight: "500"
    },
    botao_enviar: {
        backgroundColor: "#12c6ff", 
        color: "#fff",
        width: 200,
        height: 50,
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 16,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
    },
    label: {
        color: "#000",
        fontWeight: "500",
        textAlign: "left",
        width: 300
    },
    input: {
        backgroundColor: "#fff",
        width: 300,
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
    }
})