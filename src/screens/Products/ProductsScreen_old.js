import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Tags from './Products/Tags.js';
import Input_Products from './Products/Input_Products.js';

export default class ProductsScreen extends React.Component{

  constructor(props) {
    super(props);
    this.state = { 
      val: 1
     };
  }

  renderElement() {
    //You can add N number of Views here in if-else condition
    if (this.state.val === 1) {
      return <Tags />;
    } else if (this.state.val === 2) {
      return <Input_Products />;
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: 'row' }}>
          {/*Tags*/}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ val: 1 } )}>
            <Text style={{ color: '#ffffff' }}>Tags</Text>
          </TouchableOpacity>
          {/*Input Product*/}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ val: 2 })}>
            <Text style={{ color: '#ffffff' }}>Input Products</Text>
          </TouchableOpacity>
        </View>
          {this.renderElement()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    margin: 3,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#808080',
    padding: 10,
    margin: 2,
  },
  button2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffff',
    padding: 10,
    margin: 2,
  }
});