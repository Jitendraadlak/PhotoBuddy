// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { StyleSheet, Text, View, Image } from 'react-native'
// import Home from '../screens/home';
// import CameraScreen from '../screens/Camera_Screen';
// import Collection from '../screens/Collection';
// import Profile from '../screens/Profile';

// const Tab = createBottomTabNavigator();

// export default function TabsNav() {
//   return (
//     <Tab.Navigator screenOptions={{headerShown:false}}>
//       <Tab.Screen name="Home" component={Home} options={{
//         tabBarIcon: ({ color }) => (
//           <Image
//            style={{height:30, width:30}}
//             source={require('../assets/img/home.png')                  
//             }/>
//        ), 
//        tabBarLabel: ({focused, color}) => (
//         <Text style={{color: focused ? 'red' : color, fontSize:12, fontWeight:'bold'}}>Home</Text>
//       )             
//       }}
      
      
      
//       />
//       <Tab.Screen name="Collection" component={Collection}
//       options={{
//         tabBarIcon: ({ color }) => (
//           <Image
//            style={{height:30, width:30}}
//             source={require('../assets/img/collection.png')                  
//             }/>
//        ), 
//        tabBarLabel: ({focused, color}) => (
//         <Text style={{color: focused ? 'red' : color, fontSize:12, fontWeight:'bold'}}>Collections</Text>
//       ),
                  
//       }}
      
//       />
//       <Tab.Screen name="Profile" component={Profile}
//       options={{
//         tabBarIcon: ({ color }) => (
//           <Image
//            style={{height:30, width:30}}
//             source={require('../assets/img/user.png')                  
//             }/>
//        ), 
//        tabBarLabel: ({focused, color}) => (
//         <Text style={{color: focused ? 'red' : color, fontSize:12, fontWeight:'bold'}}>Profile</Text>
//       )             
//       }}
//       />
//     </Tab.Navigator>
//   );
// }