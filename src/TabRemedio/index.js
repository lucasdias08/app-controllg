import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, ActivityIndicator, Image, Modal, Alert, Text } from 'react-native';

import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';

import Icon from "react-native-vector-icons/MaterialIcons";
Icon.loadFont();

import firebase from "../firebaseConnection";
import ViewModalCad from "../ModalCad";
import ViewModalUpdate from "../ModalUpdate";
import ViewModalDelete from "../ModalDelete";

export default function TabRemedio() {
  //console.disableYellowBox = true;
  const [tableData, setTableData] = useState([]);
  const [keyToDataArray, setKeyToDataArray] = useState([]);
  const [ok, setOk] = useState(false);
  const [cellIndexRow, setCellIndexRow] = useState(0);
  const tableHead = ['Nome', 'Quantidade', 'Alteração', 'Ação'];

  const [modalCadVisible, setModalCadVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  var arrayToDataTable = [];
  var keyToArray = [];

  useEffect(() => {

    getProduto();
    console.log(arrayToDataTable[0]);
    console.log(arrayToDataTable[1]);
    console.log(arrayToDataTable[2]);

  }, []);

  async function getProduto() {

    var query = await firebase.database().ref("produto").orderByKey();  //ordena por "key"
    query.once("value").then(function (snapshot) {  //percorre com forEach por cada KEY
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;

        var query_2 = firebase.database().ref("produto/" + key);
        console.log(snapshot.child(key).val().nome);
        console.log(key);
        console.log(query_2);

        var dataTableData = [];
        if (snapshot.child(key).val().tipo === "remedio" || snapshot.child(key).val().tipo === "Remédio") {
          dataTableData.push(snapshot.child(key).val().nome);
          dataTableData.push(snapshot.child(key).val().quantidade);
          dataTableData.push(snapshot.child(key).val().alteracao);
          dataTableData.push(key + " - id/nó, " + snapshot.child(key).val().tipo);

          arrayToDataTable.push(dataTableData);
          keyToArray.push(key);

          console.log(arrayToDataTable);
        }
        console.log(keyToArray);
      })
      setTableData([...arrayToDataTable]);
      setKeyToDataArray([...keyToArray]);
      setOk(true);
      console.log("recebeu true");
    })
    // 
    //setStop(true);
    //return true;
  }

  function telaAddProduto() {
    setModalCadVisible(true);
    console.log(modalCadVisible);
  }

  function telaUpdateProduto(cellDataIndex) {
    setModalUpdateVisible(true);
    setCellIndexRow(parseInt(cellDataIndex));

    console.log(cellIndexRow);
    console.log(modalUpdateVisible);
  }

  function telaDeleteProduto(cellDataIndex) {
    setModalDeleteVisible(true);
    setCellIndexRow(parseInt(cellDataIndex));

    console.log(cellIndexRow);
    console.log(modalUpdateVisible);
  }

  const bttAcoes = (cellDataIndex) => (
    <>
      <TouchableOpacity onPress={() => telaUpdateProduto(cellDataIndex)} >
        <View style={styles.btn_a}>
          <Icon name="loop" size={30} color="#FFF" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => telaDeleteProduto(cellDataIndex)}>
        <View style={styles.btn_r}>
          <Icon name="cancel" size={28} color="#FFF" />
        </View>
      </TouchableOpacity>
    </>
  );

  if (ok === true) {
    return (
      <ScrollView style={styles.container} >
        <Image
          style={styles.img}
          source={require("../img/imagem-1.jpeg")}
        />

        <TouchableOpacity
          style={styles.btnAdd}
          onPress={telaAddProduto}
        >
          <Icon name="add" size={50} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnUp}
          onPress={getProduto}
        >
          <Icon name="loop" size={50} color="#FFF" />
        </TouchableOpacity>

        <Modal visible={modalCadVisible} animationType="fade" transparent={true} onRequestClose={() => setModalCadVisible(false)} >
          <ViewModalCad fechaModal={setModalCadVisible} preencheTabela={getProduto} selectedPicker={"Remédio"} />
        </ Modal>

        <Modal visible={modalUpdateVisible} animationType="fade" transparent={true} onRequestClose={() => setModalUpdateVisible(false)} >
          <ViewModalUpdate fechaModal={setModalUpdateVisible} preencheTabela={getProduto} keyProduto={cellIndexRow} />
        </ Modal>

        <Modal visible={modalDeleteVisible} animationType="fade" transparent={true} onRequestClose={() => setModalDeleteVisible(false)} >
          <ViewModalDelete fechaModal={setModalDeleteVisible} preencheTabela={getProduto} keyProduto={cellIndexRow} />
        </ Modal>

        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }} style={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.textHead} />
          {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? bttAcoes(cellData) : cellData} textStyle={{color: "#000", textAlign: "center"}} />
                  ))
                }
              </TableWrapper>
            ))

          }
        </Table>
      </ScrollView>
    );
  } else {
    return <ActivityIndicator size={50} color={"#1c26b0"} style={{ flex: 1 }} />
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 30,
    top: 0,
    backgroundColor: '#eceff1'
  },
  head: {
    height: 40,
    backgroundColor: '#213e6e'
  },
  textHead: {
    margin: 6,
    color: "#FFF"
  },
  row: {
    flexDirection: 'row'
  },
  btnAdd: {
    backgroundColor: '#213e6e',
    height: 50,
    textAlignVertical: "center",
    alignItems: "center",
    width: 50,
    borderRadius: 30,
    position: "absolute",
    right: 10
  },
  btnUp: {
    backgroundColor: '#b4ba04',
    height: 50,
    textAlignVertical: "center",
    alignItems: "center",
    width: 50,
    borderRadius: 30,
    position: "absolute",
    left: 10
  },
  btn_a: {
    width: 31,
    height: 28,
    top: 15,
    left: 5,
    backgroundColor: '#b4ba04',
    borderRadius: 2
  },
  btn_r: {
    width: 30,
    height: 28,
    bottom: 13,
    left: 45,
    backgroundColor: '#9e2116',
    borderRadius: 2
  },
  btnText: {
    textAlign: 'center',
    color: '#fff'
  },
  img: {
    left: 90,
    bottom: 20
  },
  table: {
    margin: 0,
    marginBottom: 60
  }
});