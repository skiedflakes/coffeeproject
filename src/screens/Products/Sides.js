import React, { useState, useEffect } from 'react';
import { Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView,Modal,TouchableHighlight } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';

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

export default function Sides ({navigation}) {

  const [spinner, setSpinner] = React.useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [Category_name, setCategory_name] = useState('');
  const [current_list_data, setcurrent_list_data] = useState('');

  useFocusEffect(
    React.useCallback(() => {
        setSpinner(true)
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

            setSpinner(false)
    
        }).catch((error) => {
          console.error(error);
          setSpinner(false)
          //Alert.alert('Connection Error');
        });

      return () => {
      };
    }, [])
  );

 

    return (
    <View style={styles.main}>
    <View style={styles.header} >

    <TouchableOpacity style={{ flex:6,  flexDirection: 'row', padding:2,}} onPress={() => {
          setModalVisible(true);
        }}>
      <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>Select Category</Text>
    </TouchableOpacity>
    </View>
    <View style={styles.body}>
    <View style={{  flexDirection: 'row',alignContent:"center",alignItems:"center"}} >

        <FlatList
            data={current_list_data}
            renderItem={  ({ item }) => 
            <RowItem
              navigation={navigation}
              title={item.product_type_name} 
              id = {item.key}
              />
            }
            keyExtractor={item => item.key.toString()}
            ItemSeparatorComponent = { FlatListItemSeparator }
        />
    </View> 
    </View>
    {spinner && <CustomProgressBar />}
    </View>
  );
}


function RowItem ({navigation,title,id}) {
  return (
      <TouchableOpacity  onPress={() => get_side_header(navigation,title,id)}>
          <View style={styles.item}>
            <View style={{flex:3,flexDirection:'row',alignItems:"center"}}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <MaterialIcons style={{alignSelf:'center'}} name="keyboard-arrow-right" size={25} color={"#393737"}/>
          </View>
          
      </TouchableOpacity>
  );
}

function get_side_header(navigation,name,id){
  navigation.navigate("Side Header",{name,id});
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
