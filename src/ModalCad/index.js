import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-community/picker';

import firebase from "../firebaseConnection";

export default function ViewModalCad(props) {

    const [selectedValue, setSelectedValue] = useState(props.selectedPicker);
    const [valueInputNome, setValueInputNome] = useState("");
    const [valueInputQuantidade, setValueInputQuantidade] = useState(0);
    const [erro, setErro] = useState("");
    const [valueLeftError, setValueLeftError] = useState("5%");
    const [valueKey, setValueKey] = useState(0);
  
    useEffect(() => {
  
        var key_2;
  
        async function defineKey() {
            var produtos = await firebase.database().ref("produto").orderByKey();
            produtos.once("value").then(function (snapshot) {  //percorre com forEach por cada KEY
                snapshot.forEach(function (childSnapshot) {
                    key_2 = parseInt(childSnapshot.key);
                    console.log(key_2 + "int");
                    key_2 = key_2.toString();
                    console.log(key_2 + "string");
                });
  
                key_2++;
                if(isNaN(key_2)){
                    setValueKey(1);
                } else {
                    setValueKey(key_2);
                }
            
                console.log("recebeu a key!" + key_2);
            });
        }
  
        defineKey();
    }, []);
  
    function addProduto() {
        if (valueInputNome === "" || valueInputQuantidade <= 0) {
            Alert.alert(
                "Erro",
                "Verifique se digitou corretamente ;)"
            );          
        } else {
            setErro(() => <ActivityIndicator size={50} color={"#FFF"} style={{ flex: 1 }} />);
            setValueLeftError("43%");
            gravarProduto();
        }
    }
  
    async function gravarProduto() {
        
        console.log(valueInputNome);        
        
        var dateTime = new Date();
        var mes = parseInt(dateTime.getMonth());
        mes++;
        if(mes > 12){
            mes = 1;
        }
        var dataAtual = dateTime.getFullYear() + "-" + mes + "-" + dateTime.getDate() + "  " + dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
        console.log(dataAtual);

        await firebase.database().ref("produto").child(valueKey).set({
            nome: valueInputNome,
            quantidade: valueInputQuantidade,
            tipo: selectedValue,
            alteracao: dataAtual
        }).then(() => {
            Alert.alert(
                "Mensagem",
                `Produto ${valueInputNome} cadastrado!`
            );
            props.fechaModal(false);
            props.preencheTabela();
        }).catch(err => console.log(err));
  
    }
  
    function styleError(myPosition) {
        return {
            color: "#F56D",
            width: "90%",
            left: myPosition
        }
    }
  
    return (

            <View style={styles.modalView}>
                <View style={{ alignItems: "center", width: "100%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 22, color: "#FFF", top: "70%" }}>CADASTRANDO NOVO PRODUTO</Text>
                </View>
  
                <View style={{ top: "30%" }}>
                    <Text style={{ color: "#FFF", fontWeight: "bold", top: 20, left: 10 }}>Nome: </Text>
                    <TextInput
                        style={styles.inputNome}
                        onChangeText={(value) => setValueInputNome(value)}
                    />
  
                    <Text style={{ color: "#FFF", fontWeight: "bold", top: 60, left: 3 }}>Quantidade: </Text>
                    <TextInput
                        style={styles.inputQuantidade}
                        keyboardType={"numeric"}
                        onChangeText={(value) => setValueInputQuantidade(value)}
                    />
  
                    <Text style={{ color: "#FFF", fontWeight: "bold", top: 80, right: 150, position: "absolute" }}>Tipo: </Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: 150, color: "#FFF", top: 27, left: "60%", fontWeight: "bold" }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Remédio" value="remedio" />
                        <Picker.Item label="Fralda" value="fralda" />
                    </Picker>
                </View>
  
                <View style={{ width: "100%", height: "100%", position: "absolute", top: "20%" }}>
                    <Text style={styleError(valueLeftError)}>{erro}</Text>
                </View>
  
                <TouchableOpacity style={styles.btnAddProduto} onPress={addProduto}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ top: "30%", color: "#213e6e", fontWeight: "bold", fontSize: 20 }}>ADICIONAR</Text>
                    </View>
                </TouchableOpacity>
            </View>
  
    );
  }

const styles = StyleSheet.create({
    msgErro: {
        color: "#F56D",
        width: "90%",
        left: "43%"
    },
    model: {
        height: "50%",
        width: "95%",
        left: 10,
        top: 100
    },
    modalView: {
        backgroundColor: '#213e6e',
        height: "70%",
        width: "100%",
        borderRadius: 20,
        top: 100
    },
    inputNome: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 10,
        backgroundColor: "#FFF",
        position: "absolute",
        width: "80%",
        right: 5,
        top: 10
    },
    inputQuantidade: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 10,
        backgroundColor: "#FFF",
        position: "absolute",
        width: "20%",
        left: 90,
        top: 70
    },
    btnAddProduto: {
        backgroundColor: "#FFF",
        position: "absolute",
        alignItems: "center",
        height: "15%",
        width: "95%",
        left: "2.5%",
        borderRadius: 20,
        bottom: 20
    }

})

