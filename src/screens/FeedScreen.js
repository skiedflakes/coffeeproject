import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Alert
} from "react-native";


export default function Content_details () {
  const [listData, setListData] = useState('');

  return(
    <SafeAreaView style={styles.container}>
   
  </SafeAreaView>
  )
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
    fontSize: 32,
  },
});
