import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  Pressable,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {REGISTER_URL} from '../services/urls';
import LoadingComponent from '../components/LoadingComponent';
import {agreementData} from '../services/constants';
const RegisterUser = ({navigation}) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

  const validation = () => {
    if (regpan.test(pan)) {
      if (!first_name) {
        showSnackbar('first Name is Required');
      } else if (!last_name) {
        showSnackbar('last Name is Required');
      } else if (!dob) {
        showSnackbar('Date of Birth is Required');
      } else if (!email) {
        showSnackbar('Email Field is Required');
      } else if (!password) {
        showSnackbar('Password Field is Required');
      } else if (password.length < 6) {
        showSnackbar('Passwprd length must be 6');
      } else if (!phone) {
        showSnackbar('Phone no is Required');
      } else if (!address) {
        showSnackbar('Address is Required');
      } else {
        setModalVisible(true);
      }
    } else {
      // invalid pan card number
      showSnackbar('Invalid PAN');
    }
  };

  const showSnackbar = msg => {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#ffffff',
      textColor: 'black',
    });
  };

  const signUp = async () => {
    let params = {
      first_name,
      last_name,
      email,
      phone,
      password,
      address,
      dob,
      pan_number: pan,
    };
    console.log(params);
    try {
      setLoading(true);
      const res = await axios.post(REGISTER_URL, params);
      setLoading(false);
      console.log('res==>', res);
      if (res.data.status == 200) {
        showSnackbar(res.data.message);
        navigation.push('Login');
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

  const agreementfunc = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Agreement !!</Text>
              <View style={{height: '90%'}}>
                <ScrollView>
                  <Text
                    style={{fontSize: 16, textAlign: 'center', color: 'black'}}>
                    {agreementData}
                  </Text>
                </ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      Back
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => signUp()}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      Yes, I Agree
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#353a40'}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoadingComponent />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              height: '10%',
              backgroundColor: 'white',
              justifyContent: 'flex-end',
              padding: 10,
            }}>
            <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
              SIGN UP
            </Text>
          </View>
          <Image
            style={styles.Logo}
            source={require('../assets/img/logo1.png')}
          />

          <ScrollView style={{margin: 10}}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.Text1}>First Name</Text>
                <TextInput
                  style={styles.input1}
                  onChangeText={e => setFirstName(e)}
                />
              </View>
              <View>
                <Text style={styles.Text1}>Last Name</Text>
                <TextInput
                  style={styles.input1}
                  onChangeText={e => setLastName(e)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.Text1}>PAN </Text>
                <TextInput
                  style={styles.input1}
                  onChangeText={e => setPan(e)}
                />
              </View>
              <View>
                <Text style={styles.Text1}>Date of Birth</Text>
                <TextInput
                  style={styles.input1}
                  onChangeText={e => setDob(e)}
                  placeholder="DD-MM-YY"
                  placeholderTextColor={'gray'}
                />
              </View>
            </View>

            <Text style={styles.Text1}>Email</Text>
            <TextInput style={styles.input} onChangeText={e => setEmail(e)} />
            <Text style={styles.Text1}>Mobile No.</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              onChangeText={e => setPhone(e)}
            />
            <Text style={styles.Text1}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={e => setPassword(e)}
              secureTextEntry
            />

            <Text style={styles.Text1}>Address</Text>
            <TextInput style={styles.input} onChangeText={e => setAddress(e)} />
            <TouchableOpacity style={styles.btn} onPress={() => validation()}>
              <Text style={styles.Text2}>Sign Up</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                margin: 10,
              }}>
              <Text style={styles.Text3}> Have An Account ? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={styles.Text3}>Login </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {agreementfunc()}
        </View>
      )}
    </View>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  Logo: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  Text1: {
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
  input1: {
    height: 45,
    width: 170,
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    borderColor: 'white',
    color: '#ffffff',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '80%',
    width: '80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  agreementbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 100,
    backgroundColor: 'green',
    borderRadius: 10,
  },
});
