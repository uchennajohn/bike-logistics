import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import { Avatar,Icon} from 'react-native-elements';
import { colors } from '../global/styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const LegalScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.titleView}> 
        <TouchableOpacity style={styles.view1} onPress={()=> navigation.goBack()}>
      <View >
                <Icon 
                 type ="material-community"
                 name ="arrow-left"
                 color ={colors.grey1}
                 size ={32}
                />
      </View>
      </TouchableOpacity>
         
        </View>
        <View style={styles.view2}>
        <Text style={styles.title}>Legal</Text>
        </View>


        <View style={styles.legalOptions}>

            <View style={styles.optionTouch}>
                <TouchableOpacity>
                    <Text style={styles.optionText}>Copyright</Text>
                </TouchableOpacity>
                
            </View  >
               
            <View style={styles.optionTouch}>
                <TouchableOpacity>
                            <Text style={styles.optionText}>Privacy Policy</Text>  
                </TouchableOpacity>
            </View>

          

            <View style={styles.optionTouch} >
            <TouchableOpacity>
                    <Text style={styles.optionText}>Terms & Conditions</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                    
                </TouchableOpacity>

            <View>
                
            </View>

        </View>


      
    </SafeAreaView>
  )
}

export default LegalScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black",
        

    },
    view1:{
        position:"absolute",
        top:30,
        left:12,
        backgroundColor:"black",
        height:40,
        width:40,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginTop:2, 
        zIndex: 8
        
      },
      optionText:{
        color:colors.white,
      },
        optionTouch:{
            marginTop:30,
            marginLeft:20,
        },
      title:{
        color:colors.white, 
        fontSize:45,
        marginLeft:20
      },
      view2:{
        position:"relative",
        marginTop:80,

        zIndex: 5,
        backgroundColor:"black"
      },
      
})