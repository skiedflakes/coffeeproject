import * as React from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class ProductsScreen extends React.Component{
render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Products Screen</Text>

      </View>
    );
}}