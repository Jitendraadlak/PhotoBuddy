import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const CardSlider = ({totalCount}) => {
  return (
    <ScrollView horizontal>
    <LinearGradient
    colors={['#FFA17F', '#00223E']}
    style={styles.linearGradient}>
    <View style={{flexDirection:'row', justifyContent:"space-evenly", alignItems:'center'}}>
  <View style={{width:'60%', paddingLeft:20, elevation:1}}>
  <Text style={styles.Text1}>Total Data Collected !!</Text>
  </View>

  <View style={styles.totalcount}>
  <Text style={styles.Text2}>{totalCount} </Text>
  </View>
    </View>
    
  </LinearGradient>

  <LinearGradient
  colors={['#FFA17F', '#00223E']}
  style={styles.linearGradient}>
  <View style={{flexDirection:'row', justifyContent:"space-evenly", alignItems:'center'}}>
<View style={{width:'60%', paddingLeft:15, elevation:1, paddingRight:15}}>
<Text style={styles.Text1}> Total Data Collected This Week</Text>
</View>

<View style={styles.totalcount}>
<Text style={styles.Text2}>0 </Text>
</View>
  </View>
  
</LinearGradient>



<LinearGradient
colors={['#FFA17F', '#00223E']}
style={styles.linearGradient}>
<View style={{flexDirection:'row', justifyContent:"space-evenly", alignItems:'center'}}>
<View style={{width:'60%', paddingLeft:20, elevation:1}}>
<Text style={styles.Text1}> Total Data Collected This Month</Text>
</View>

<View style={styles.totalcount}>
<Text style={styles.Text2}>0 </Text>
</View>
</View>

</LinearGradient>

  

    </ScrollView>
  )
}

export default CardSlider

const styles = StyleSheet.create({
    linearGradient: {
        height: 180,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        flexDirection: 'row',
        width:340,
        marginRight:20,
        shadowColor: "tomato",
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      },
      Text1: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign:'center'
      },
      Text2: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
      },
      totalcount:
  {width:'35%', 
  backgroundColor:'white',
   height:100,
    borderRadius:70,
     justifyContent:'center', 
     alignItems:'center',
   
    }
})