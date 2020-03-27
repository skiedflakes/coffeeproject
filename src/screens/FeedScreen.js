import React, { useState, useEffect } from 'react';
import { Button, Text, View,Alert,StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
export default function FeedScreen () {

   const [test] = useState('test');

  return (
    <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center',flexDirection:"column"}}>
      <Text>test</Text>
    </View>
  );
}
