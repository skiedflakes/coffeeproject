import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default class  LoginScreen extends React.Component{
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
              title="Go to Details... again"
              onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
        );
    }
}
