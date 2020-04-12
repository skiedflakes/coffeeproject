import React, { useState, useEffect } from 'react';
import { Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView,Modal,TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
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

  const add_side_header = () =>{
    if(!CurrentSideName){
        Alert.alert('Please enter name');
      } else {
        const formData = new FormData();
        formData.append('name', CurrentSideName);
        formData.append('product_category_id', id);
        fetch(global.global_url+'product_settings/add_side_header.php', {
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
                var data = responseJson.side_header.map(function(item,index) {
                    return {
                    key:item.dropdown_header_id,
                    name: item.name
                    };
                    });
                  
                    setModalVisible(!modalVisible);
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
            onPress={() => deleteRow(rowMap, data.item.key)}
        >
            <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() =>  {Alert.alert("Under Developement")}}
        >
            <Text style={styles.backTextWhite}>Edit</Text>
        </TouchableOpacity>

    </View>
);



    return (
    <View style={styles.main}>

    <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setCurrentSideName('');
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                    <View style={{flexDirection:"column",height: 150,width:200}}>
                    <TextInput style={{height:50,borderColor: 'gray', borderWidth: 0.5,borderRadius:10}} placeholder="Add Side"
                    onChangeText={text => setCurrentSideName(text)}
                    ></TextInput>

                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3",marginTop:15}}
                        onPress={() => {
                            add_side_header();
                        }}
                    >   
                    <Text style={styles.textStyle}>Add</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#787878",marginTop:15}}
                        onPress={() => {
                        setModalVisible(!modalVisible);
                        setCurrentSideName('');
                        }}
                    >   
                    <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableHighlight>
                    </View>
            </View>
            </View>
        </Modal>

    <View style={styles.header} >

    <TouchableOpacity style={{ flex:6,  flexDirection: 'row', padding:2,}} onPress={() => {
         navigation.navigate("Product Entry Add",{name,id});
        }}>
      <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>Add New Product</Text>
    </TouchableOpacity>
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
