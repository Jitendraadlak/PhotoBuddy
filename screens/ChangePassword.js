import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {ChangePassword_URL} from '../services/urls';
const ChangePassword = ({navigation}) => {
  const [current_password, setCurrentPassword] = useState();
  const [new_password, setNewPassword] = useState();
  const [confirm_new_password, setConfirmNewPassword] = useState();
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.

      AsyncStorage.getItem('token', (err, result) => {
        console.log(result);
        if (!result) {
          navigation.navigate('Login');
        }
      });
    }, 2000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  const showSnackbar = msg => {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#ffffff',
      textColor: 'black',
    });
  };

  const validation = () => {
    if (!current_password) {
      showSnackbar('Current Password Field is Required');
    } else if (!new_password) {
      showSnackbar('New Password Field is Required');
    } else if (!confirm_new_password) {
      showSnackbar('Confirm New Password Field is Required');
    } else {
      changepasswordfunc();
    }
  };

  const changepasswordfunc = async () => {
    let token = await AsyncStorage.getItem('token');

    const config = {
      headers: {Authorization: token},
    };

    let params = {
      current_password,
      new_password,
      confirm_new_password,
    };
    console.log(params);
    try {
      setLoading(true);
      const res = await axios.post(ChangePassword_URL, params, config);
      setLoading(false);
      console.log('res==>', res);
      if (res.data.status == 200) {
        showSnackbar(res.data.message);
        await AsyncStorage.setItem('token', '');
        await AsyncStorage.setItem('userId', '');
        await AsyncStorage.setItem('data', '');
        showSnackbar('Login Again');
        navigation.popToTop();
      } else {
        setLoading(false);
        return showSnackbar('Something went wrong');
      }
    } catch (error) {
      setLoading(false);
      if (error.response.data.message) {
        showSnackbar(error.response.data.message);
      } else {
        showSnackbar(error.response.data.errors[0]);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#353a40'}}>
      <View
        style={{
          height: '10%',
          backgroundColor: 'white',
          justifyContent: 'flex-end',
          padding: 10,
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
          Change Password
        </Text>
      </View>
      <ScrollView style={{margin: 10}}>
        <Text style={styles.Text1}>Current Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setCurrentPassword(e)}
          secureTextEntry
        />

        <Text style={styles.Text1}>New Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setNewPassword(e)}
          secureTextEntry
        />

        <Text style={styles.Text1}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setConfirmNewPassword(e)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={() => validation()}>
          {loading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <Text style={styles.Text2}>Change Password</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

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
