import React, { Component ,useState} from 'react';
import { View,Button,FlatList,Text,StyleSheet,TouchableOpacity} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function FeedScreen () {
 
  

  return (
    <View style={styles.body}>
 
      </View>
  );
}

function RowItem({id,product_name,qty}){
  return(
      <TouchableOpacity onPress={() => null}>
          <View style={styles.item}>
          
       
            <Text style={styles.title}>{product_name}</Text>
            
          </View>
      </TouchableOpacity>
  
  );

}

const styles = StyleSheet.create({
  main:{
      flex:6,
      backgroundColor: '#ffff',
      alignContent:"center",
      flexDirection:'column'
  },

  header:{
      flexDirection:'row-reverse',
      padding:2,
      flex:0.6,
      backgroundColor: '#3490DD',
      alignContent:"center",
  },
  body:{
      flex:5.4,
      backgroundColor: '#DADCDC',
      alignContent:"center",
      alignItems:"center",
      
  },
  container: {
      flex: 1,
      marginTop:5,
    },
    item: {
      flexDirection:'row',
      paddingLeft:10,
      backgroundColor:'#ffff',
      padding:5,
      alignContent:"center"
    },
    title: {
      color:'#4A4A4A',
      padding:10,
      fontSize: 18,
    },
})
