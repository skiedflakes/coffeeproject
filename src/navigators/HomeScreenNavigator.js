import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductsScreen from '../screens/ProductsScreen';
import OrderScreen from '../screens/OrderScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();


export default class HomeScreenNavigator extends React.Component{
    render(){
        return(
            <Tab.Navigator>
            <Tab.Screen name="Feed" component={FeedScreen} options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} />
         
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
