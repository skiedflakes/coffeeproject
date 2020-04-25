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

export default function Product_Entry_add ({navigation,route}) {
    //navigation route parameters
    const {name,id} = route.params; //product_category_id

    //image
    const [image_preview,Setimage_preview] = useState(false);
    const [imageUri,SetimageUri] = useState('');
    const [image_file_type,Setimage_file_type] = useState('');

    //input text parameters
    const [item_name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');

    const add_item = () =>{
        if(!item_name){
            Alert.alert('Please enter name');
        } else if(!imageUri){
            Alert.alert('Please select image');
        }
        else {
          const formData = new FormData();
          formData.append('product_category_id', id);
          formData.append('item_name', item_name);
          formData.append('item_desc', desc);
          formData.append('image', {
              uri: imageUri,
              name: 'my_photo',
              type: image_file_type
            });
          fetch(global.global_url+'product_settings/add_item.php', {
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
              } else {
                  Alert.alert('Duplicate name !');
              }
    
            }).catch((error) => {
              console.error(error);
            });
          }

      }



    function renderImage(){
        if(image_preview==false){
            return (
                <Image 
                style={{height:200,width:200,alignItems:"center",alignContent:"center"}}
                source={
                require('../../../assets/add_image.png')
                } />
            );
        }else{
            return (
                <Image 
                style={{height:200,width:200,alignItems:"center",alignContent:"center"}}
                source={{ uri: imageUri }}
                 />
            );
        }
       
    }

    const open_file = () =>{
        let options = {
            title: 'Select Image as',
            // customButtons: [
            //   { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            // ],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          
        ImagePicker.launchImageLibrary(options, (response) => {
            // Same code as in above section!

            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
              } else {
                Setimage_file_type(response.type);
                SetimageUri(response.uri);
                Setimage_preview(true);
              }
          });
    }

    return (

    <View style={styles.header} >
        <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
                 onPress={() => { open_file(); }}
                style={{alignItems:"center",marginBottom:10}}
                >
                { renderImage()}
            </TouchableOpacity>

            <TextInput 
                    style={{margin:10,borderColor: 'gray',borderWidth: 0.5,borderRadius:10,paddingLeft:20}}
                     placeholder="Name"
                    onChangeText={text => setName(text)}
                    underlineColorAndroid='#FFF'
            />
                  <MultiLineInput
                        multiline
                        numberOfLines={3}
                        onChangeText={text => setDesc(text)}
                    />
            
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
        flex:6,
        alignContent:"center",
  
    },})

