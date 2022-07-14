import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_PHOTO_DATA_USER_URL, API_URL} from '../services/urls';
//f2d1c2
const Collection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let token = await AsyncStorage.getItem('token');
    // console.log(token);

    const config = {
      headers: {Authorization: `${token}`},
    };
    try {
      const res = await axios.post(GET_PHOTO_DATA_USER_URL, {}, config);
      //console.log('res==>', res);
      if (res.data.status == 200) {
        setLoading(false);
        setData(res.data.data);
        //console.log('data',data)
      } else  {
        setLoading(false);
        alert('No data found');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const onRefresh = () => {
    setLoading(true);
    getData();
  };

  const Item = ({item}) => (
    <View style={styles.item}>
      <View style={{height: 80, width: 100}}>
        <Image
          style={{height: 80, width: 100}}
          source={{uri: `${API_URL}/${item.image}`}}
        />
      </View>
      <View>
        <Text style={{color: 'black', fontSize: 16}}>
          Uploaded At : {item.created_at.slice(0, 10)}
        </Text>
      </View>
    </View>
  );

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
  const renderItem = ({item}) => <Item title={item} />;

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     getLocalData()

  //   }, 10000);

  //   return () => clearInterval(intervalId); //This is important
  // }, []);

  // const getLocalData=async()=>{
  //  await AsyncStorage.getItem('data', (err, result) => {
  //     console.log(result);
  //     if (result) {

  //      setData(JSON.parse(result))

  //     }
  //   });
  // }

  return (
    <View style={{flex: 1, backgroundColor: '#353a40'}}>
      <Header />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={Item}
          keyExtractor={item => item.id}
          onRefresh={() => onRefresh()}
          refreshing={loading}
        />
      </SafeAreaView>
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    height: 150,
    width: '90%',
    margin: 20,
    borderRadius: 5,

    justifyContent: 'center',
  },
  cardview: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: 'gray',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: '#ffffff',
  },
});
