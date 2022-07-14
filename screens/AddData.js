import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Exif from 'react-native-exif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {DATAPICUPLOAD_URL} from '../services/urls';
const AddData = ({navigation, route}) => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [area_code, setArea_Code] = useState('');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState();

  //console.log('uri', route.params);
  let img = route.params.uri;
  let lat;
  let lng;

  useEffect(() => {}, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.

      NetInfo.fetch().then(state => {
        // console.log('Connection type', state.type);
        // console.log('Is connected?', state.isConnected);
        setConnected(state.isConnected);
      });
      // if (lat && lng) {
      //   fetchAddress();
      // }
      // fetchAddress();
    }, 10000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.

      AsyncStorage.getItem('token', (err, result) => {
        // console.log(result);
        if (!result) {
          navigation.navigate('Login');
        }
      });
    }, 2000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setConnected(state.isConnected);
    });
    //image exif data
    Exif.getExif(img)
      .then(msg => console.log('exif data image: ' + JSON.stringify(msg)))
      .catch(msg => console.warn('ERROR: ' + msg));

    Exif.getLatLong(img)
      .then(({latitude, longitude}) => {
        if (!latitude && !longitude) {
          showSnackbar(
            'Captured Image does not contained Geolocation Please check Camera setting  !!',
          );
        } else {
          // alert('OKAY: ' + latitude + ', ' + longitude);
          lat = latitude;
          lng = longitude;

          // fetchAddress();
          if (lat && lng) {
            fetchAddress();
          }
        }
      })
      .catch(msg => console.warn('ERROR: ' + msg));
  }, []);

  const mapUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  const apiKey = 'AIzaSyDxjOnSHmNUO0jcepwRsDD1-FLOBTViNvA';

  const showSnackbar = msg => {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'black',
      textColor: '#ffffff',
    });
  };

  const fetchAddress = async () => {
    try {
      let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lng}`);
      let json = await response.json();
        console.log('response', json)
        setAddress(json.features[0].properties.display_name)
        setLocation(json.features[0].properties.address.city + " " + json.features[0].properties.address.state)
        setArea_Code(json.features[0].properties.address.postcode)
        console.log(location)
        // if (json.results[0].formatted_address) {
      //   // console.log(json.results[0].address_components);
      //   setAddress(json.results[0].formatted_address);
      //   // alert(address)
      // } else {
      //   return alert('Some Error Occurred');
      // }
    } catch (error) {
      console.log(error);

     // setAddress([lat, lng]);
    }
  };

  const Submit = async () => {
    if (connected) {
      setLoading(true);
      let id = await AsyncStorage.getItem('userId');
      let token = await AsyncStorage.getItem('token');
      //console.log(id)
      // console.log(imguri);

      const data = new FormData();
      data.append('address', address);
      data.append('location', location);
      data.append('area_code', area_code);
      data.append('image', {
        name: 'image',
        fileName: 'image',
        type: 'image/png',
        uri: Platform.OS === 'android' ? img : img.replace('file://', ''),
      });

      console.log(data);
      try {
        axios
          .post(DATAPICUPLOAD_URL, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token,
            },
          })
          .then(response => {
            setLoading(false);

            console.log(response);

            showSnackbar(response.data.message);
            navigation.navigate('Home');
            console.log(response.data.message);
          })
          .catch(error => {
            setLoading(false);
            if (error.response.data.errors[0]) {
              showSnackbar(error.response.data.errors[0]);
            }
            if (error.response.data.message) {
              showSnackbar(error.response.data.message);
            }
            console.log(error);
          });
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    } else {
      alert('You are Offline !!');
    }
    // const imagePath = `${RNFS.PicturesDirectoryPath
    //   }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
    // console.log(imagePath);
    // if (Platform.OS === 'ios') {
    //   RNFS.copyAssetsFileIOS(img, imagePath, 0, 0)
    //     .then(res => {
    //       console.log('aaya');
    //     })
    //     .catch(err => {
    //       console.log('ERROR: image file write failed!!!');
    //       console.log(err.message, err.code);
    //     });
    // } else if (Platform.OS === 'android') {
    //   RNFS.copyFile(img, imagePath)
    //     .then(res => {
    //       console.log('aaya');

    //       let obj = {
    //         image: `file://${imagePath}`,
    //       };
    //       //alert('not connected');
    //       AsyncStorage.getItem('data', (err, result) => {
    //         console.log(result);
    //         if (result !== null) {
    //           var newIds = JSON.parse(result);
    //           var data = [];
    //           data = Array.from(newIds);
    //           data.push(obj);
    //           AsyncStorage.setItem('data', JSON.stringify(data));
    //           alert('Data offline stored');
    //         } else {
    //           AsyncStorage.setItem('data', JSON.stringify([obj]));
    //           alert('Data offline stored');
    //         }
    //       });
    //     })
    //     .catch(err => {
    //       console.log('ERROR: image file write failed!!!');
    //       console.log(err.message, err.code);
    //     });
    // }

    // let dirs = RNFetchBlob.fs.dirs

    // RNFetchBlob
    // .config({
    //   fileCache : true,
    //   // by adding this option, the temp files will have a file extension
    //   appendExt : 'png'
    // })
    // .fetch('GET', img , {
    //   //some headers ..
    // })
    // .then((res) => {
    //   // the path should be dirs.DocumentDir + 'path-to-file.anything'
    //   console.log('The file saved to ', res.path())
    //   alert('file://'+res.path())
    // })

    //           var path = 'file:///data/user/0/com.cameraapp/files/RNFetchBlobTmp_pf13gfbxuikr20yy2fjo.png'

    // return RNFS.unlink(path)
    //   .then(() => {
    //     console.log('FILE DELETED');
    //   })
    //   // `unlink` will throw an error, if the item to unlink does not exist
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

    //   } else {
    //     console.log('Camera permission denied');
    //   }
    // } catch (err) {
    //   console.warn(err);
    // }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#353a40'}}>
      <Header />
      <View>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10%',
            }}>
            <View
              style={{
                height: 300,
                width: '90%',
                borderWidth: 0.7,
                borderColor: 'gray',
                borderRadius: 5,
              }}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={{
                  uri: img,
                }}
              />
            </View>
            {address ? (
              <View style={{width: '100%', alignItems: 'center', marginTop: 5}}>
              
                <View style={styles.textInput1}>
                <Text style={styles.text1}>Complete Address</Text>
                  <Text style={{color: 'black', letterSpacing: 3}}>
                    {address}
                  </Text>
                </View>
              </View>
            ) : null}

            {address ? (
              <TouchableOpacity
                style={{
                  height: 50,
                  width: '90%',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => Submit()}>
                {loading ? (
                  <ActivityIndicator size="large" color="black" />
                ) : (
                  <Text
                    style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                    SUBMIT
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  height: 50,
                  width: '90%',
                  backgroundColor: 'gray',
                  borderRadius: 5,
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() =>
                  Snackbar.show({
                    text: "Image Doesn't Contain Geolocation Please Check Camera Setting",
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'black',
                    textColor: 'tomato',
                  })
                }>
                <Text
                  style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    margin: 10,
  },
  textContainer: {
    height: 200,
    width: '90%',
    borderWidth: 0.7,
    backgroundColor: 'lightgray',
    marginTop: '15%',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text1: {
    color: 'black',
    fontWeight: 'bold',
  },
  textInput: {
    height: 45,
    width: 150,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
  },
  textInput1: {
    height: 150,
    width: '90%',
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
    marginLeft: 2,
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
});
