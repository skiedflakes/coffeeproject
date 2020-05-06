import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

//import screens 
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductsScreen from '../screens/ProductScreen';
import OrderScreen from '../screens/OrderScreen';
import MenuScreen from '../screens/MenuScreen';

const Tab = createBottomTabNavigator();


export default class HomeScreenNavigator extends React.Component{


  constructor() {
    super();
    //Setting up global variable
    global.g_user_id = '';
    global.g_name = '';
    global.g_user_type_id = '';
    // google map key
    global.GOOGLE_MAPS_APIKEY = 'AIzaSyCwrEeL9t4q1kOmU4TEElsZf9nBEboe_JI';
    //online
    // global.global_url = 'http://projects.skiedflakes.site/cafeproject/';

    //local
    global.global_url = 'http://192.168.1.105/cafeproject/';
  }

    render(){

      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              let key = store[i][0];
              var jsonPars = JSON.parse(store[i][1]);
              if(jsonPars.user_details==1){
                global.g_user_id = jsonPars.user_id;
                global.g_name = jsonPars.name;
                global.g_user_type_id = jsonPars.user_type_id;
                
              }else{
               
              }
            
            });
          });

        });
          

        return(
            <Tab.Navigator>
            <Tab.Screen name="Feed" component={FeedScreen} options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            }} />

            <Tab.Screen name="Menu" component={MenuScreen} 
            options={{
              tabBarLabel: 'Menu',
              tabBarIcon: ({ color, size }) => (
                <Entypo name="grid" color={color} size={size} />
              ),
            }}/>
         
            <Tab.Screen name="Products" component={ProductsScreen} 
            options={{
              tabBarLabel: 'Products',
              tabBarIcon: ({ color, size }) => (
                <Icon name="coffee" color={color} size={size} />
              ),
            }}/>

          <Tab.Screen name="Orders" component={OrderScreen} 
            options={{
              tabBarLabel: 'Orders',
              tabBarIcon: ({ color, size }) => (
                <Icon name="list-ul" color={color} size={size} />
              ),
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} 
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Icon name="user-circle" color={color} size={size} />
              ),
            }}/>
            </Tab.Navigator>
        );
    }
}
