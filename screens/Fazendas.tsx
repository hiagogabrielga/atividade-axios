import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface Fazendas {
  id: number;
  nome: string;
  endereco: string;
  municipio: string;
  uf: string;
  proprietario_id: number;
  proprietario: string;
}

export default function FazendasScreens() {
  const [fazendas, setFazendas] = useState<Fazendas[]>([]);
  const [fazendasFiltradas, setFazendasFiltradas] = useState<Fazendas[]>([]);
  const [mensagem, setMensagem] = useState(String);
  const [nomeInput, setNomeInput] = React.useState("");

  async function buscarFazendas() {
    try {
      let resultado = await axios.get(
        "https://apivacinacao.dev.vilhena.ifro.edu.br/fazendas"
      );
      setFazendas(resultado.data);
      setFazendasFiltradas(resultado.data);

      if (resultado.data.length === 0) {
        setMensagem("Nenhuma fazenda encontrada.");
      }
    } catch (error) {
      setMensagem("Erro ao buscar fazendas.");
      console.error(error);
    }
  }

  async function buscarPorNome(nome: string) {
    try {
      if (nome.trim() === "") {
        setFazendasFiltradas(fazendas);
        setMensagem("");
        return;
      }
      let listaFiltrada = fazendas.filter((item) =>
        item.nome.toLowerCase().includes(nome.toLowerCase())
      );

      if (listaFiltrada.length === 0) {
        setMensagem("Nenhuma fazenda com esse nome encontrada.");
      }

      setFazendasFiltradas(listaFiltrada);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    buscarFazendas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Fazendas</Text>

      <TextInput
        placeholder="Pesquise a fazenda por nome"
        placeholderTextColor="#A8C3E5"
        value={nomeInput}
        onChangeText={setNomeInput}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => buscarPorNome(nomeInput)}
      >
        <Text style={styles.textoBotao}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        style={{ width: "100%" }}
        contentContainerStyle={{ padding: 20 }}
        data={fazendasFiltradas}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nomeFazenda}>{item.nome}</Text>
            <Text style={styles.proprietario}>
              Proprietário: {item.proprietario}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ marginTop: 20 }}>
            <Text style={styles.mensagemVazia}>{mensagem}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F0FA", // azul bem claro no fundo
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1B4F72", // azul escuro
    marginBottom: 20,
    alignSelf: "center",
  },

  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#90B5E1",
    marginBottom: 10,
    color: "#1B4F72",
    fontSize: 16,
  },

  botao: {
    backgroundColor: "#2980B9", // azul médio
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#2980B9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  nomeFazenda: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B4F72",
  },

  proprietario: {
    fontSize: 16,
    color: "#2E86C1",
    marginTop: 5,
  },

  mensagemVazia: {
    textAlign: "center",
    fontSize: 18,
    color: "#1B4F72",
    fontWeight: "600",
  },
});
