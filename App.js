import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/navigators/HomeScreenNavigator';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="Login" component={LoginScreen}options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
