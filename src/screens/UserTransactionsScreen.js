import * as React from 'react';
import { StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './User_Transactions/MainUserTransactions';
import ViewDetailsScreen from './User_Transactions/View_Details';
const Stack = createStackNavigator();
export default class OrdersScreen extends React.Component {
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
      />


      <Stack.Screen
        name="View Details"
        component={ViewDetailsScreen}
      />

    </Stack.Navigator>
  );
}

}



