import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  Alert,
  Button,
  Picker
} from "react-native";

export default function Payment_methods ({navigation,route}) {
const {TotalCartPrice,Draglatitude,Draglongitude,distance,duration} = route.params;
const [selectedValue, setSelectedValue] = useState("Payment Type");
const selectedPayment = (itemValue) =>{
  setSelectedValue(itemValue)
  if(itemValue=="GCASH"){
    navigation.navigate("GcashScreen");
  }else if(itemValue=="Google Pay"){
    navigation.navigate("GooglepayScreen");
  }
}

return (
  <View style={styles.container}>

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

      <Button onPress={() => navigation.navigate("Place Order",{TotalCartPrice,Draglatitude,Draglongitude,distance,duration})} title="Confirm"></Button>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#34a853',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginVertical: 8,
  },
  direct: {
    backgroundColor: '#db7d35',
  },
  stripe: {
    backgroundColor: '#556cd6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
})