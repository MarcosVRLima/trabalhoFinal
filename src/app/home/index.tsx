import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AuthContext from "@/context/authContext"; // Contexto para o usuário
import { readDocument } from "@/firestore/readDocument"; // Função para ler contas salvas
import { style } from "./styles"; // Estilos da tela

export default function Home() {
    const router = useRouter();
    const { user } = useContext(AuthContext); // Pega o nome do usuário autenticado
    const [contas, setContas] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para carregar as contas do usuário
    async function carregarContas() {
        try {
            setLoading(true);
            const resultado = await readDocument('contas', user.email); // Busca as contas associadas ao usuário
            setContas(resultado);
        } catch (error) {
            console.error("Erro ao carregar contas:", error);
            Alert.alert("Erro", "Não foi possível carregar as contas.");
        } finally {
            setLoading(false);
        }
    }

    // Carrega as contas quando a tela é montada
    useEffect(() => {
        carregarContas();
    }, []);

    // Renderiza cada card de conta
    const renderConta = ({ item }) => (
        <TouchableOpacity
            style={style.cardConta}
            onPress={() => router.push(`/detalhesConta/${item.id}`)} // Redireciona para a tela de detalhes da conta
        >
            <Text style={style.nomeConta}>{item.nomeConta}</Text>
            <Text style={style.valorConta}>Total: R$ {item.valorTotal.toFixed(2)}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={style.container}>
            {/* Cabeçalho com saudação e botão de adicionar conta */}
            <View style={style.header}>
                <Text style={style.bemVindo}>Bem-vindo, {user.nome}!</Text>
                <TouchableOpacity style={style.botaoAdicionar} onPress={() => router.push('/adicionarConta')}>
                    <MaterialIcons name="add" size={28} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Verifica se está carregando as contas */}
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <FlatList
                    data={contas}
                    renderItem={renderConta}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={style.listaContas}
                    ListEmptyComponent={<Text style={style.textoSemContas}>Nenhuma conta encontrada</Text>}
                />
            )}
        </View>
    );
}
