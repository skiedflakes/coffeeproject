import React, { useState, useEffect } from 'react';
import HomeScreenNavigator from '../navigators/HomeScreenNavigator';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends React.Component {
    render() {
  return (
    <HomeScreenNavigator></HomeScreenNavigator>
  );
}}
