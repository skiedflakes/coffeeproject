import * as React from 'react';
import { StyleSheet,Button, Text, View,TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './Products/Main_Products';

//category
import CateogryScreen from './Products/Category';

//sides
import SetSidesScreen from './Products/Sides';
import SideHeaderScreen from './Products/Side_header';
import SideDetailsScreen from './Products/Side_details';

//product entry
import ProductSizeScreen from './Products/Product_Size';
import ProductSizeSizeScreen from './Products/Product_Size_Add';
import ProductSizeSelectScreen from './Products/Product_Size_Select';
import ProductEntryScreen from './Products/Product_Entry';
import ProductEntryItemsScreen from './Products/Product_Entry_Items';
import ProductEntryAddScreen from './Products/Product_Entry_add';

const Stack = createStackNavigator();
export default class ProfileScreen extends React.Component {
  render() {
  return (
    <Stack.Navigator>

        <Stack.Screen 
        options={{ headerShown: false }}
        name="Product Settings" 
        component={MainScreen} 
        />
        <Stack.Screen
        name="Category" 
        options={{ headerShown: false }}
        component={CateogryScreen} 
        />

        <Stack.Screen
        name="Sides" 
        component={SetSidesScreen} 
        />

        <Stack.Screen
        name="Side Header" 
        component={SideHeaderScreen} 
        options={{ headerShown: false }}
        />

        <Stack.Screen
        name="Side Details" 
        component={SideDetailsScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Product Entry" 
        component={ProductEntryScreen} 
        />

        <Stack.Screen
        name="Size" 
        component={ProductSizeScreen} 
        />
        <Stack.Screen
        name="Size Select" 
        component={ProductSizeSelectScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Size Add" 
        component={ProductSizeSizeScreen} 
        options={{ headerShown: false }}
        />

        <Stack.Screen
        name="Product Entry Items" 
        component={ProductEntryItemsScreen} 
        options={{ headerShown: false }}
        />

        <Stack.Screen
        name="Product Entry Add" 
        component={ProductEntryAddScreen} 
        options={({ route }) => ({ title: "Add new Item"})}
        />
    </Stack.Navigator>
  );
}}


