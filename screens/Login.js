import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import { LOGIN_URL } from '../services/urls';
import LoadingComponent from '../components/LoadingComponent';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false)
  useEffect(() => {
    
    AsyncStorage.getItem('token', (err, result) => {
      console.log(result);
      if (result) {
       navigation.navigate('Home')
      }
    });
   
  }, []);


  const showSnackbar=(msg)=>{
     
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: "#ffffff",
      textColor: 'black'
    });
  }

  const validation = () => {
    if (!email) {
      showSnackbar('Email Field is Required')
    } else if (!password) {
      showSnackbar('Password Field is Required');
    } else if (password.length < 6) {
      showSnackbar('Passwprd length must be 6');
    } else {
      signIn();
    }
  };

  const signIn = async () => {
    let params = {
      email,
      password,
    };
    console.log(params);
 
       try {
        setLoading(true)
      const res = await axios.post(
        LOGIN_URL,
        params,
      );
      console.log('res==>', res);  
      setLoading(false)
   
      if(res.data.message){
        showSnackbar(res.data.message)
      }
      if (res.data.user.login_token) {
        await AsyncStorage.setItem('token', res.data.user.login_token);
        await AsyncStorage.setItem('userId', JSON.stringify(res.data.user.id));
        await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
       navigation.navigate("Home")
      console.log(res.data.user.login_token);
      console.log(res.data.user.id);
      console.log(res.data.user)
      
      
      } else {
        setLoading(false)
        
      }
    } catch (error) {
      setLoading(false)
      if(error.response.data.message){
        showSnackbar(error.response.data.message);
      }else{
        showSnackbar(error.response.data.errors[0]);
      }
     
     
      showSnackbar(error.response.data.message);
    }
  };

  return (
<View style={{flex:1,backgroundColor: '#353a40'}}>
{loading ?<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
<LoadingComponent/>
</View> :  <View style={{flex: 1}}>
<View>
<View
  style={{
    height: '10%',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    padding: 10,
  }}>
  <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
    SIGN IN
  </Text>
</View>
<ScrollView style={{margin: 10}}>
  <Image
    style={styles.Logo}
    source={require('../assets/img/logo1.png')}
  />

  <Text style={styles.Text1}>Email</Text>
  <TextInput style={styles.input} onChangeText={e => setEmail(e)} />

  <Text style={styles.Text1}>Password</Text>
  <TextInput style={styles.input} onChangeText={e => setPassword(e)} secureTextEntry />

  <TouchableOpacity style={styles.btn} onPress={() => validation()}>
   <Text style={styles.Text2}>Sign In</Text> 
  
   
  </TouchableOpacity>
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      margin: 10,
    }}>
    <Text style={styles.Text3}>Don't Have An Account ? </Text>
    <TouchableOpacity onPress={() => navigation.navigate('RegisterUser')}>
      <Text style={styles.Text3}>Sign Up </Text>
    </TouchableOpacity>
  </View>
  
</ScrollView>
</View>
</View> }
</View>







   
    
  );
};

export default Login;

const styles = StyleSheet.create({
  Logo: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    margin: '5%',
  },
  Text1: {
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    width: '100%',
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    borderColor: 'white',
    color: '#ffffff',
  },
  btn: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text2: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  Text3: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
