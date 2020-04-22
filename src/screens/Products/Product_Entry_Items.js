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

export default function Product_Entry_Items ({navigation,route}) {
    const {name,id} = route.params;
    const [current_list_data, setcurrent_list_data] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [CurrentSideName, setCurrentSideName] = useState(false);

    const [allow_navigation, setallow_navigation] =useState(true);
  useFocusEffect(
    React.useCallback(() => {
        const formData = new FormData();
        formData.append('product_category_id', id);
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
                    name: item.product_name,
                    price: item.price,
                    product_details: item.product_details,
                    image_url: item.image_url
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

const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
    // console.log('row close' + !allow_navigation);
    // setallow_navigation(!allow_navigation);

};
const onRowDidOpen = rowKey => {
    // console.log('row open' + !allow_navigation);
    // setallow_navigation(!allow_navigation);
};

const deleteRow = (rowMap, rowKey) => {

    const formData = new FormData();
    formData.append('id', rowKey);
    fetch(global.global_url+'product_settings/delete_item.php', {
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

function dialogBox(rowMap, rowKey, name){
  Alert.alert(
    'DELETE',
    'Are you sure you want to delete '+name+' ?',
    [
      {text: 'OK', onPress: () => deleteRow(rowMap, rowKey)},
      {text: 'NO', onPress: () => console.log('NO Pressed'), 
      style: 'cancel'},
    ],
    { cancelable: false }
  );
}

const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight_add]}
            onPress={() => closeRow(rowMap, data.item.key)}
        >
            <Text style={styles.backTextWhite}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => dialogBox(rowMap, data.item.key, data.item.name)}
        >
            <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() =>  navigate_edit(navigation, data.item.name, data.item.key, data.item.product_details, data.item.price, data.item.image_url)}
        >
            <Text style={styles.backTextWhite}>Edit</Text>
        </TouchableOpacity>

    </View>
);

function navigate_edit(navigation,name,product_id,details,product_price,img_url){
  navigation.navigate("Product Entry Edit",{name,id,product_id,details,product_price,img_url});
}

return (
  <View style={styles.main}>
  <View style={styles.header} >
      <View style={{  flexDirection: 'row', padding:2,}} >
          <TouchableOpacity onPress={() => {
        navigation.navigate("Product Entry Add",{name,id});
      }}>
          <Entypo name="add-to-list" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
          </TouchableOpacity>
  
      </View>
      
      <View style={{ flex:6,  flexDirection: 'row', padding:2,}} >
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <AntDesign name="arrowleft" size={25} color={"#ffff"} style={{marginLeft:10}}/>
          </TouchableOpacity>
  <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>{name}</Text>
      </View>
      </View>
  <View style={styles.body}>
  <View style={{  flexDirection: 'row',alignContent:"center",alignItems:"center"}} >
      <SwipeListView
          data={current_list_data}
          renderItem={  ({ item }) => 
          <RowItem
            navigation={navigation}
            title={item.name}
            id={item.key}
            />
          }
          rightOpenValue={-225}
          previewOpenValue={-40}
          previewOpenDelay={0}
          renderHiddenItem={renderHiddenItem}
          keyExtractor={item => item.key.toString()}
          ItemSeparatorComponent = { FlatListItemSeparator }
          onRowDidOpen={onRowDidOpen}
      />
  </View> 
  </View>
  </View>
);
}




function RowItem ({navigation,title,id}) {

    
  return (
    //   <TouchableNativeFeedback onPress={() => navigate_side_details(navigation,title,id,allow_nav,true)}>
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

function navigate_side_details(navigation,name,id){
    navigation.navigate("Side Details",{name,id});
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
