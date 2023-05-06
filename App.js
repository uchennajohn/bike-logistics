import 'react-native-gesture-handler'
import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { OriginContextProvider, DestinationContextProvider } from './app/context/contexts';
import AppNavigator from './app/navigation/AppStack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DestinationContextProvider>
      <OriginContextProvider>
        <NavigationContainer>
          <AppNavigator />
          </NavigationContainer>
    </OriginContextProvider>
   </DestinationContextProvider>
   

  )
}


const styles = StyleSheet.create({});
