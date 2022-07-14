import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Snackbar from 'react-native-snackbar';
import { EditProfile_URL } from '../services/urls';
  const EditProfile = ({navigation, route}) => {
    console.log('routedata',route.params )
    const routeData = route.params;
    const [loading, setLoading] = useState(false);
    const [first_name, setFirst_name] = useState(routeData.first_name);
    const [last_name, setLast_name] = useState(routeData.last_name);
    const [pan_number, setPanNumber] = useState(routeData.pan_number);
    const [dob, setDOB] = useState(routeData.dob);
    const [email, setEmail] = useState(routeData.email);
    const [phone, setPhone] = useState(routeData.phone);
    const [address, setAddress] = useState(routeData.address);

    
   
    const [showAlert, setShowAlert] = useState(false)
  
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
  
    const showSnackbar=(msg)=>{
       
      Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#ffffff",
        textColor: 'black'
      });
    }
  
    const validation = () => {
      if (!first_name) {
        showSnackbar('First Name Field is Required')
      }else
      if(!last_name){
        showSnackbar('Last Name Password Field is Required')
      }else 
      if(!phone){
        showSnackbar('Phone Field is Required')
      } 
      else 
      if(!address){
        showSnackbar('Address Field is Required')
      } 
      else 
      if(!dob){
        showSnackbar('Date of Birth Field is Required')
      } else{
        editProfile()
      }
    };
  

    const editProfile=async()=>{
      let token = await AsyncStorage.getItem('token');


      const config = {
        headers: { Authorization: token }
    };


      let params = {
        first_name,
        last_name,
        phone,
        address,
        dob,
    
      }
      console.log(params)
      try {
        setLoading(true)  
        const res= await axios.post(EditProfile_URL,params, config)
        setLoading(false)
        console.log('res==>',res)
      if(res.data.status == 200){
        showSnackbar(res.data.message)
      navigation.push('Profile')
      }else{
        setLoading(false)
        return showSnackbar('Something went wrong')
      }
        
      } catch (error) {
        setLoading(false)
        if(error.response.data.message){
          showSnackbar(error.response.data.message);
        }else{
          showSnackbar(error.response.data.errors[0]);
        }
      }
    
    }
    



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
       Edit Profile
      </Text>
    </View>
      <ScrollView style={{margin:10}}>
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
      <View><Text style={styles.Text1}>First Name</Text>
      <TextInput
      style={styles.input1}
      onChangeText={(e)=>setFirst_name(e)}
      value={first_name}
      
      />
     </View>
      <View>
      <Text style={styles.Text1}>Last Name</Text>
      <TextInput
      style={styles.input1}
      onChangeText={(e)=>setLast_name(e)}
      value={last_name}
      />
      </View>
      </View>
     
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
      <View><Text style={styles.Text1}>PAN (Not Changed)</Text>
      <TextInput
      style={styles.input1}
      onChangeText={(e)=>setPanNumber(e)}
      editable={false}
      value={pan_number}
      />
     </View>
      <View>
      <Text style={styles.Text1}>Date of Birth</Text>
      <TextInput
      style={styles.input1}
      onChangeText={(e)=>setDOB(e)}
     placeholder="DD/MM/YY"
     placeholderTextColor={"gray"}
      value={dob}
      />
      </View>
      </View>
     
      <Text style={styles.Text1}>Email (Not Changed)</Text>
      <TextInput
      style={styles.input}
      onChangeText={(e)=>setEmail(e)}
      editable={false}
      value={email}
      />
      <Text style={styles.Text1}>Mobile No.</Text>
      <TextInput
      style={styles.input}
      keyboardType='phone-pad'
      onChangeText={(e)=>setPhone(e)}
      value={phone}
      />
     
      <Text style={styles.Text1}>Address</Text>
      <TextInput
      style={styles.input}
      onChangeText={(e)=>setAddress(e)}
      value={address}
      />
      <TouchableOpacity style={styles.btn} onPress={()=>validation()}>
     <Text style={styles.Text2}>Confirm</Text> 
      </TouchableOpacity>
     
      </ScrollView>   
      </View>
    );
  };
  
  export default EditProfile;
  
  const styles = StyleSheet.create({
    Text1:{
        color:'white',
     marginTop:10,
        fontWeight:'bold',
       
      },
      input1:{
        height:45,
        width: 170,
        borderWidth:2,
        marginTop:10,
        borderRadius:5,
        padding:10,
        borderColor:'white',
        color:'#ffffff'
      },input:{
        height:45,
        width: "100%",
        borderWidth:2,
        marginTop:10,
        borderRadius:5,
        padding:10,
        borderColor:'white',
        color:'#ffffff',
        
      },
      btn:{
        height:50,
        width:"100%",
        backgroundColor:'white',
        marginTop:40,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    Text2:{
        fontWeight:'bold',
        color:'black',
        fontSize:18
    },
    Text3:{
        color:'#ffffff',
        fontSize:14,
        fontWeight:'bold'

    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
     
    },
    modalView: {
      margin: 20,
      backgroundColor: "#ffffff",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height:'80%',
      width:'80%'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize:20,
      fontWeight:"bold",
      color:"black"
    },
    agreementbtn:
    {justifyContent:"center", alignItems:"center", height:30, width:100, backgroundColor:'green', borderRadius:10}

  });
  