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

export default function Product_Entry_Edit ({navigation,route}) {
    //navigation route parameters
    const {name,id,product_id,details,product_price,img_url} = route.params; //product_category_id

    //image
    const [image_preview,Setimage_preview] = useState(false);
    const [imageUri,SetimageUri] = useState('');
    const [image_file_type,Setimage_file_type] = useState('');

    //input text parameters
    const [item_name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');

    const add_item = () =>{
        const formData = new FormData();
        formData.append('product_id', product_id);

        if (!item_name) {
            formData.append('product_name', name);
        } else {
            formData.append('product_name', item_name);
        }

        if (!desc) {
            formData.append('product_details', details);
        } else {
            formData.append('product_details', desc);
        }

        fetch(global.global_url+'product_settings/update_product_item.php', {
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
                navigation.navigate("Product Entry Items",{name,id});
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

    function renderImage(){
        return (
            <Image 
            style={{height:200,width:200}}
            source={{ uri: global.global_url+img_url }}
             />
        );
    }

    return (

    <View style={styles.header} >
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{alignItems:"center"}}>
            { renderImage()}
            </View>

            <TextInput 
                    style={{margin:10,borderColor: 'gray',borderWidth: 0.5,borderRadius:10,paddingLeft:20}}
                     placeholder={name}
                    onChangeText={text => setName(text)}
                    underlineColorAndroid='#FFF'
            />
            <TextInput 
                    style={{margin:10,borderColor: 'gray',borderWidth: 0.5,borderRadius:10,paddingLeft:20}}
                    placeholder={details}
                    onChangeText={text => setDesc(text)}
                    underlineColorAndroid='#FFF'
                    multiline={true}
                    numberOfLines={3}
            />
            
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
        flex:6,
        alignContent:"center",
  
    },})

    