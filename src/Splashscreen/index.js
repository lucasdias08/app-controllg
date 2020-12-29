import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, StatusBar } from "react-native";
import {useNetInfo} from '@react-native-community/netinfo';

import { useNavigation } from "@react-navigation/native";

export default function Splash() {
    const navigation = useNavigation();

    const netInfo = useNetInfo();
    const [messageConnection, setMessageConnection] = useState("Buscando conexão com o Banco de Dados...");
    const [messageConnection_2, setMessageConnection_2] = useState("Verifique sua conexão.")

    useEffect(() => {
        if (netInfo.isConnected) {
            setMessageConnection('Conexão estabelecida!');
            setMessageConnection_2("Estamos montando a tela. Aguarde uns instantes.")
            
            setInterval(() => {
                navigation.navigate("Main")
            }, 4000);
        
        } else {
            setMessageConnection('Sem conexão com a internet! Feche e tente novamente');
        }
    }, [netInfo]);


    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Image
                style={styles.img}
                source={require("../img/imagem-2.jpeg")}
            />
            <ActivityIndicator size={50} color={"#1c26b0"} style={styles.indicator} />
            <Text style={styles.texto}>{messageConnection}</Text>
            <Text style={styles.texto2}>{messageConnection_2}</Text>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        position: "relative"
    },
    img: {
        flex: 1,
        position: "relative"
    },
    indicator: {
        bottom: 150,
        position: "absolute"
    },
    texto: {
        color: "#1c26b0",
        bottom: 110,
        fontWeight: "bold",
        position: "absolute"
    },
    texto2: {
        color: "#1c26b0",
        bottom: 90,
        fontWeight: "bold",
        position: "absolute"
    }
});