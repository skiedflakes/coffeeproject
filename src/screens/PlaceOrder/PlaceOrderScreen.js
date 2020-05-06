import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Picker,
  TouchableOpacity
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location';
import { useFocusEffect } from '@react-navigation/native';

export default function PlaceOrderScreen ({navigation,route}) {
const {TotalCartPrice,Draglatitude,Draglongitude,distance,duration} = route.params;
const [selectedValue, setSelectedValue] = useState("Payment Type");
const [longitude, setlongitude] = useState('');
const [latitude, setlatitude] = useState('');
useFocusEffect(
  React.useCallback(() => {
   //remove selected items
   AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      const newData= stores.map((result, i, store) => {
          let key = store[i][0];
          var jsonPars = JSON.parse(store[i][1]);
          if(jsonPars.add_to_cart==1){
            // setItemStorage(n.toString(),{'id':n.toString(),'selected_additions':0,'add_to_cart':1,'product_id':product_id,'product_name': product_name,'qty':current_qty,'price':current_price})
              return jsonPars;
          }else{
           
          }
        
        });
        try{
          var filtered_newData = newData.filter(e => e != null);
          var final_total = filtered_newData.map(item => item.price).reduce((prev, next) => +prev + +next);

          console.log(filtered_newData);
          // setTotalCartPrice(final_total);
          // var counter =-1;
          //   var data = filtered_newData.map(function(item2) {
          //   var data_title = filtered_newData.map(function(item) {
            
          //     if(item2.id==item.id){
          //       ++counter;
          //       return {
          //         section:counter,
          //         id: item.id,
          //         product_name: item.product_name,
          //         price: item.price,
          //         base_price:item.base_price,
          //         add_on_price:item.add_on_price,
          //         qty:item.qty
          //       };
          //     }else{return null}
          //   });
          //   var f_data_title = data_title.filter(e => e != null);

          //   return {
          //     id: item2.id,
          //     product_id: item2.product_id,
          //     product_name: item2.product_name,
          //     qty:item2.qty,
          //     price:item2.price,
          //     data_title:f_data_title,
          //     data:item2.data,
          //   };
          // });

        }catch(error){}
       
      });
    });
    return () => {
    };
  }, [])
);


GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
})
.then(location => {
    setlongitude(location.longitude);
    setlatitude(location.latitude);
})
.catch(error => {
    const { code, message } = error;
    console.warn(code, message);
})

return(
  <SafeAreaView style={styles.container}>
    <Text style={styles.item}>Estimated Time arrival:{duration} minutes</Text>
    <Text style={styles.item}>Delivery Fee: </Text>
    <Text style={styles.item}>Cart: {TotalCartPrice}</Text>
    <Text style={styles.item}>Total: {TotalCartPrice}</Text>
    <Button style={{}} title="Confirm"></Button>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
