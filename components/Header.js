import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL, GETUSER_URL} from '../services/urls';
import axios from 'axios';
const Header = () => {
  
  const [connected, setConnected] = useState('none');
  const [resultData, setResultData] = useState({});
  useEffect(() => {
    getData();

    NetInfo.fetch().then(state => {
      //  console.log('Connection type', state.type);
      //console.log('Is connected?', state.isConnected);
      setConnected(state.isConnected);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      getData();
      NetInfo.fetch().then(state => {
        // console.log('Connection type', state.type);
        //console.log('Is connected?', state.isConnected);
        setConnected(state.isConnected);
      });
    }, 10000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  const getData = async () => {
    let id = await AsyncStorage.getItem('userId');
    let token = await AsyncStorage.getItem('token');
    //console.log(token);

    const config = {
      headers: {Authorization: `${token}`},
    };
    try {
      const res = await axios.post(GETUSER_URL,
        {},
        config,
      );
    //  console.log('res==>', res.data.user);
      setResultData(res.data.user_data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.subView}>
        {resultData.image ? (
          <Image
            style={{height: 40, width: 40, borderRadius: 50}}
            source={{uri: `${API_URL}/${resultData.image}`}}
          />
        ) : (
          <Image
            style={{height: 40, width: 40}}
            source={require('../assets/img/Avatar.png')}
          />
        )}
        <View>
          <Text style={styles.headerText}>
            {' '}
            Welcome, {resultData.first_name} !!
          </Text>
          {!connected ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 15, width: 15, marginLeft: 15}}
                source={require('../assets/img/offline.png')}
              />
              <Text
                style={{
                  color: 'tomato',
                  fontWeight: 'bold',
                  fontSize: 15,
                  paddingLeft: 1,
                }}>
                {' '}
                Offline
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 15, width: 15, marginLeft: 15}}
                source={require('../assets/img/online.png')}
              />
              <Text
                style={{
                  color: 'green',
                  fontWeight: 'bold',
                  fontSize: 15,
                  paddingLeft: 1,
                }}>
                {' '}
                Online
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    height: 70,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subView: {
    flexDirection: 'row',
    padding: 15,
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    paddingLeft: 10,
  },
  headerText1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    paddingLeft: 1,
  },
});
