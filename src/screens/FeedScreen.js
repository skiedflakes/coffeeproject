import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Alert
} from "react-native";

import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

export default function Content_details () {
  const [listData, setListData] = useState('3');
  const BadgedIcon = withBadge(1)(Icon)

  
  return(
    <View style={styles.container}>
    <View style={styles.row}>
        <Icon type="ionicon" name="ios-notifications" size={50} color='blue' />
        <Badge
        value={listData}
      status="error"
      containerStyle={styles.badgeStyle}
    />
  </View>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    fontSize: 18
  },
  row: {
    flexDirection: 'row'
  },
  badgeStyle: { 
    position: 'absolute',
    top: -4,
    right: -4 
  }
});
