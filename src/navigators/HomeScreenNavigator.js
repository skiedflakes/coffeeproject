import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

//import screens 
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductsScreen from '../screens/ProductsScreen';
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
    global.global_url = 'http://projects.skiedflakes.site/cafeproject/';

  }

    render(){
          //get session
          const getMultiple = async () => {
              let values
              try {
                  values = await AsyncStorage.multiGet(['user_id', 'name','user_type_id'])
                  const user_id = values[0][1];
                  const name = values[1][1];
                  const user_type_id = values[2][1];
                  global.g_user_id = user_id;
                  global.g_name = name;
                  global.g_user_type_id = user_type_id;
              } catch(e) {
              }
          }
          getMultiple();

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
