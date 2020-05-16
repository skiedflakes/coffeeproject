import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Picker,
  TouchableOpacity,
  Alert
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location';
import { useFocusEffect } from '@react-navigation/native';

export default function Payment_method ({navigation,route}) {
const {TotalCartPrice,Draglatitude,Draglongitude,distance,duration,BranchID,BranchName} = route.params;
const [selectedValue, setSelectedValue] = useState("Payment Type");
const [longitude, setlongitude] = useState('');
const [latitude, setlatitude] = useState('');

const [cart_data, setcart_data] = useState('');
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
          setcart_data(filtered_newData);
        }catch(error){}
      });
    });
    return () => {
    };
  }, [])
);

const selectedPayment = (itemValue) =>{
  setSelectedValue(itemValue)
  if(itemValue=="GCASH"){
    navigation.navigate("GcashScreen");
  }else if(itemValue=="Google Pay"){
    navigation.navigate("GooglepayScreen");
  }
}

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

  const remove_cart_items = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0];
            var jsonPars = JSON.parse(store[i][1]);
            if(jsonPars.add_to_cart==1){
              removeItems(key)
            }else{
            
            }
          
          });
        });
    });
  }

  //DELETE ITEM STORAGE
  const removeItems  = async (key) => {
    await AsyncStorage.removeItem(key);
  } 


const confirm = () =>{
  const formData = new FormData();
  formData.append('user_id', JSON.stringify(global.g_user_id));
  formData.append('cart_price', JSON.stringify(TotalCartPrice));
  formData.append('latitude', JSON.stringify(Draglatitude));
  formData.append('longitude', JSON.stringify(Draglongitude));
  formData.append('data', JSON.stringify(cart_data));
  formData.append('branch_id', JSON.stringify(BranchID));
  formData.append('duration', JSON.stringify(duration));

  fetch(global.global_url+'placeorder/insert_place_order2.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson=="success"){
        //clear async
        remove_cart_items();
        //navigate
        navigation.popToTop()
        navigation.navigate('User Transactions');
      }else{
        Alert.alert("failed");
      }
    }).catch((error) => {
      console.error(error);
    });
}

return(
  <SafeAreaView style={styles.container}>
    <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 250,alignItems:"center",alignItems:"center",alignSelf:"center"}}
        onValueChange={(itemValue, itemIndex) => selectedPayment(itemValue)}
      >
        <Picker.Item label="Payment Type" value="Payment Type" />
        <Picker.Item label="GCASH" value="GCASH" />
        <Picker.Item label="Google Pay" value="Google Pay" />
        <Picker.Item label="Apple Pay" value="Apple Pay" />
    </Picker>

    <Button onPress={() => confirm()} style={{}} title="Confirm"></Button>
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
