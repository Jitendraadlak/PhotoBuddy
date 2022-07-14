import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Exif from 'react-native-exif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import CardSlider from '../components/CardSlider';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../components/NoIntenet';
import { GET_PHOTO_DATA_USER_URL } from '../services/urls';
import axios from 'axios';

const Home = ({navigation}) => {
  const [saveimg, setSaveImg] = useState();
  const [resultData, setResultData] = useState();
  const [connected, setConnected] = useState();
  const [totalDataCount, setTotalDataCount] = useState(0);


  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      // console.log(result);
      getDataCount()
      if (!result) {
        navigation.navigate('Login');
      }
    });
  }, []);

  const getDataCount = async () => {
    let token = await AsyncStorage.getItem('token');
    // console.log(token);

    const config = {
      headers: {Authorization: `${token}`},
    };
    try {
      const res = await axios.post(GET_PHOTO_DATA_USER_URL, {}, config);
      //console.log('res==>', res);
      if (res.data.status == 200) {
       setTotalDataCount(res.data.data.length)
        //console.log('data',data)
      } else if (res.data.status == 401) {
      setTotalDataCount(0)
      }
    } catch (error) {
      console.log('error', error);
    }
  };


  useEffect(() => {
    NetInfo.fetch().then(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setConnected(state.isConnected);
    });
  }, []);

  const openCamera = async camera => {
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
        launchCamera(options, response => {
          // console.log('Response = ', response);
          if (response.didCancel) {
            return alert('image not captured');
          }

          let uri = response.assets[0].uri;
          //  console.log('===>', response.assets[0].base64);
          let base64 = response.assets[0].base64;

          Exif.getLatLong(uri)
            .then(({latitude, longitude}) => {
              if (!latitude && !longitude) {
                navigation.navigate('AddData', {uri, base64});
              } else {
                navigation.navigate('AddData', {uri, base64});
              }
            })
            .catch(msg => console.warn('ERROR: ' + msg));

          // Exif.getExif(uri)
          // .then(msg => console.log('OK: ' + JSON.stringify(msg)))
          // .catch(msg => console.warn('ERROR: ' + msg))
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
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
  return (
    <View style={{flex: 1, backgroundColor: '#353a40'}}>
      {!connected ? (
        <NoInternet />
      ) : (
        <View>
          <Header />
          <View style={styles.mainView}>
            <CardSlider totalCount={totalDataCount} />
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                }}>
                <LinearGradient
                  colors={['#272829', '#272829', '#6b6a66']}
                  style={styles.linearGradientbox}>
                  <TouchableOpacity
                    onPress={() => {
                      openCamera();
                    }}>
                    <Image
                      style={{height: 50, width: 50, tintColor: '#ffffff'}}
                      source={require('../assets/img/camera.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.subText}>Camera </Text>
                </LinearGradient>
                <LinearGradient
                  colors={['#272829', '#272829', '#6b6a66']}
                  style={styles.linearGradientbox}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Collection')}>
                    <Image
                      style={{height: 50, width: 50, tintColor: '#ffffff'}}
                      source={require('../assets/img/collection.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.subText}>Records</Text>
                </LinearGradient>
                <LinearGradient
                  colors={['#272829', '#272829', '#6b6a66']}
                  style={styles.linearGradientbox}>
                  <TouchableOpacity
                    onPress={() => showSnackbar('Comming Soon')}>
                    <Image
                      style={{height: 50, width: 50, tintColor: '#ffffff'}}
                      source={require('../assets/img/csv.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.subText}>CSV</Text>
                </LinearGradient>
                <LinearGradient
                  colors={['#272829', '#272829', '#6b6a66']}
                  style={styles.linearGradientbox}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}>
                    <Image
                      style={{height: 50, width: 50, tintColor: '#ffffff'}}
                      source={require('../assets/img/user.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.subText}>Profile</Text>
                </LinearGradient>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainView: {height: '80%', padding: 10, margin: 10},
  card: {
    height: '25%',
    backgroundColor: 'teal',
  },

  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  Text1: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  Text2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  linearGradientbox: {
    height: 120,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    width: 120,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 5,
  },
});
