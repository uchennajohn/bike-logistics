import { ImageBackground, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation } from "@react-navigation/native";


const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Register");
    }, 3000);
  }, []);
  return (
    // <View style={styles.ImageBackground}>
    //  <View style={styles.logoContainer}>
    // <Image 
    // style={styles.logo}
    // source={require('../assets/delivery-man.jpg')}
    // /> 
    //  <Text style={{color:"white", fontSize:20, marginBottom:60,}}>Welcome to Delivery App</Text>
    // </View>
    // </View>

    <ImageBackground
    style={styles.ImageBackground}
    source={require('../assets/delivery-man.jpg')}
    >

    </ImageBackground>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(249,199,79,255)',
      
    },
    welcomeText:{
      fontSize:30,
      color:'red',
      

    },
    logo: {
      resizeMode: 'contain',
      width: '100%',
      height: '100%',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%",
      width: "100%",
    },
  
})

