import React, { useState, useRef,useEffect } from 'react';
import {Button,BackHandler,SafeAreaView, FlatList, Text, View,Alert,StyleSheet,TouchableOpacity,SectionList,TextInput,CheckBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';


import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 
import { call, set, min } from 'react-native-reanimated';

export default function Content_details ({navigation,route}) {
  const {product_name,price,product_id,product_category_id,data_details,data_header} = route.params;
  var [current_price,setprice] = useState(price);
  var [current_qty,setqty] = useState(1);
  var [current_additional,setcurrent_additional] = useState(0);


  
  const setItemStorage = async (key,value) => {
 

    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  };


  const add_to_cart = () =>{
    var d = new Date();
    var n = d.getTime();
    setItemStorage(n.toString(),{'id':n.toString(),'selected_additions':0,'add_to_cart':1,'product_id':product_id,'product_name': product_name,'qty':current_qty,'price':current_price})
    getContent(navigation,product_name,product_category_id);
  }

  const update_total_price = (minus_plus) =>{
    var qty = current_qty;

    if(minus_plus=='plus'){
        qty = ++current_qty;
        var total = (+price * +current_qty)+ +current_additional;
        setprice(total);
    }else if(minus_plus=='minus'){
      if(current_qty>1){
        qty = --current_qty;
        var total = (+price * +current_qty)+ +current_additional;
        setprice(total);
      }else{
      }
    }else{
      setcurrent_additional(minus_plus);
        setprice((+price* +1)+ +minus_plus);
    }
    setqty(qty);
  }

  const callback = () =>{
    try{


      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          const newData = stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            var jsonPars = JSON.parse(store[i][1]);
            if(jsonPars.selected_additions==1){
              return JSON.parse(store[i][1]);
            }else{
              return null;
            }

          });

          try{

            var filtered_newData = newData.filter(e => e != null);
            var total = filtered_newData.map(item => item.price).reduce((prev, next) => +prev + +next);
            update_total_price(total);
            console.log(total);
          
          }catch(error){}
        });


      });

    }catch(error){}
  }

  return (

    <SafeAreaView style={styles.container}>
      <View style={{flex:5}}>
    <FlatList
       showsHorizontalScrollIndicator={false}
       showsVerticalScrollIndicator={false}
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
    </View>
    <View style={{flex:1}}>
      <View style={{flex:6,alignContent:"center"}}>

        <View style={{flex:3,flexDirection:"row",alignItems:"center",paddingVertical:10}}>
          <View style={{flex:2.5,flexDirection:"row-reverse",alignContent:"center",alignItems:"center",alignSelf:"center"}}>
            <Button title="+" onPress={() => update_total_price('plus')}></Button>
          <Text style={{textAlign:"center",marginHorizontal:10}}>{current_qty}</Text>
            <Button title="-" onPress={() => update_total_price('minus')}></Button>
          </View>
          <View style={{flex:1.5,flexDirection:"row-reverse",marginLeft:20}}>
          <Text style={{fontSize:18}}>P {current_price}</Text>
          </View>
        </View>

        <View style={{flex:3,alignItems:"center"}}>
          <Button title="add to cart" onPress={()=>add_to_cart()}></Button>
        </View>
      </View>

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
          setItemStorage(item.header_id,{'selected_additions':1,'details_id': item.details_id,'price': item.price,})
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
  <Text style={styles.header_item}>{header_name}</Text>
    <FlatList
       showsHorizontalScrollIndicator={false}
       showsVerticalScrollIndicator={false}
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
        styles.item,{marginHorizontal:15}
      ]}
    >
      <View style={{flex:6,flexDirection:"row",alignContent:"center",alignItems:"center"}}>
        <View style = {{flex:3}}>
          <CircleCheckBox
            checked={selected ? true :false}
            onToggle={() => onSelect(details_id)}
            labelPosition={LABEL_POSITION.RIGHT}
            label={details_name}
          />
        </View>
        <View style = {{flex:3,flexDirection:"row-reverse"}}>
          <View>
          <Text style={styles.title}>+ {price}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  }else{
    return null;
  }
}


//php get data

function getContent(navigation,title,product_category_id){
  const formData = new FormData();
  formData.append('product_category_id',product_category_id);
  
  
  fetch(global.global_url+'menu/get_menu_details.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: formData
  }).then((response) => response.json())
        .then((responseJson) => {
          var data = responseJson.product_details.map(function(item) {
            return {
              product_id: item.product_id,
              product_name: item.product_name,
              price: item.price,
              image_url: item.image_url
            };
          });
          navigation.navigate("Content",{title,content_data:data,product_category_id});
        }).catch((error) => {
          console.error(error);
        });
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 6,
    margin:10,

  },

    
  header_item: {
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize:20
  },
  
  item: {
    padding: 10,
  },

  title: {
    flex:3,
    fontSize: 15,
  },

  title2: {
    fontSize: 25,
  },
});
