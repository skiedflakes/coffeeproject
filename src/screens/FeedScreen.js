import * as React from 'react';
import { Button, Text, View } from 'react-native';


export default class FeedScreen extends React.Component {
    render() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Feed Screen</Text>
    <Button
      title="Go to feed"
      onPress={() => this.props.navigation.navigate('Feed')}
    />
  </View>
  );
}}
