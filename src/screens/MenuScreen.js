import * as React from 'react';
import { StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Menu/Main';

const Stack = createStackNavigator();
export default class MenuScreen extends React.Component {
    state = {
        dataSource: ''
      }
    componentDidMount(){
        this.getAllTags()
      }
    
  render() {
    //  console.log(this.state.dataSource)
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
        initialParams={{menu_list:this.state.dataSource}}
      />
    </Stack.Navigator>
  );
}

getAllTags(){
    fetch('http://192.168.1.105/cafeproject/tags_get_all.php')
    .then((response) => response.json())
          .then((responseJson) => {
            var data = responseJson.product_data.map(function(item) {
              return {
                product_category_id: item.product_category_id,
                product_type_name: item.product_type_name
              };
            });
           
            this.setState({
              dataSource: data
            })
          
          }).catch((error) => {
            console.error(error);
          });
    }

}



const styles = StyleSheet.create({
  
  
})


