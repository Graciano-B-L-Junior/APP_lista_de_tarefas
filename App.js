import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts, Oswald_200ExtraLight, Oswald_300Light, Oswald_400Regular, Oswald_500Medium, Oswald_600SemiBold, Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, TouchableHighlight, Modal, ScrollView, Alert, AsyncStorage } from 'react-native';

export default function App() {

  console.disableYellowBox = true;


  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('todasTarefas')
        if (value !== null) {
          setarTarefas(JSON.parse(value))
        }
      } catch (erro) {

      }
    })()
  },[])

  async function salvarTarefas(val) {
    try {
      await AsyncStorage.setItem('todasTarefas', JSON.stringify(val));
    } catch (erro) {

    }
  }

  let [fontsLoaded] = useFonts({
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  const [tarefas, setarTarefas] = useState([]);

  const [modal, setModal] = useState(false)

  const [tarefa, tarefaAtual] = useState('')

  function addTarefa() {
    setModal(false)

    let id = 0;
    if (id < tarefas.length) {
      id = tarefas[tarefas.length - 1].id + 1;
    }

    let objetoTarefa = {
      id: id,
      tarefa: tarefa
    }
    
    setarTarefas([...tarefas,objetoTarefa]);
    salvarTarefas([...tarefas,objetoTarefa])
  }

  const image = require('./resources/bg.jpg');

  function deletarTarefa(id) {
    alert('A tarefa de id ' + id + ' foi deletada')
    let newTarefas = tarefas.filter((val) => {
      return val.id != id;
    })
    setarTarefas(newTarefas);
    salvarTarefas(newTarefas);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput onChangeText={text => tarefaAtual(text)} autoFocus={true}></TextInput>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                addTarefa()
              }}
            >
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.coverView}>
          <Text style={styles.textHeader}>Lista de Tarefas - Criado por Graciano Junior</Text>
        </View>
      </ImageBackground>
      {
        tarefas.map(function (val) {
          return (<View style={styles.tarefaSingle}>
            <View style={{ flex: 1, width: '100%', padding: 10 }}>
              <Text>{val.tarefa}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1, padding: 10 }}>
              <TouchableOpacity onPress={() => deletarTarefa(val.id)}><AntDesign name="minuscircleo" size={24} color="black" /></TouchableOpacity>
            </View>
          </View>);
        })
      }
      <TouchableOpacity style={styles.btnAddTarefa} onPress={() => setModal(true)}><Text
        style={{ textAlign: 'center', color: 'white' }}>Adicionar Tarefa!
         </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 80,
    resizeMode: "cover"
  },
  btnAddTarefa: {
    width: 200,
    padding: 8,
    backgroundColor: 'gray',
    marginTop: 20
  },
  coverView: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  textHeader: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    fontFamily: 'Oswald_400Regular'
  },
  tarefaSingle: {
    marginTop: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    paddingBottom: 10
  },
  //Estilos para nossa modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});
