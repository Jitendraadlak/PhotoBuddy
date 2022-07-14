import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {API_URL, GETUSER_URL, PROFILEPICUPLOAD_URL} from '../services/urls';
import axios from 'axios';

const Profile = ({navigation}) => {
  const [resultData, setResultData] = useState([{}]);
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [asyncData, setAsyncData] = useState([{}]);

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     //assign interval to a variable to clear it.

  //   AsyncStorage.getItem('token', (err, result) => {
  //     console.log(result);
  //     if (!result) {
  //       // alert("your session is expired")
  //       navigation.navigate('Login');
  //     }
  //   });
  //   }, 2000);

  //   return () => clearInterval(intervalId); //This is important
  // }, []);

  const getData = async () => {
    let id = await AsyncStorage.getItem('userId');
    let userData = await AsyncStorage.getItem('userData');
    // console.log('userData',userData);
    setAsyncData(userData);
    // console.log(id);
    let token = await AsyncStorage.getItem('token');

    const config = {
      headers: {Authorization: token},
    };
    try {
      const res = await axios.post(GETUSER_URL, {}, config);
      console.log('res==>', res.data.user_data);
      setResultData(res.data.user_data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const showSnackbar = msg => {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'black',
      textColor: '#ffffff',
    });
  };

  const picker = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        var options = {
          includeExif: true,
          includeBase64: true,
        };
        launchImageLibrary(options, response => {
          // console.log('Response = ', response);
          if (response.didCancel) {
            return alert('image not captured');
          }

          console.log(response);
          let imguri = response.assets[0].uri;

          if (response.assets[0].uri != null) {
            uploadImg(imguri);
          } else {
            // Validation Alert
            Alert.alert('Please Select image first');
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const uploadImg = async imguri => {
    setLoading(true);
    let id = await AsyncStorage.getItem('userId');
    let token = await AsyncStorage.getItem('token');
    //console.log(id)
    console.log(imguri);

    const data = new FormData();
    data.append('image', {
      name: 'image',
      fileName: 'image',
      type: 'image/png',
      uri: Platform.OS === 'android' ? imguri : imguri.replace('file://', ''),
    });

    console.log(data);
    try {
      axios
        .post(PROFILEPICUPLOAD_URL, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        })
        .then(response => {
          setLoading(false);
          getData();
          console.log(response);
          showSnackbar(response.data.message);
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const Logout = async () => {
    await AsyncStorage.setItem('token', '');
    await AsyncStorage.setItem('userId', '');
    await AsyncStorage.setItem('data', '');
    navigation.popToTop();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: '30%',
          backgroundColor: '#353a40',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.circleAvatar}>
          <TouchableOpacity onPress={() => picker()}>
            {resultData.image ? (
              <Image
                style={{height: 100, width: 100, borderRadius: 50}}
                source={{uri: `${API_URL}/${resultData.image}`}}
              />
            ) : (
              <Image
                style={{height: 100, width: 100}}
                source={require('../assets/img/Avatar.png')}
              />
            )}
          </TouchableOpacity>
        </View>
        {loading ? <ActivityIndicator size="large" color="white" /> : null}
        <Text
          style={{
            color: '#ffffff',
            margin: 15,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {resultData.first_name} {resultData.last_name}
        </Text>
      </View>

      {resultData.first_name ? (
        <ScrollView
          style={{
            margin: 10,
            padding: 10,
          }}>
          <View style={styles.subview}>
            <Image
              style={styles.img}
              source={require('../assets/img/user.png')}
            />
            <Text style={styles.Text1}>
              {resultData.first_name} {resultData.last_name}
            </Text>
          </View>

          <View style={styles.subview}>
            <Image
              style={styles.img}
              source={require('../assets/img/email.png')}
            />
            <Text style={styles.Text1}>{resultData.email}</Text>
          </View>

          <View style={styles.subview}>
            <Image
              style={styles.img}
              source={require('../assets/img/mobile.png')}
            />
            <Text style={styles.Text1}>+{resultData.phone}</Text>
          </View>
          <View style={styles.subview}>
            <Image
              style={styles.img}
              source={require('../assets/img/pan.png')}
            />
            <Text style={styles.Text1}>{resultData.pan_number}</Text>
          </View>
          <View style={styles.subview}>
            <Image
              style={styles.img}
              source={require('../assets/img/dob.png')}
            />
            <Text style={styles.Text1}>{resultData.dob}</Text>
          </View>
          <View style={styles.subview}>
            <Image
              style={styles.img}
              source={require('../assets/img/address.png')}
            />
            <Text style={styles.Text1}>{resultData.address}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => navigation.navigate('ChangePassword')}>
              <Text style={styles.Text2}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => navigation.navigate('EditProfile', resultData)}>
              <Text style={styles.Text2}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => Logout()}>
            <Text style={styles.Text2}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Text1: {
    marginLeft: 20,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 0.7,
    padding: 10,
    width: '80%',
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  subview: {flexDirection: 'row', margin: 5},
  btn: {
    height: 50,
    width: '100%',
    backgroundColor: '#353a40',
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text2: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  img: {height: 30, width: 30, marginTop: 10, tintColor: '#FFA17F'},
  circleAvatar: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    borderWidth: 3,
    borderColor: 'lightgray',
    borderRadius: 60,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 10,
  },
  btn1: {
    height: 50,
    width: '48%',
    backgroundColor: '#353a40',
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
