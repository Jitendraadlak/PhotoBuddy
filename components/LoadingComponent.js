import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const LoadingComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
    <LottieView source={require('../assets/img/loading.json')} autoPlay loop style={styles.loading} />
    </SafeAreaView>
  )
}

export default LoadingComponent

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor :'#353a40'
    },
    loading:{
        height:250
    }
})