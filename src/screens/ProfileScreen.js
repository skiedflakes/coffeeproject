import * as React from 'react';
import { StyleSheet,Button, Text, View,TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MainProfileScreen from './Profile/Main';

const Stack = createStackNavigator();
export default class ProfileScreen extends React.Component {
    render() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainProfile"
        component={MainProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        />
    </Stack.Navigator>
  );
}}



const styles = StyleSheet.create({
  button1: {
    alignItems: 'center',
    backgroundColor: '#197CC8',
    borderWidth:1.5,
    borderRadius:2,
    borderColor:"#ffff",
    marginLeft:10
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderWidth:1.5,
    borderRadius:2,
    borderColor:"#197CC8",
    marginLeft:10
  },
  buttonText1: {
    textAlign: 'center',
    padding: 10,
    color: '#ffff'
    
  },

  buttonText2: {
    textAlign: 'center',
    padding: 10,
    color: '#197CC8'
  }
  
})
