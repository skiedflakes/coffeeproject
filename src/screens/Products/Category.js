import React, { useState, useEffect } from 'react';
import { TextInput,Image,Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView,Modal,TouchableHighlight } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

//icon 
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';


const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  var swipeoutBtns = [
    {
      text: 'Delete'
    }
  ]
 

export default function Category ({navigation}) {


  const [modalVisible, setModalVisible] = useState(false);
  const [Category_name, setCategory_name] = useState('');
  const [current_list_data, setcurrent_list_data] = useState('');

  //image constants
  const [image_preview,Setimage_preview] = useState(false);
  const [imageUri,SetimageUri] = useState('');
  const [image_file_type,Setimage_file_type] = useState('');
  useFocusEffect(
    React.useCallback(() => {
        fetch(global.global_url+'product_settings/get_tags_dropdrown.php')
        .then((response) => response.json())
        .then((responseJson) => {
          var data = responseJson.array_tags.map(function(item,index) {
            return {
            key:item.product_category_id,
            product_type_name: item.product_type_name
            };
            });
            setcurrent_list_data(data)
    
        }).catch((error) => {
          console.error(error);
          Alert.alert('Connection Error');
        });

      return () => {
      };
    }, [])
  );
 
    const add_tag = () =>{
        console.log(imageUri);
        if(!Category_name){
            Alert.alert('Please enter name');
          } else {
            const formData = new FormData();
            formData.append('product_type_name', Category_name);
            formData.append('image', {
                uri: imageUri,
                name: 'my_photo',
                type: image_file_type
              });
            fetch(global.global_url+'product_settings/add_category.php', {
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

                    //get current data
                    var data = responseJson.array_tags.map(function(item,index) {
                        return {
                        key:item.product_category_id,
                        product_type_name: item.product_type_name
                        };
                        });
                      
                        setModalVisible(!modalVisible);
                        clear_modal();
                        setcurrent_list_data(data);

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

      const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {

        const formData = new FormData();
        formData.append('product_category_id', rowKey);
        fetch(global.global_url+'product_settings/delete_category.php', {
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
                closeRow(rowMap, rowKey);
                const newData = [...current_list_data];
                const prevIndex = current_list_data.findIndex(item => item.key === rowKey);
                newData.splice(prevIndex, 1);
                setcurrent_list_data(newData);

            } else if(save_response_data.status == 'failed'){
              Alert.alert('failed !');
            }
          }).catch((error) => {
            console.error(error);
          });
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

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

    const clear_modal = () =>{
        setCategory_name('');
        Setimage_file_type('');
        SetimageUri('');
        Setimage_preview(false);
    }

    return (

        <View style={styles.main}>
                    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          clear_modal()
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <View style={{flexDirection:"column",height: 360,width:250}}>
                <TouchableOpacity
                 onPress={() => {
                    open_file();
                }}
                style={{alignItems:"center",marginBottom:10}}
                >
                { renderImage()}
                </TouchableOpacity>

                <TextInput style={{paddingLeft:20,height:50,borderColor: 'gray', borderWidth: 0.5,borderRadius:10,marginTop:10}} placeholder="Category Name"
                onChangeText={text => setCategory_name(text)}
                ></TextInput>

                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3",marginTop:10}}
                    onPress={() => {
                        add_tag();
                    }}
                >   
                <Text style={styles.textStyle}>Save Category</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#787878",marginTop:10}}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                        clear_modal();
                        
                    }}
                >   
                <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
                </View>
          </View>
        </View>
      </Modal>

        <View style={styles.header} >
        <View style={{  flexDirection: 'row', padding:2,}} >
            <TouchableOpacity onPress={() => {
            setModalVisible(true);
            }}>
            <Entypo name="add-to-list" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
            </TouchableOpacity>
    
        </View>
        
        <View style={{ flex:6,  flexDirection: 'row', padding:2,}} >
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <AntDesign name="arrowleft" size={25} color={"#ffff"} style={{marginLeft:10}}/>
            </TouchableOpacity>
            <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>Category</Text>
        </View>
        </View>
        <View style={styles.body}>
            <View style={{  flexDirection: 'row',alignContent:"center",alignItems:"center"}} >

                <SwipeListView
                    data={current_list_data}
                    renderItem={  ({ item }) => 
                    <RowItem
                    navigation={navigation}
                    title={item.product_type_name} 
                    />
                    }
                    rightOpenValue={-150}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    renderHiddenItem={renderHiddenItem}
                    keyExtractor={item => item.key.toString()}
                    ItemSeparatorComponent = { FlatListItemSeparator }
                />
            </View> 
        </View>
        </View>
  );
}


function RowItem ({navigation,title}) {
  return (
      <TouchableNativeFeedback>
          <View style={styles.item}>
            <View style={{flex:3,flexDirection:'row',alignItems:"center"}}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <MaterialIcons style={{alignSelf:'center'}} name="keyboard-arrow-right" size={25} color={"#393737"}/>
          </View>

          
      </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
    main:{
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        flex:6,
        backgroundColor: '#ffff',
        alignContent:"center",
        flexDirection:'column'
    },

    header:{
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        flexDirection:'row-reverse',
        padding:2,
        flex:0.6,
        backgroundColor: '#3490DD',
        alignContent:"center",
    },
    body:{
        flex:5.4,
        backgroundColor: '#DADCDC',
        alignContent:"center",
        alignItems:"center",
        
    },
    container: {
        flex: 1,
        marginTop:5,
      },
      item: {
        flexDirection:'row',
        paddingLeft:10,
        backgroundColor:'#ffff',
        padding:5,
        alignContent:"center",
        alignItems:"center"
      },
      title: {
        color:'#4A4A4A',
        padding:15,
        fontSize: 20,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 10,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        height:10
      },


      //for swipe out 
      container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
})
