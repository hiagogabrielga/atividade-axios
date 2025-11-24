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
    const [fazendas, setFazendas] = useState<Fazendas[]>([])
    const [nomeInput, setNomeInput] = React.useState("")
    async function buscarFazendas() {
        try {
            let resultado = await axios.get('https://apivacinacao.dev.vilhena.ifro.edu.br/fazendas')
            setFazendas(resultado.data)
        } catch (error) {
            console.error(error)
        }

    }

    async function buscarPorNome(nome:string) {
        try {
            buscarFazendas();
            if (nome !== "") {
               let listaFiltrada = fazendas.filter((item) => item.nome == nome) 
               setFazendas(listaFiltrada)
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
            <TextInput placeholder='Pesquise a fazenda por nome' value={nomeInput} onChangeText={text => setFazendas(text)}/>
            <Button title='Pesquisar'/> 
            <FlatList
                data={fazendas}
                renderItem={({item, index}) => (
                    <View key={index}>
                        <Text>{item.nome}</Text>
                        <Text>{item.proprietario}</Text>
                    </View> 
                )}
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
