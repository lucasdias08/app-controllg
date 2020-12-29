import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icon from "react-native-vector-icons/MaterialIcons";
Icon.loadFont();

import TabFralda from "./src/TabFralda";
import TabRemedio from "./src/TabRemedio";
import SplashScreen from "./src/Splashscreen";


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false
          }}
      />

      <Stack.Screen
          name="Main"
          component={Tabs}
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


function Tabs() {

  const icons = {
    Remedio: {
      name:"add"
    },
    Fralda: {
      name:"loop"
    }
  };

  return (
    <Tab.Navigator
      screenOptions={ ({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const { name } = icons[route.name];
          return <Icon name={name} color={color} size={size} />;
        } 
      }) }
    >
      <Tab.Screen name="Remédios" component={TabRemedio} />
      <Tab.Screen name="Fraldas" component={TabFralda} />
    </Tab.Navigator>
  );
}