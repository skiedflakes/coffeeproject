import * as React from 'react';
import { Button, Text, View } from 'react-native';

export default class ProductsScreen extends React.Component{
render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Products Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('ProductsScreen')}
        />
      </View>
    );
}}