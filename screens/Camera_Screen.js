// import React, {useEffect, useState} from 'react'
// import {  StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import Exif from 'react-native-exif';
// import Geolocation from 'react-native-geolocation-service';
// import CameraRoll from "@react-native-community/cameraroll";
// //import ImagePicker from 'react-native-image-crop-picker';
// import Header from '../components/Header';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const CameraScreen = ({navigation}) => {
//   const [exifData, setexifData] = useState({});

// let lat;
// let long;
// useEffect(()=>{
//   const requestLocationPermission = async () => {
//     if (Platform.OS === "ios") {
//       getOneTimeLocation();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

//           {
//             title: "Location Access Required",
//             message: "This App needs to Access your location",
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {

//           getOneTimeLocation();
//         } else {
//           console.log("Permission Denied");
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };
//   requestLocationPermission();
// },[])

//   const getOneTimeLocation = async () => {
//     Geolocation.getCurrentPosition(
//       //Will give you the current location
//       (position) => {
//         console.log(position);
//         //getting the Longitude from the location json

//         lat = position.coords.latitude;
//         long = position.coords.longitude;
//         //Setting Longitude state
//         setexifData({
//           GPSLatitude: lat,
//          GPSLongitude: long,
//          GPSAltitude: 15.04444408,
//         })

//       },
//       (error) => {
//         alert(error.message);
//       }
//     );
//   };

//  const takePicture = async(camera)=> {
// //     const options = { quality: 0.5, exif:true };
// //     const data = await camera.takePictureAsync(options);
// //    console.log(data)
// //    CameraRoll.saveToCameraRoll(data.uri, 'photo').then(onfulfilled => {
// //     console.log(onfulfilled);
// //     Exif.getExif(onfulfilled)
// //     .then(msg => console.log('OK: ' + JSON.stringify(msg)))
// //     .catch(msg => console.warn('ERROR: ' + msg))
// // }).catch(error => {
// //   console.log(error);
// // });
// var options ={
//   width: 300,
//   height: 400,
//   cropping: true,
//   includeExif: true,
// }
// launchImageLibrary(options, (response) => {
//   console.log('Response = ', response);
//     Exif.getExif(response.assets[0].uri)
//     .then(msg => console.log('OK: ' + JSON.stringify(msg)))
//     .catch(msg => console.warn('ERROR: ' + msg))

// });

//   };

//     const click=()=>{
//     ImagePicker.openPicker({
//       width: 300,
//       height: 400,
//       cropping: true,
//       includeExif: true,

//     }).then(image => {
//     console.log(image)
//     Exif.getLatLong(image.path)
//     .then(({latitude, longitude}) => {alert('OK: ' + latitude + ', ' + longitude)})
//     .catch(msg => console.warn('ERROR: ' + msg))

//     });
//   }

//   const PendingView = () => (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'black',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width:'100%'
//       }}
//     >
//       <Text>App Requires Camera Permission to Access Camera</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//     <Header/>
//         <RNCamera
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.off}
//           trackingEnabled= {true}

//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//         >
//           {({ camera, status, recordAudioPermissionStatus }) => {
//             if (status !== 'READY') return <PendingView />;
//             return (
//               <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//                 <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
//                   <Text style={{ fontSize: 14, color:'#ffffff' }}> SNAP </Text>
//                 </TouchableOpacity>

//               </View>
//             );
//           }}
//         </RNCamera>
//       </View>
//   )
// }

// export default CameraScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',

//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 40,
//     justifyContent:'center',
//     alignItems:'center',
//     alignSelf: 'center',
//     margin: 20,
//     height:80,
//     width:80,
//     backgroundColor:'black'
//   },
// });

import {StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid} from 'react-native';
import React,{useEffect} from 'react';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Exif from 'react-native-exif';
import CameraRoll from '@react-native-community/cameraroll';

const CameraScreen = ({navigation}) => {

 






  const UploadFromGallery = async camera => {
    var options = {
      width: 300,
      height: 400,
      cropping: true,
      includeExif: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if(response.didCancel){
        return alert('image not selected')
      }
      let uri = response.assets[0].uri;

      Exif.getExif(uri)
        .then(msg => console.log('OK: ' + JSON.stringify(msg)))
        .catch(msg => console.warn('ERROR: ' + msg));
      Exif.getLatLong(uri)
        .then(({latitude, longitude}) => {
          if (!latitude && !longitude) {
            alert('Image does not containe Geolocation !!');
          }else{
            alert('OK: ' + latitude + ', ' + longitude)
           // navigation.navigate('AddData', uri)
          }
        })
        .catch(msg => console.warn('ERROR: ' + msg));
    }).catch(error => {
      console.log(error);
    });
  };

  const openCamera = async camera => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        var options = {
          width: 300,
          height: 400,
          cropping: true,
          includeExif: true,
        };
        launchCamera(options, response => {
          console.log('Response = ', response);
          if(response.didCancel){
            return alert('image not captured')
          }


           let uri = response.assets[0].uri;
            console.log('===>',response)
          CameraRoll.save(uri, 'photo')
            .then(onfulfilled => {
              console.log(onfulfilled);
              Exif.getExif(onfulfilled)
                .then(msg => console.log('OK: ' + JSON.stringify(msg)))
                .catch(msg => console.warn('ERROR: ' + msg));
              Exif.getLatLong(onfulfilled)
                .then(({latitude, longitude}) => {
                  if (!latitude && !longitude) {
                    alert('Captured Image does not containe Geolocation Please check Camera Location  !!');
                  }else{
                    alert('OK: ' + latitude + ', ' + longitude)
                    //navigation.navigate('AddData', uri)
                    
                  }
                })
                .catch(msg => console.warn('ERROR: ' + msg));
            })
            .catch(error => {
              console.log(error);
            });
    
          // Exif.getExif(uri)
          // .then(msg => console.log('OK: ' + JSON.stringify(msg)))
          // .catch(msg => console.warn('ERROR: ' + msg))
        });



      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }







   
  };


  



  return (
    <View>
      <Header />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          height: '90%',
          alignContent: 'center',
        }}>
        <LinearGradient
          colors={['#272829', '#272829', '#6b6a66']}
          style={styles.linearGradientbox}>
          <TouchableOpacity onPress={() => openCamera()}>
            <Image
              style={{height: 50, width: 50, tintColor: '#ffffff'}}
              source={require('../assets/img/camera.png')}
            />
          </TouchableOpacity>
          <Text style={styles.Text1}>Camera</Text>
        </LinearGradient>
        <LinearGradient
          colors={['#272829', '#272829', '#6b6a66']}
          style={styles.linearGradientbox}>
          <TouchableOpacity onPress={() => UploadFromGallery()}>
            <Image
              style={{height: 50, width: 50, tintColor: '#ffffff'}}
              source={require('../assets/img/upload.png')}
            />
          </TouchableOpacity>
          <Text style={styles.Text1}>Gallery</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  linearGradientbox: {
    height: 120,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    width: 120,
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text1: {
    fontSize: 16,
    color: '#ffffff',
  },
});
