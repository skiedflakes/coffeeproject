import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class Input_Products extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
          }}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 50,
    width: 50,
  },
});