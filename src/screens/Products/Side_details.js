import React, { useState, useEffect } from 'react';
import { TextInput,Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView,Modal,TouchableHighlight } from 'react-native';
import { ActivityIndicator } from 'react-native';

//etc
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
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

export default function Side_details ({navigation,route}) {

    const [spinner, setSpinner] = React.useState(false);
    const [spinnerMSG, setSpinnerMSG] = React.useState("Loading");

    //route params
    const {name,id} = route.params;

    //constants of flatlist data
    const [current_list_data, setcurrent_list_data] = useState('');

    //constants of modal 
    const [modalVisible, setModalVisible] = useState(false);
    const [M_name, setM_name] = useState(false);
    const [M_price, setM_price] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
        setSpinner(true)
        setSpinnerMSG("Loading")
        const formData = new FormData();
        formData.append('dropdown_header_id', id);
        fetch(global.global_url+'product_settings/get_side_details.php', {
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
                var data = responseJson.side_details.map(function(item,index) {
                    return {
                    key:item.dropdown_details_id,
                    name: item.name,
                    price: item.price
                    };
                    });

                    setcurrent_list_data(data);

                    setSpinner(false)
  
          }).catch((error) => {
            console.error(error);
            setSpinner(false)
          });

      return () => {
      };
    }, [])
  );

  const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible} transparent={true}>
      <View style={{ alignItems: 'center', justifyContent: 'center',flex: 1 }}>
        <View style={{ borderRadius: 10, backgroundColor: '#f0f0f0', padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '200' }}>{spinnerMSG}</Text>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );

function dialogBox_add(){
    if(M_name == ""){ 
        Alert.alert('Please enter name');
    } else if (M_price == "") {
        Alert.alert('Please enter price');
    }
    else {
        Alert.alert(
          'SAVE',
          'Are you sure you want to save ?',
          [
            {text: 'OK', onPress: () => add_side_details()},
            {text: 'NO', onPress: () => console.log('NO Pressed'), 
            style: 'cancel'},
          ],
          { cancelable: false }
      );
    }
  }

  const add_side_details = () =>{
    setSpinner(true)
        setSpinnerMSG("Saving")
        const formData = new FormData();
        formData.append('name', M_name);
        formData.append('price', M_price);
        formData.append('dropdown_header_id', id);
        fetch(global.global_url+'product_settings/add_side_details.php', {
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
                var data = responseJson.side_details.map(function(item,index) {
                    return {
                    key:item.dropdown_details_id,
                    name: item.name,
                    price: item.price
                    };
                    });
                    console.log(data);
                    setcurrent_list_data(data);
                    setModalVisible(!modalVisible);
                    
            } else if(save_response_data.status == 'failed'){
              Alert.alert('failed !');
            } else {
              Alert.alert('Duplicate name !');
            }

            setSpinner(false)
  
          }).catch((error) => {
            console.error(error);
            setSpinner(false)
      });
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
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

const deleteRow = (rowMap, rowKey) => {
    setSpinner(true)
    setSpinnerMSG("Deleting")
    const formData = new FormData();
    formData.append('id', rowKey);
    fetch(global.global_url+'product_settings/delete_side_details.php', {
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

        setSpinner(false)

      }).catch((error) => {
        console.error(error);
        setSpinner(false)
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
            onPress={() => dialogBox(rowMap, data.item.key, data.item.name)}
        >
            <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
    </View>
);

const clear_modal_data = () =>{
    setM_name('');
    setM_price('');
}

return (
    <View style={styles.main}>
    <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            clear_modal_data();
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                    <View style={{flexDirection:"column",height: 220,width:250}}>
                    <TextInput 
                    
                    style={{paddingLeft:20,height:50,borderColor: 'gray',borderWidth: 0.5,borderRadius:10}}
                     placeholder="Add Details"
                    onChangeText={text => setM_name(text)}
                    underlineColorAndroid='#FFF'
                    ></TextInput>

                    <TextInput 
                    style={{paddingLeft:20,height:50,borderColor: 'gray',marginTop:10,borderWidth: 0.5,borderRadius:10}} 
                    placeholder="Price (e.g 5.50)"
                    onChangeText={text => setM_price(text)}
                    inputContainerStyle={{borderBottomWidth:0}}
                    keyboardType="numeric"
                    ></TextInput>

                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3",marginTop:15}}
                        onPress={() => {
                            dialogBox_add();
                        }}
                    >   
                    <Text style={styles.textStyle}>Add</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#787878",marginTop:15}}
                        onPress={() => {
                        setModalVisible(!modalVisible);
                        clear_modal_data();
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
            <TouchableOpacity onPress={() => {setModalVisible(true);}}>
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
              price={item.price} 
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
    {spinner && <CustomProgressBar />}
    </View>
  );
}

function RowItem ({navigation,title,price}) {
  return (
      <TouchableNativeFeedback>
          <View style={styles.item}>
            <View style={{flex:3,flexDirection:'row',alignItems:"center"}}>
                <Text style={styles.title}>{title} </Text>
            </View>
            <View  style={{alignSelf:'center'}}>
            <Text style={styles.title}>+ {price} </Text>
            </View>
   
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
