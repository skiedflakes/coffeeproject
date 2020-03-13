import React, { useState, useEffect } from 'react';
import { Button, Text, View,Alert,StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
export default function FeedScreen () {

   const [test] = useState('test');

  return (
    <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center',flexDirection:"column"}}>
      <View style={{flexDirection:'row', padding:20}}>

        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <View style={{flexDirection:'column', padding:20,alignItems: 'center', justifyContent: 'center'}}>
            <Feather name="coffee" size={50} color={"#642A05"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
            <Text style={{fontSize: 19,fontWeight: 'bold',color:'#393939',textAlign:'center',marginLeft:10}}>Coffee</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
          <View style={{flexDirection:'column', padding:20,alignItems: 'center', justifyContent: 'center'}}>
            <MCI name="glass-flute" size={50} color={"#F69455"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
            <Text style={{fontSize: 19,fontWeight: 'bold',color:'#393939',textAlign:'center',marginLeft:10}}>Milk Tea</Text>
          </View>
        </TouchableOpacity>

      </View>


      <View style={{flexDirection:'row', padding:20}}>

        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <View style={{flexDirection:'column', padding:20,alignItems: 'center', justifyContent: 'center'}}>
            <MCI name="cup-water" size={50} color={"#24BFCC"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
            <Text style={{fontSize: 19,fontWeight: 'bold',color:'#393939',textAlign:'center',marginLeft:10}}>Beverages</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <View style={{flexDirection:'column', padding:20,alignItems: 'center', justifyContent: 'center'}}>
            <MCI name="food-fork-drink" size={50} color={"#454545"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
            <Text style={{fontSize: 19,fontWeight: 'bold',color:'#393939',textAlign:'center',marginLeft:10}}>Others</Text>
          </View>
        </TouchableOpacity>
      </View>
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
