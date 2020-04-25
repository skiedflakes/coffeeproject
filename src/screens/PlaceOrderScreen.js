import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Picker
} from "react-native";


import GetLocation from 'react-native-get-location';


export default function PlaceOrderScreen ({navigation,route}) {
  var {TotalCartPrice} = route.params;
  const [selectedValue, setSelectedValue] = useState("Payment Type");
  const [longitude, setlongitude] = useState('');
  const [latitude, setlatitude] = useState('');

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
     
    <Text style={styles.item}>Store Location: ex. longitude,latitude</Text>
    <Text style={styles.item}>My Location: {longitude} {latitude}</Text>
    <Text style={styles.item}>Distance: </Text>
    <Text style={styles.item}>Charge: </Text>
  <Text style={styles.item}>Total Cart Price: {TotalCartPrice}</Text>
    <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 250,alignItems:"center",alignItems:"center",alignSelf:"center"}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Payment Type" value="Payment Type" />
        <Picker.Item label="Paymaya" value="Paymaya" />
        <Picker.Item label="GCASH" value="GCASH" />
      </Picker>
      
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
