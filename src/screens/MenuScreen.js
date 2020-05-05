import * as React from 'react';
import { StyleSheet,Image,View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './Menu/Main';
import ContentScreen from './Menu/Content';
import CartScreen from './CartScreen';

import Content_DetailsScreen from './Menu/Content_details';
import LoginScreen from './LoginScreen';

//PlaceOrder
import PlaceOrderScreen from './PlaceOrder/PlaceOrderScreen';
import LocationPicker from './PlaceOrder/Location_Picker';
import Payment_methods from './PlaceOrder/Payment_methods';

//payments 
import GCashScreen from './Payments/Ayden/GCashScreen';
import GooglepayScreen from './Payments/GooglePay/GooglepayScreen';
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
        options={{ headerShown: false }}
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

{/* PLACEORDER */}
      <Stack.Screen
        name="Place Order"
        component={PlaceOrderScreen}
      />

      <Stack.Screen
        name="Location Picker"
        component={LocationPicker}
      />

      <Stack.Screen
        name="Payment Methods"
        component={Payment_methods}
      />
{/* PLACEORDER END*/}



{/* Payment methods */}
      <Stack.Screen 
        name="GcashScreen" 
        component={GCashScreen} 
      />

      <Stack.Screen 
        name="GooglepayScreen" 
        component={GooglepayScreen} 
      />
{/* Payment methods end */}

    </Stack.Navigator>
  );
}

}



