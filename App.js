import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React,{useEffect, useState} from 'react';
import GetStarted from './screens/GetStarted';
import RegisterUser from './screens/RegisterUser';
import Login from './screens/Login';
import Home from './screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNav from './navigation/Tab_navigation';
import CameraScreen from './screens/Camera_Screen';
import AddData from './screens/AddData';
import Collection from './screens/Collection';
import ChangePassword from './screens/ChangePassword';
import Auth_Stack from './navigation/Auth_Stack'
import Public_Stack from './navigation/Public_Stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
const Stack = createNativeStackNavigator();

const App = () => {

const[token, setToken] = useState();
  useEffect(() => {
    
    AsyncStorage.getItem('token', (err, result) => {
      console.log(result);
      if (result) {
        setToken(result)
      }
    });
   
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  
  //     AsyncStorage.getItem('token', (err, result) => {
  //       console.log('===>',result);
  //       if (result) {
  //         setToken(result)
  //       }
  //     });

  //   }, 3000);

  //   return () => clearInterval(intervalId); //This is important
  // }, []);


  return (
   
   <View style={{flex:1, backgroundColor:'#f2d1c2'}}>
   <StatusBar
   animated={true}
   backgroundColor="black"
    />
<NavigationContainer>
<Stack.Navigator screenOptions={{headerShown: false}}>
<Stack.Screen name="Login" component={Login} />
<Stack.Screen name="Home" component={Home} />
<Stack.Screen name="ChangePassword" component={ChangePassword} />
<Stack.Screen name="Collection" component={Collection} />
<Stack.Screen name="AddData" component={AddData} />
<Stack.Screen name="Profile" component={Profile} />
<Stack.Screen name="GetStarted" component={GetStarted} />
<Stack.Screen name="RegisterUser" component={RegisterUser} />

<Stack.Screen name="EditProfile" component={EditProfile} />




</Stack.Navigator>
     </NavigationContainer>
   </View>
   
  )
}

export default App

const styles = StyleSheet.create({})