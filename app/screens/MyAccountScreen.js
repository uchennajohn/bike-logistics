import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React,{useEffect, useState} from "react";
import { colors } from "../global/styles";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar, Icon } from "react-native-elements";
import {firebase} from '../../firebase'

const MyAccountScreen = ({navigation}) => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  useEffect(()=>{
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot)=>{
      if(snapshot.exists){
        setFirstName(snapshot.data().firstName)
        setLastName(snapshot.data().lastName)
        
      }else{
        console.log("User does not exist")
      }
    })
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.name}>{firstName}</Text>
            <Text style={{ ...styles.name }}>{lastName}</Text>
          </View>
          <View >
            <TouchableOpacity style={styles.rating}>
            <EvilIcons name="star" size={15} color="gray" />
            <Text style={styles.num}>5.0</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={()=> navigation.navigate("Settings")}>
            <Avatar
              rounded
              avatarStyle={{}}
              size={80}
              source={require("../../app/assets/blankProfilePic.jpeg")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.optionsContainer}> 
            <View>
              <TouchableOpacity>
              <Ionicons name="help-buoy" size={24} color="gray" />
              <Text style={styles.optionText}>Help</Text>
              </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity>
            <Ionicons name="wallet-outline" size={24} color="gray" />
              <Text style={styles.optionText}>Wallet</Text>
              </TouchableOpacity>

            </View>

            <View>
            <TouchableOpacity>
            <MaterialCommunityIcons name="bike-fast" size={24} color="gray" />
              <Text style={styles.optionText}>Deliveries</Text>
              </TouchableOpacity>
            
            </View>
        </View>

        <View style={styles.othersContainer}>
          <View   >
            <TouchableOpacity style={{flexDirection:"row"}}>
            <FontAwesome name="envelope" size={20} color="gray" />
              <Text style={styles.optionText2}>Messages</Text>
              </TouchableOpacity>
          </View>

          <View style={{marginTop:20}}>
            <TouchableOpacity style={{flexDirection:"row"}} onPress={()=>{navigation.navigate("Settings")}}>
            <Ionicons name="settings-outline" size={20} color="gray" />
              <Text style={styles.optionText2}>Settings</Text>
              </TouchableOpacity>
          </View>

          <View style={{marginTop:20}}>
            <TouchableOpacity style={{flexDirection:"row"}} onPress={()=> navigation.navigate("Legal")}>
            <FontAwesome name="legal" size={20} color="gray" />
              <Text style={styles.optionText2}>Legal</Text>
              </TouchableOpacity>
          </View>

          <View style={{marginTop:20}}>
            <TouchableOpacity onPress={() => {firebase.auth().signOut()}} style={{flexDirection:"row"}}>
            <FontAwesome name="sign-out" size={20} color="red" />
              <Text style={{ color:"red",fontSize: 15,marginLeft:30}}>Sign Out</Text>
              </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  name: {
    fontSize: 35,
    marginLeft: 10,
    color: colors.white,
  },
  num: {
    color: colors.white,
    marginLeft: 5,
  },

  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  imageContainer: {
    
    marginRight: 10,
    paddingTop: 30,
  },
  nameContainer: {},
  rating: {
    flexDirection: "row",
    marginLeft: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  optionText: {
    color: colors.white,
    fontSize: 15,
  },
  optionText2: {
    color: colors.white,
    fontSize: 15,
    marginLeft:30
  },
  othersContainer: {
    marginTop:50,
    marginLeft: 20,
  }
});
