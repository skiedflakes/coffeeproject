import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  Alert,
  Button
} from "react-native";


export default function Payment_methods ({navigation,route}) {
const {TotalCartPrice,Draglatitude,Draglongitude,distance,duration} = route.params;
return (
  <View style={styles.container}>
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