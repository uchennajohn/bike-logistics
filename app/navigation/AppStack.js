import { Button, StyleSheet, Text, View } from "react-native";
import React,{useState, useEffect} from "react";
//import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../screens/SplashScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PaymentScreen from "../screens/PaymentScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RequestScreen from "../screens/RequestScreen";
import DestinationScreen from "../screens/DestinationScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LegalScreen from "../screens/LegalScreen";
import {firebase} from '../../firebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AppScreenStackNavigator() {
  return(
    <Stack.Navigator>
        <Stack.Screen
        name="MainTab"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />


 <Stack.Screen
        name="Destination"
        component={DestinationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Request"
        component={RequestScreen}
        options={{ headerShown: false }}
      />

     <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />

<Stack.Screen
        name="Legal"
        component={LegalScreen}
        options={{ headerShown: false }}
      />
    
    </Stack.Navigator>
  )
}





function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

     

      
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: "black",
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
          headerShown: false,
        }}
        component={MyAccountScreen}
      />
    </Tab.Navigator>
  );
}
const AppNavigator = () => {

  const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState();

function onAuthStateChanged(user) {
  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(() => {
const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
return subscriber; // unsubscribe on unmount
}, []);

if (initializing) return null;

if(!user) {
return (
 <AuthStackNavigator/>
)

}

return (
  <AppScreenStackNavigator />
)
  
  
};

export default AppNavigator;