import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { firebase} from "../../firebase";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const loginUser = async () => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        alert(error.message)
      }
  }
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          {/* <Text style={styles.signUpText}>Sign Up</Text> */}
          <Text style={styles.signUpText2}>Sign in to access Account</Text>
        </View>

        <View style={{ marginTop: 50 }}>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="mail-outline" size={24} color="gray" />

            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.textInputs}
            />
          </View>

      

          <View
            style={styles.passwordContainer}
          >
            <Ionicons name="key-outline" size={24} color="gray" />
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={secureTextEntry}
                style={styles.textInputs}
              />
              <TouchableOpacity
                style={styles.eye}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <Ionicons
                  name={secureTextEntry ? "md-eye" : "md-eye-off"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=> loginUser(email, password)} style={styles.submitButton}>
              <Text style={{fontSize:20, color:"white", alignSelf:"center"}}>SIGN IN </Text>
            </TouchableOpacity> 
           </View>
        </View>

        <View>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInputs: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    width: 250,
    marginVertical: 10,
    marginLeft: 10,
    color: "white",
  },
  signUpText: {
    fontSize: 20,
    color: "#662d91",
    fontWeight: "bold",
  },
  signUpText2: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  submitButton:{
    backgroundColor:"gray",
    width:100,
    height:40,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
  },
  buttonContainer:{
    marginTop:20,
    marginLeft: 100
  },
  buttonContainer2:{
    marginTop:20,
    marginLeft: 50,
    flexDirection:"row"
  },
  signUpText2: {
    marginLeft: 5,
    color: "green",
    fontSize: 16,
  },
  newUserText:{
    color:"gray",
  }

});
