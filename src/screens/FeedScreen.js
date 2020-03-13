import React, { useState, useEffect } from 'react';
import { Button, Text, View,Alert,StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function FeedScreen () {

   const [test] = useState('test');

  return (
    <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center',flexDirection:"column"}}>
    <Text>{global.g_name}</Text>
    <Button title='test' onPress={()=>alert()}></Button>
    </View>
  );
}

function alert(){
  Alert.alert(global.g_name);
}


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
  },

  scrollViews: {
      backgroundColor: '#E5E7E7',
      alignItems:'center',
      borderBottomWidth:0.5,
      borderColor:"#474949",
      flex:6,
      flexDirection:"row",
      alignContent:"center"
    },

    scrollViews_1:{
      flex:2,
      flexDirection:"row", 
      alignItems:"center"},

    scrollViews_2: {
      flexDirection:"row",
      alignItems:"center",
      paddingRight:20
  },
  
  scrollText: {
      padding: 10,
      color: '#474949'
    },
  
    scrollIcon:{
        marginLeft:10,
    }
})
