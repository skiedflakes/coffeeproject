import React, { useState, useEffect } from 'react';
import { Button,Image,Dimensions,TextInput,Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView,Modal,TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ActivityIndicator } from 'react-native';
const deviceWidth = Dimensions.get('window').deviceWidth;
const deviceHeight = Dimensions.get('window').deviceHeight;


export default function Product_Size_Add ({navigation,route}) {
    //navigation route parameters
    const {name,id,category_id} = route.params; //product_category_id

    const [spinner, setSpinner] = React.useState(false);

    //input text parameters
    const [item_name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');

    const add_item = () =>{
        setSpinner(true)
        const formData = new FormData();
        formData.append('product_id', id);
        formData.append('category_id', category_id);
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
                navigation.goBack(null);
                //navigation.navigate("Size Add",{name,id,category_id});
                //Alert.alert('Success !');
            } else if(save_response_data.status == 'failed'){
                Alert.alert('failed !');
            } else {
                Alert.alert('Duplicate size name !');
            }

            setSpinner(false)

          }).catch((error) => {
            
            setSpinner(false)
            console.error(error);
          });
      }

      function dialogBox(){
        if(!item_name){
            Alert.alert('Please enter name');
        }
        else if(!price){
            Alert.alert('Please enter price');
        } 
        else {
          Alert.alert(
            'SAVE',
            'Are you sure you want to save ?',
            [
              {text: 'OK', onPress: () => add_item()},
              {text: 'NO', onPress: () => console.log('NO Pressed'), 
              style: 'cancel'},
            ],
            { cancelable: false }
          );
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
            
            <Button title="Save" onPress={() => { dialogBox() }}></Button>
      </ScrollView>
      {spinner && <CustomProgressBar />}
      {/* { spinner? <CustomProgressBar /> : <View><Text>Data loaded</Text></View>} */}
    </View>

  );
}

const CustomProgressBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible} transparent={true}>
    <View style={{ alignItems: 'center', justifyContent: 'center',flex: 1 }}>
      <View style={{ borderRadius: 10, backgroundColor: '#f0f0f0', padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);

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

