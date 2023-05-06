import {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';



export const AuthContext = createContext();




 export const AuthProvider = ({children})=>{

const [isLoading, setIsLoading] = useState(false);
const [userToken, setUserToken] = useState(null);

     const login =(email, password, accountNumber)=>{
        setIsLoading(true)
        axios.post(`${BASE_URL}/auth/login`,{
            email,
            password,
            accountNumber
        })
        .then(res =>{
            console.log(res.data)
        })
        .catch(e =>{
            console.log(`Login Error: ${e}`)
        })
        // setUserToken("my-jwt")
        // AsyncStorage.setItem("userToken", "my-jwt")
        setIsLoading(false)
     }

     const logout =()=>{
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem("userToken")
        setIsLoading(false)
     }

     const isLoggedIn =async()=>{
       try {
        setIsLoading(true)
        let userToken= await AsyncStorage.getItem("userToken")
        setUserToken(userToken)
        setIsLoading(false)
       } catch (error) {
        console.log(`is Logged In Error: ${error}`)
       }
     }

     useEffect(()=>{
        isLoggedIn()
     },[])

    return(
        <AuthContext.Provider value={{
           login,
           logout,
           isLoading,
           userToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}