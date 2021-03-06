import React, { useState, useEffect } from 'react';
import { Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView,Modal,TouchableHighlight } from 'react-native';

//etc
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


//icons
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

export default function Product_Size_Select ({navigation,route}) {
    const {name,category_id} = route.params;
    const [current_list_data, setcurrent_list_data] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [CurrentSideName, setCurrentSideName] = useState(false);

    const [allow_navigation, setallow_navigation] =useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const formData = new FormData();
            formData.append('product_category_id', category_id);
            fetch(global.global_url+'product_settings/get_product_entry_items.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
    
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                    //get current data
                    var data = responseJson.item_details.map(function(item,index) {
                        return {
                        key:item.product_id,
                        name: item.product_name
                        };
                        });
                        
                        setcurrent_list_data(data);
    
            }).catch((error) => {
                console.error(error);
            });

        return () => {
        };
        }, [])
    );

    return (
        <View style={styles.main}>
        <View style={styles.header} >
            
        <View style={{ flex:6,  flexDirection: 'row', padding:2,}} >
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <AntDesign name="arrowleft" size={25} color={"#ffff"} style={{marginLeft:10}}/>
            </TouchableOpacity>
            <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>{name}</Text>
        </View>
        
        </View>
        <View style={styles.body}>
        <View style={{  flexDirection: 'row',alignContent:"center",alignItems:"center"}} >
            <FlatList
                data={current_list_data}
                renderItem={  ({ item }) => 
                <RowItem
                navigation={navigation}
                title={item.name}
                id={item.key}
                category_id={category_id}
                />
                }
                keyExtractor={item => item.key.toString()}
                ItemSeparatorComponent = { FlatListItemSeparator }
            />
        </View> 
        </View>
        </View>
    );
}

function RowItem ({navigation,title,id,category_id}) {
  return (
       <TouchableNativeFeedback onPress={() => navigate_side_details(navigation,title,id,category_id)}>
          <View style={styles.item}>
            <View style={{flex:3,flexDirection:'row',alignItems:"center"}}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <MaterialIcons style={{alignSelf:'center'}} name="keyboard-arrow-right" size={25} color={"#393737"}/>
          </View>
      </TouchableNativeFeedback>
  );
}

function navigate_side_details(navigation,name,id,category_id){
    navigation.navigate("Size Add List",{name,id,category_id});
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
        backgroundColor: 'red',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'blue',
        right: 0,
    },
    backRightBtnRight_add: {
        backgroundColor: 'gray',
        right: 150,
    },
})
