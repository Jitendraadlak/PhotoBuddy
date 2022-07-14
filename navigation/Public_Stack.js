import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import RegisterUser from '../screens/RegisterUser';
import GetStarted from '../screens/GetStarted';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const Public_Stack = () => {
  return (

    <Stack.Navigator  initialRouteName="Login" screenOptions={{headerShown: false}}>
    <Stack.Screen name="GetStarted" component={GetStarted} />
    <Stack.Screen name="RegisterUser" component={RegisterUser} />
    <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
   
  )
}

export default Public_Stack

const styles = StyleSheet.create({})