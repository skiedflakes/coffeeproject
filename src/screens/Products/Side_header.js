import React, { useState, useEffect } from 'react';
import { TextInput,Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView,Modal,TouchableHighlight } from 'react-native';
import { ActivityIndicator } from 'react-native';
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

export default function Side_header ({navigation,route}) {
    const {name,id} = route.params;
    const [current_list_data, setcurrent_list_data] = useState('');

    const [spinner, setSpinner] = React.useState(false);
    const [spinnerMSG, setSpinnerMSG] = React.useState("Loading");

    const [modalVisible, setModalVisible] = useState(false);
    const [CurrentSideName, setCurrentSideName] = useState(false);
    const [CurrentRequiredName, setCurrentRequiredName] = useState(false);
    const [CurrentMaxLimit, setCurrentMaxLimit] = useState(false);

    const [allow_navigation, setallow_navigation] =useState(true);
  useFocusEffect(
    React.useCallback(() => {
        setSpinner(true)
        setSpinnerMSG("Loading")
        const formData = new FormData();
        formData.append('product_category_id', id);
        fetch(global.global_url+'product_settings/get_side_header.php', {
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
                var data = responseJson.side_header.map(function(item,index) {
                    return {
                    key:item.dropdown_header_id,
                    name: item.name
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

  const add_side_header = () =>{
        setSpinner(true)
        setSpinnerMSG("Saving")
        const formData = new FormData();
        formData.append('name', CurrentSideName);
        formData.append('required', CurrentRequiredName);
        formData.append('maxLimit', CurrentMaxLimit);
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
    // console.log('row close' + !allow_navigation);
    // setallow_navigation(!allow_navigation);
};
const onRowDidOpen = rowKey => {
    // console.log('row open' + !allow_navigation);
    // setallow_navigation(!allow_navigation);
    
};

const deleteRow = (rowMap, rowKey) => {
    setSpinner(true)
    setSpinnerMSG("Deleting")
    const formData = new FormData();
    formData.append('id', rowKey);
    fetch(global.global_url+'product_settings/delete_side_header.php', {
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
            onPress={() =>  navigate_side_details(navigation,data.item.name,data.item.key)}
        >
            <Text style={styles.backTextWhite}>Details</Text>
        </TouchableOpacity>

    </View>
);

function dialogBox_add(){
  if(CurrentSideName == ""){ 
      Alert.alert('Please enter name');
  } else if (CurrentRequiredName == "") {
      Alert.alert('Please enter required');
  } else if(CurrentMaxLimit == ""){
      Alert.alert('Please enter max limit');
  }
  else {
      Alert.alert(
        'SAVE',
        'Are you sure you want to save ?',
        [
          {text: 'OK', onPress: () => add_side_header()},
          {text: 'NO', onPress: () => console.log('NO Pressed'), 
          style: 'cancel'},
        ],
        { cancelable: false }
    );
  }
}

return (
    <View style={styles.main}>

    <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setCurrentSideName('');
            setCurrentRequiredName('');
            setCurrentMaxLimit('');
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                    <View style={{flexDirection:"column",height: 260,width:200}}>
                    <TextInput style={{paddingLeft:20,height:50,borderColor: 'gray', borderWidth: 0.5,borderRadius:10, marginBottom: 5}} placeholder="  Side name"
                    onChangeText={text => setCurrentSideName(text)}
                    ></TextInput>

                    <TextInput style={{paddingLeft:20,height:50,borderColor: 'gray', borderWidth: 0.5,borderRadius:10, marginBottom: 5}} placeholder="  Required"
                    onChangeText={text => setCurrentRequiredName(text)}
                    ></TextInput>

                    <TextInput style={{paddingLeft:20,height:50,borderColor: 'gray', borderWidth: 0.5,borderRadius:10}} placeholder="  Max limit"
                    onChangeText={text => setCurrentMaxLimit(text)}
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
    {spinner && <CustomProgressBar />}
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
