import * as React from 'react';
import { Button, Text, View } from 'react-native';


export default class ProfileScreen extends React.Component {
    render() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>ProfileScreen</Text>
    <Button
      title="Go to Feed"
      onPress={() => this.props.navigation.navigate('Feed')}
    />
  </View>
  );
}}
