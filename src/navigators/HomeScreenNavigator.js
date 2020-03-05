import * as React from 'react';

import { View, Text, TouchableOpacity,Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductsScreen from '../screens/ProductsScreen';

const Tab = createBottomTabNavigator();

export default class HomeScreenNavigator extends React.Component{
    render(){
        return(
            <Tab.Navigator>
            <Tab.Screen name="Feed" component={FeedScreen} options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ tintColor}) => (
            <Image source={require('../../assets/profile.png')}
            style= {{width:15, height:15, tintColor:'black'}}>
            </Image>
          ),
        }} />
            <Tab.Screen name="Profile" component={ProfileScreen} 
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ tintColor}) => (
                <Image source={require('../../assets/profile.png')}
                style= {{width:15, height:15, tintColor:'black'}}>
                </Image>
              ),
            }}/>
             <Tab.Screen name="Products" component={ProductsScreen} 
            options={{
              tabBarLabel: 'Products',
              tabBarIcon: ({ tintColor}) => (
                <Image source={require('../../assets/profile.png')}
                style= {{width:15, height:15, tintColor:'black'}}>
                </Image>
              ),
            }}/>
            </Tab.Navigator>
        );
    }
}
