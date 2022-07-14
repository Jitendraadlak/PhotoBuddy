import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from '../screens/Login';
// import RegisterUser from '../screens/RegisterUser';
// import GetStarted from '../screens/GetStarted';
import { NavigationContainer } from '@react-navigation/native';
import ChangePassword from '../screens/ChangePassword';

import CameraScreen from '../screens/Camera_Screen';
import AddData from '../screens/AddData';
import Collection from '../screens/Collection';
import Home from '../screens/home';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import EditProfile from '../screens/EditProfile';
const Stack = createNativeStackNavigator();
const Auth_Stack = () => {
  return (
  
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="Collection" component={Collection} />
    <Stack.Screen name="AddData" component={AddData} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
   
   
   
    
    
    </Stack.Navigator>
   
  )
}

export default Auth_Stack

const styles = StyleSheet.create({})