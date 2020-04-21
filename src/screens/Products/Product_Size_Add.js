import React, { useState, useEffect } from 'react';
import { Button,Image,Dimensions,TextInput, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView,Modal,TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';
const deviceWidth = Dimensions.get('window').deviceWidth;
const deviceHeight = Dimensions.get('window').deviceHeight;

function MultiLineInput(props) {
    return (
      <TextInput
      style={{borderColor: 'gray',borderWidth: 0.5,borderRadius:10,margin:10,paddingLeft:20}}
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        placeholder="Descrption"
        maxLength={40}
      />
    );
  }

export default function Product_Size_Add ({navigation,route}) {
    //navigation route parameters
    const {name,id} = route.params; //product_category_id

    //input text parameters
    const [item_name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');

    const add_item = () =>{
        if(!item_name||!price){
            Alert.alert('Please enter name');
          } else {
            const formData = new FormData();
            formData.append('product_category_id', id);
            formData.append('item_name', item_name);
            formData.append('item_price', price);

            fetch(global.global_url+'product_settings/add_product_size.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
              },
              body: formData
      
            }).then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                var save_response_data = responseJson.save_response[0];
                
                if(save_response_data.status == 'success'){
                    //navigation.navigate("Size Add",{name,id});
                    Alert.alert('Success !');
                } else if(save_response_data.status == 'failed'){
                    Alert.alert('failed !');
                } else {
                    Alert.alert('Duplicate size name !');
                }
      
              }).catch((error) => {
                console.error(error);
              });
            }
      }

    return (
    <View style={styles.header} >
        <ScrollView showsVerticalScrollIndicator={false}>

            <View>
            <TextInput 
                    style={{margin:10,borderColor: 'gray',borderWidth: 0.5,borderRadius:10,paddingLeft:20}}
                     placeholder="Size"
                    onChangeText={text => setName(text)}
                    underlineColorAndroid='#FFF'
            />

            <TextInput 
                    style={{borderColor: 'gray',borderWidth: 0.5,borderRadius:10,margin:10,paddingLeft:20}}
                     placeholder="Price"
                    onChangeText={text => setPrice(text)}
                    underlineColorAndroid='#FFF'
            />
            </View>
            
            <Button title="Save" onPress={() => { add_item() }}></Button>
      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
    main:{
        height:deviceHeight,
        width:deviceWidth,
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        flex:6,
      alignContent:"center",
        flexDirection:'column'
    },

    header:{
        backgroundColor:"#ffff",
        alignItems: 'stretch',
        flexDirection:'column',
        padding:20,
        flex:1,
        alignContent:"center",
    },})

