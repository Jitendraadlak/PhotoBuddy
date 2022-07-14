import { StyleSheet, Text, View, Image } from 'react-native'
import React,{useEffect} from 'react'

const GetStarted = ({navigation}) => {




  return (
    <View style={styles.mainContainer}>
    <Image
    style={styles.Logo}
    source={require('../assets/img/logo1.png')}
  />
  <Text style={styles.logoText}> </Text>
    </View>
  )
}

export default GetStarted

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black'
  },
  Logo:{
    height:200,
    width:200
  },
  logoText:{
    color:'black',
    margin:20,
    fontWeight:'bold',
    fontSize:20,
    color:'white'
  }
})