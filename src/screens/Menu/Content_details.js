import React, { useState, useRef,useEffect } from 'react';
import {BackHandler,SafeAreaView, FlatList, Text, View,Alert,StyleSheet,TouchableOpacity,SectionList,TextInput,CheckBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';


import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 
import { call } from 'react-native-reanimated';

export default function Content_details ({navigation,route}) {
  const {price,product_id,product_category_id,data_details,data_header} = route.params;
  var [current_price,setprice] = useState(price);
  var [selected_ids,setids] = useState([]]);

  const getItemStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }else{
        console.log('error read data');
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  
  const callback = () =>{
    try{
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          const newData = stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            return JSON.parse(store[i][1]);
          });
          var total = newData.map(item => item.price).reduce((prev, next) => +prev + +next);
          
          setprice(+total+ +current_price)
        });
      });
    }catch(error){}
  }


  return (

    <SafeAreaView style={styles.container}>
    <FlatList
      data={data_header}
      renderItem={({item}) => (
          <Details
          header_name = {item.header_name}
          header_id = {item.header_id}
          data_details = {data_details}
          callback ={callback}
          >
          </Details>
  
      )}
      keyExtractor={item => item.header_id}
    />
    <View>
      <Text>hello {current_price}</Text>
    </View>

  </SafeAreaView>
  
  );
}

function Details({header_name,data_details,header_id,callback}){
  const[data,setData] = useState(data_details);

  const setItemStorage = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  };

  const onSelect = useRef(id => {
    const newData = [
      ...data.map(item =>{

        if (id == item.details_id){
          setItemStorage(item.header_id,{'details_id': item.details_id,'price': item.price,})
          callback();
          return{
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      }),
    ];

    setData(newData);
  });

return(
  <View>
  <Text>{header_name}</Text>
    <FlatList
    data={data}
    renderItem={({ item }) => (
      <Item
     
      details_name = {item.details_name}
      details_id = {item.details_id}
      header_id = {header_id}
      item_header_id = {item.header_id}
      onSelect = {onSelect.current}
      selected = {item.selected}
      price = {item.price}
      />
    )}
    keyExtractor={item => item.details_id}
    extraData={item => item.selected}
  />
</View>
);
}


function Item({onSelect,selected,details_name,price,details_id,header_id,item_header_id}){
  if(item_header_id==header_id){
    return (
      <TouchableOpacity
      onPress={() => onSelect(details_id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
      ]}
    >
        <Text style={styles.title}>{details_name}{price}</Text>
      </TouchableOpacity>
    );
  }else{
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },

  title2: {
    fontSize: 25,
  },
});
