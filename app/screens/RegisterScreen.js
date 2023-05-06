import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../firebase";



const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  

  const registerUser = async () => {
    
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=> {
          firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp:true,
            url:'https://logisticsapp-6d496.firebaseapp.com',
          })
          .then(()=>{
            alert('Verification email has been sent to your email address.')
          }).catch((error)=>{
            alert(error.message)
          })
          .then(()=>{
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
              email,
              password,
              firstName,
              lastName,
              phoneNumber,
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            })
          })
          .catch((error)=>{
            alert(error.message)
          })
        })
        .catch((error)=>{
          alert(error.message)
        })
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
          <Text style={styles.signUpText2}>Sign Up to Create Account</Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="body-outline" size={24} color="gray" />

            <TextInput
              placeholder="First Name"
              placeholderTextColor="gray"
              value={firstName}
              onChangeText={(firstName) => setFirstName(firstName)}
              style={styles.textInputs}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="body-outline" size={24} color="gray" />

            <TextInput
              placeholder="Last Name"
              placeholderTextColor="gray"
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
              style={styles.textInputs}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="mail-outline" size={24} color="gray" />

            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(email) => setEmail(email)}
              style={styles.textInputs}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems:"center" }}>
            <Ionicons name="body-outline" size={24} color="gray" />

            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              style={styles.textInputs}
            /> 
          </View>


          <View style={styles.passwordContainer}>
            <Ionicons name="key-outline" size={24} color="gray" />
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                autoCapitalize="none"
                autoCorrect={false}
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
            <TouchableOpacity onPress={()=> registerUser(firstName,lastName, email, password, phoneNumber)} style={styles.submitButton}>
              <Text
                style={{ fontSize: 20, color: "white", alignSelf: "center" }}
              >
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>

          {Platform.OS === "android" ? (
              <View style={{ marginLeft: 30 }}>
              <TouchableOpacity style={styles.googleButton}>
                <AntDesign name="google" size={24} color="white" />
                <Text style={styles.googleButtonText}>Sign Up with Google</Text>
              </TouchableOpacity>
            </View>
          ): null}
        
          <View style={styles.buttonContainer2}>
            <Text style={styles.newUserText}>I alredy have an account,</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signUpText2}>Sign In</Text>
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

export default RegisterScreen;

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
  submitButton: {
    backgroundColor: "gray",
    width: 100,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    marginLeft: 100,
  },
  buttonContainer2: {
    marginTop: 20,
    marginLeft: 50,
    flexDirection: "row",
  },
  signUpText2: {
    marginLeft: 5,
    color: "green",
    fontSize: 16,
  },
  newUserText: {
    color: "gray",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#DB4437",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: 250,
  },
  googleButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});





// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   alert('Invalid email address');
    //   return;
    // }