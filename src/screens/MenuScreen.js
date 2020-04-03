import * as React from 'react';
import { StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './Menu/Main';
import ContentScreen from './Menu/Content';
import CartScreen from './CartScreen';
import Content_DetailsScreen from './Menu/Content_details';
import LoginScreen from './LoginScreen';
const Stack = createStackNavigator();
export default class MenuScreen extends React.Component {
    state = {
        dataSource: ''
      }

  render() {
    //  console.log(this.state.dataSource)
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
        initialParams={{menu_list:this.state.dataSource}}
 
      />

      <Stack.Screen
        name="Content"
        component={ContentScreen}
        options={{ title: 'My home' }}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'My Cart' }}
      />

<Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        />
      <Stack.Screen
        name="Content Details"
        component={Content_DetailsScreen}
      />
    </Stack.Navigator>
  );
}

}



