import {StatusBar} from "expo-status-bar"
import { StyleSheet, Text, View,Dimensions, ScrollView, TouchableOpacity, Image,  } from 'react-native'
import React, { useContext , useState, useRef, useEffect} from 'react'
import * as Location from "expo-location"
import { firebase } from "../../firebase"

const SCREEN_WIDTH = Dimensions.get('window').width
import { colors,parameters } from '../global/styles'

const DashboardScreen = ({navigation}) => {

    const [firstName, setFirstName] = useState("")

    useEffect(()=>{
      firebase.firestore().collection("users")
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot)=>{
        if(snapshot.exists){
          setFirstName(snapshot.data().firstName)
        }else{
          console.log("User does not exist")
        }
      })
    },[])

    const now = new Date();
    const currentHour = now.getHours();
    let greeting = "";

    if (currentHour >= 0 && currentHour < 12) {
      greeting = "Good morning,";
    } else if (currentHour >= 12 && currentHour < 16) {
      greeting = "Good afternoon,";
    } else {
      greeting = "Good evening,";
    }

    const {latLng, setLatLng} = useState({})

    const checkPermission = async () => {
        const hasPermission = await Location.requestForegroundPermissionsAsync();
        
        if(hasPermission === "granted"){
            const permission = await askPermisson()
            return permission
        }
        return true
    }

    const askPermisson = async() => {
        const permission = await Location.requestForegroundPermissionsAsync();
        return permission.status === "granted";
    }

    const getLocation = async() => {
        try {
            const {granted} = await Location.requestBackgroundPermissionsAsync();
            if(!granted) return;

            const {
                coords: {latitude, longitude},
            } = await Location.getCurrentPositionAsync();
            setLatLng({latitude: latitude, longitude: longitude})
        } catch (error) {
            
        }
    }

    const _map = useRef(1)

    useEffect(()=>{
        checkPermission();
        getLocation()
       // console.log(latLng)
    ,[]})
    
    
  return (
    <View style={styles.container}> 
            <View style={styles.header} />
             <ScrollView 
            bounces={false}
            showsVerticalScrollIndicator={false}
            >
                <View style={styles.home}>
                <Text style={{color: colors.white, fontSize: 21}}>{greeting} {firstName}</Text>
                    <Text style={styles.text1}>Worry Less</Text>
                    <View style={styles.view1}>
                            <View style={styles.view8}>
                                    <Text style={styles.text2}>Ready Your Parcel. Click A Button. Parcel Delivered.</Text>
                                   
                            </View>
                            <View>
                                <Image 
                                style={styles.image1}
                                source={require("../../app/assets/side-image.jpeg")}
                                />
                            </View>
                    </View>
                </View>
                <View style={styles.button1}>
                                        <TouchableOpacity onPress={()=>{navigation.navigate("Request")}}>
                                            <Text style={styles.button1Text}>Make Your Request</Text>
                                        </TouchableOpacity>

                                    </View>


            </ScrollView>
     <StatusBar style='light' backgroundColor="#2058c0" translucent={true} />
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black",
        paddingBottom:30,
        paddingTop:parameters.statusBarHeight,
        
    },
    header:{
      backgroundColor:"black",
      height:parameters.headerHeight,
      alignItems:"flex-start"
     
    },
    
    image1:{
     
      height:100,
      width:100,
      overflow: 'hidden',
      overflow: 'hidden',
      borderTopLeftRadius: 75,
    
    },
    
    image2:{height:60,width:60,
            borderRadius:30,
          },
    
    home:{
     backgroundColor:"black",
     paddingLeft:20,
     
    },
    
    text1:{
     color:colors.white,
     fontSize:21,
     paddingBottom:20,
     paddingTop:20
    },
    
    text2:{
     color:colors.white,
     fontSize:16
    },
    
    view1:{
     flexDirection:"row",
     flex:1,
     paddingTop:30
    },
    
    button1:{
      height:40,
      width:170,
      backgroundColor:"white",
      borderRadius:20,
      alignItems:"center",
      justifyContent:"center",
      marginTop:300,
      marginLeft:100,
      position:"relative",

      paddingLeft:5,
    
      
    },
    
    button1Text:{
     color:"black",
     fontSize:17,
     margin:2
    
    },
    card:{
     alignItems:"center",
     margin:SCREEN_WIDTH/22
    
    },
    
    view2:{marginBottom:5,
          borderRadius:15,
          backgroundColor:colors.grey6
        },
    
        title:{
          color:colors.black,
          fontSize:16
        },
    view3:{flexDirection:"row",
             marginTop :5,
             height:50,
             backgroundColor:colors.grey6,
             alignItems:"center",
             justifyContent:"space-between",
            marginHorizontal:15
            
             },
    text3:{marginLeft:15,
            fontSize:20,
            color:colors.black
      },
    
    view4:{ flexDirection:"row",
            alignItems:"center",
            marginRight:15,
            backgroundColor:"white",
            paddingHorizontal:10,
            paddingVertical:2,
            borderRadius:20
            },
    
    view5:{ flexDirection:"row",
    alignItems:"center",
    backgroundColor:"white",
    paddingVertical:25,
    justifyContent:"space-between",
    marginHorizontal:15,
    borderBottomColor:colors.grey4,
    borderBottomWidth:1,
    flex:1
    },
    
    view6:{
    
    
    alignItems:"center",
    flex:5,
    flexDirection:"row"
    },
    view7:{
    backgroundColor:colors.grey6,
    height:40,
    width:40,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    marginRight:20
    
    },
    
    map:{
       
    height: 250,
     marginVertical: 0,
     width:SCREEN_WIDTH*0.92
    },
    
    text4:{ fontSize:20,
          color:colors.black,
          marginLeft:20,
          marginBottom:20
        },
    
    icon1:  {marginLeft:10,
           marginTop:5
          },

    view8: {flex:4,
          marginTop:-25
        } ,
    carsAround: {
    width: 28,
    height: 14,
    
    }, 
    
    location: {
      width: 16,
      height: 16,
      borderRadius:8,
      backgroundColor:colors.blue,
      alignItems:"center",
      justifyContent:"center"
      
      }, 
      
    view9:{width:4,
    height:4,
    borderRadius:2,
    backgroundColor:"white"
    }


})