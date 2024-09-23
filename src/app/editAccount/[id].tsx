import React, { useEffect, useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { db } from "./../../../firebaseConfig"; // Importando a configuração do Firebase
import { useLocalSearchParams } from "expo-router";

const EditAccountScreen = () => {
  const { id } = useLocalSearchParams();
  const [nomeConta, setNomeConta] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [pessoasTotais, setPessoasTotais] = useState("");
  const [pessoas, setPessoas] = useState([]);

  // Função para editar o nome de uma pessoa
  const editarNomePessoa = (index, novoNome) => {
    const novasPessoas = [...pessoas];
    novasPessoas[index].pessoa = novoNome;
    setPessoas(novasPessoas);
  };

  // Função para alterar o valor de uma pessoa
  const editarValorPessoa = (index, novoValor) => {
    const novasPessoas = [...pessoas];
    novasPessoas[index].valor = novoValor;
    setPessoas(novasPessoas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Conta:</Text>
      <TextInput
        style={styles.input}
        value={nomeConta}
        onChangeText={setNomeConta}
        placeholder="Digite o nome da conta"
      />
      <Text style={styles.label}>Valor Total da Conta:</Text>
      <TextInput
        style={styles.input}
        value={valorTotal}
        onChangeText={setValorTotal}
        keyboardType="numeric"
        placeholder="Digite o valor total"
      />

      <Text style={styles.label}>Quantidade de Pessoas:</Text>
      <TextInput
        style={styles.input}
        value={pessoasTotais}
        onChangeText={setPessoasTotais}
        keyboardType="numeric"
        placeholder="Digite o número de pessoas"
      />

      <FlatList
        data={pessoas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.pessoaContainer}>
            <TextInput
              style={styles.input}
              value={item.pessoa}
              onChangeText={(novoNome) => editarNomePessoa(index, novoNome)}
              placeholder="Nome da Pessoa"
            />
            <TextInput
              style={styles.input}
              value={item.valor.toString()}
              onChangeText={(novoValor) => editarValorPessoa(index, novoValor)}
              keyboardType="numeric"
              placeholder="Valor"
            />
          </View>
        )}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    marginTop: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pessoaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default EditAccountScreen;
