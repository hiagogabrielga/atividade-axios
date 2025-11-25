import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
            let resultado = await axios.get('https://apivacinacao.dev.vilhena.ifro.edu.br/fazendas')
            setFazendas(resultado.data)
            setFazendasFiltradas(resultado.data)
            if (resultado.data.length == 0) {
                setMensagem("Nenhuma fazenda encontrada.")
            }
        } catch (error) {
            setMensagem("Erro ao buscar fazendas.")
            console.error(error)
        }

    }

    async function buscarPorNome(nome: string) {
        try {
            if (nome !== "") {
                let listaFiltrada = fazendas.filter((item) => item.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase()))
                if (listaFiltrada.length == 0) {
                    setMensagem("Nenhuma fazenda com esse nome encontrada.")
                    setFazendasFiltradas(listaFiltrada)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        buscarFazendas();
    }, [])
    return (
        <View style={styles.container}>
            <Text>Fazendas</Text>
            <TextInput placeholder='Pesquise a fazenda por nome' onChangeText={buscarPorNome} />
            <FlatList
                data={fazendasFiltradas}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <Text>{item.nome}</Text>
                        <Text>{item.proprietario}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <View><Text>{mensagem}</Text></View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
