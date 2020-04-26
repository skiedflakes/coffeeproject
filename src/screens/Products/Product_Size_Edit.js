import React, { useState, useEffect } from 'react';
import { Button,Image,Dimensions,TextInput,Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView,Modal,TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';
const deviceWidth = Dimensions.get('window').deviceWidth;
const deviceHeight = Dimensions.get('window').deviceHeight;


export default function Product_Size_Edit ({navigation,route}) {
    //navigation route parameters
    const {name,size_price,id} = route.params; //product_category_id

    //input text parameters
    const [item_name, setName] = React.useState('');
    const [item_price, setPrice] = React.useState('');

    const add_item = () =>{
        
        const formData = new FormData();
        formData.append('id', id);

        if (!item_name) {
            formData.append('name', name);
        } else {
            formData.append('name', item_name);
        }

        if (!item_price) {
            formData.append('price', size_price);
        } else {
            formData.append('price', item_price);
        }

        fetch(global.global_url+'product_settings/update_product_size.php', {
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
                navigation.goBack(null);
                //navigation.navigate("Size Add",{name,id});
                //Alert.alert('Successfully update !');
            } else if(save_response_data.status == 'failed'){
                Alert.alert('failed !');
            }
            
            }).catch((error) => {
            console.error(error);
        });
    }

    function dialogBox(){
        Alert.alert(
          'UPDATE',
          'Are you sure you want to update ?',
          [
            {text: 'OK', onPress: () => add_item()},
            {text: 'NO', onPress: () => console.log('NO Pressed'), 
            style: 'cancel'},
          ],
          { cancelable: false }
        );
    }

    return (
    <View style={styles.header} >
        <ScrollView showsVerticalScrollIndicator={false}>
            
            <View>
            <Text>Update size details </Text>
            <TextInput 
                    style={{margin:10,borderColor: 'gray',borderWidth: 0.5,borderRadius:10,paddingLeft:20}}
                    placeholder={name}
                    onChangeText={text => setName(text)}
                    underlineColorAndroid='#FFF'
            />

            <TextInput 
                    style={{borderColor: 'gray',borderWidth: 0.5,borderRadius:10,margin:10,paddingLeft:20}}
                    placeholder={size_price}
                    onChangeText={text => setPrice(text)}
                    underlineColorAndroid='#FFF'
            />
            </View>
            
            <Button title="Update" onPress={() => { dialogBox() }}></Button>
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

