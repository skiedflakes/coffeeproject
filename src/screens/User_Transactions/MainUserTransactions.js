import React, { useState, useEffect } from 'react';
import { Text, View,Alert,StyleSheet,TouchableOpacity,TouchableHighlight,FlatList,Modal,SectionList,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-paper';

export default function MainUserTransactions ({navigation}) {
  const [selectedItems, setselectedItems] = useState();
  const [total_price,set_total_price] = useState('');
  const [order_list, set_order_list] = React.useState(null);
  const [modalVisible,setmodalVisible]= useState(false);
  const [listData, setListData] = useState('');
  const [modal_total_price,setmodal_total_price] = useState('');
  useFocusEffect(
    React.useCallback(() => {
        const fetchUser = async () => {
            fetch(global.global_url+'transaction_history/get_order_header.php')
            .then((response) => response.json())
                  .then((responseJson) => {
                    var data = responseJson.order_header.map(function(item) {
                     

                      if(item.status == 0){
                        var status_name = 'Pending Order';
                      }else if(item.status == 1){
                        var status_name = 'Order Accepted';
                      }else if(item.status == 2){
                        var status_name = 'Order Prepared';
                      }else if(item.status == 3){
                        var status_name = 'Delivering Oder';
                      }else if(item.status == 4){
                        var status_name = 'Order Delivered';
                      }else if(item.status == 5){
                        var status_name = 'Order Complete';
                      }
                      return {
                        order_id:item.order_id,
                        ref_no: item.reference_no,
                        duration: item.duration,
                        total_amount: item.total_amount,
                        all_product:item.all_product,
                        date_added:item.date_added,
                        status_name: status_name,
                      };
                    });
                    set_order_list(data);
                  }).catch((error) => {
                    console.error(error);
        });
      }
      fetchUser();
    }, [])
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "95%",
          alignSelf:"center",
          backgroundColor: "#000",
        }}
      />
    );
  }

  const Modal_FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

 const showModal = (order_id,total_price) =>{
   setmodal_total_price(0);
  const formData = new FormData();
    formData.append('order_id',order_id);
    fetch(global.global_url+'transaction_history/get_full_details.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        },
        body: formData
    }).then((response) => response.json())
          .then((responseJson) => {
            var data = responseJson.order_details_list.map(function(item) {
              return {
                order_details_id: item.order_details_id,
                product_name: item.product_name,
                total_price: item.total_price,
                qty:item.qty,
                data:item.data,
              };
            }); 
          
            setmodalVisible(true);
            setmodal_total_price(total_price);
            setListData(data);
            }).catch((error) => {
            console.error(error);
        
          });

 }
  return (
    <View style={styles.main}>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
      
        }}
      > 
        <View style={[styles.centeredView, modalVisible ? {backgroundColor: 'rgba(0,0,0,0.4)'} : '']}>
          <View style={styles.modalView}>
                  <View style={{width:(deviceWidth*0.7),flexDirection:"row-reverse"}}>
                  <Text style={{fontSize:20}}>P {modal_total_price}</Text>
                  </View>
                <View style={{flexDirection:"column",height:(deviceHeight*0.5),width:(deviceWidth*0.7),alignSelf:"center"}}>
                 
                  <SectionList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                    sections={listData}
                    keyExtractor={(item, index) => item + index}
                  
                    renderItem={({ item,section }) =>
                    <Modal_Item 
                    order_details_dropdown_id = {item.order_details_dropdown_id}
                    h_name = {item.h_name}
                    d_name = {item.d_name}
                    price = {item.price}
                    />
                  }
                  renderSectionHeader={({ section: {qty,product_name,total_price} }) => (
                    <View style={{flex:6,flexDirection:"row",borderTopWidth:0.8,marginTop:10}}>
                      <View style={{flex:4,flexDirection:"row",marginTop:10}}>
                      <Text style={styles.modal_header}>{qty}x {product_name}</Text>
                      </View>
                      <View style={{flex:2,flexDirection:"row-reverse",marginTop:10}}>
                      <Text style={styles.modal_header}>{total_price}</Text>
                      </View>
                    </View>
                  )}
                  />

                <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#787878",marginTop:10}}
                onPress={() => {setmodalVisible(!modalVisible);}}>  
                  <View style={{alignContent:"center",alignSelf:"center"}}>
                  <Text style={{color:"#ffff"}}>CLOSE</Text>
                  </View>
                </TouchableHighlight>
                </View>
          </View>
        </View>

      </Modal>
   
    <View style={styles.header} >
    <View style={{  flexDirection: 'row', padding:2,}} >
        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <Icon name="comments" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
        </TouchableOpacity>

    </View>
    <View style={{ flex:6,  flexDirection: 'row', padding:2,}} >
      <Text style={{color:'black',alignSelf:'center',marginLeft:20,fontSize:20}}>Your Order</Text>
    </View>
    </View>
    <View style={styles.body}>
    <View style={{  flexDirection: 'row',alignContent:"center",alignItems:"center"}} >
        {/* <Text>{user}</Text> */}
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{alignContent:"center",margin:2}}
            data={order_list}
            renderItem={
              ({ item }) => 
              <RowItem 
              order_id={item.order_id}
              navigation={navigation}
              ref_no={item.ref_no} 
              total_amount={item.total_amount} 
              all_product = {item.all_product}
              date_added = {item.date_added}
              status_name={item.status_name}
              showModal = {showModal}
              duration = {item.duration}
              />
              }
              keyExtractor={item => item.order_id.toString()}
            ItemSeparatorComponent = { FlatListItemSeparator }
        />
    </View>     
      {/* {content} */}

    </View>
    </View>
  );
}

function Modal_Item ({order_details_dropdown_id,h_name,d_name,price}){
  return (
    <View style={{flex:6,flexDirection:"row"}}>
        <View style={{flex:3,flexDirection:"row"}}>
        <Text style={styles.modal_details}>{d_name}</Text>
        </View>
        <View style={{flex:3,flexDirection:"row-reverse"}}>
        <Text style={styles.modal_details}>+ {price}</Text>
        </View>
  </View>
  );
}


function RowItem ({navigation,order_id,ref_no,total_amount,all_product,date_added,status_name,showModal,duration}) {
    return (
        <View>
            <View style={styles.item}>
              <View style={{flex:3,flexDirection:'row',alignItems:"center",alignContent:"center"}}> 
                <Text style={styles.title}>Ref. {ref_no}</Text>
              </View>
              <Text style={styles.title2}>P {total_amount}</Text>
            </View>

            <View style={styles.item2}>
                <View style={{flex:3,flexDirection:'row',alignItems:"center",alignContent:"center"}}> 

                 <Octicons name="package" size={25} color={"#4A4A4A"} style={{alignSelf:"center"}}/>
                 <Text style={styles.product_details}> {all_product}</Text>

                </View>
            </View>

            <View style={styles.item2}>
            <View style={{flex:3,flexDirection:'row',alignItems:"center",alignContent:"center"}}> 
                  <AntDesign name="calendar" size={20} color={"#4A4A4A"} style={{alignSelf:"center"}}/>
                  <Text style={styles.details}> {date_added}</Text>
                </View>
              
            </View>

            <View style={styles.item2}>
                <View style={{flex:3,flexDirection:'row',alignItems:"center",alignContent:"center",alignSelf:"center"}}> 
                    <Entypo name="back-in-time" size={25} color={"#4A4A4A"} style={{alignSelf:"center"}}/>
                    <Text style={styles.details}>{duration} minutes Arrival</Text>
                </View>

            </View>

            <View style={styles.item_botm}>
            <View style={{flex:3,flexDirection:'row',alignItems:"center",alignContent:"center"}}> 
                 <AntDesign name="sync" size={20} color={"#4A4A4A"} style={{alignSelf:"center"}}/>
                <Text style={styles.details}> {status_name}</Text>
                </View>
                <TouchableOpacity onPress={() => {showModal(order_id,total_amount)}} style={{flex:3,flexDirection:'row-reverse',alignItems:"center",alignContent:"center"}}> 
                <Text style={styles.view_details}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 10,
    elevation: 2
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
    padding: 25,
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
  main:{
      flex:6,
      backgroundColor: '#ffff',
      alignContent:"center",
      flexDirection:'column'
  },

  header:{
      flexDirection:'row-reverse',
      padding:2,
      flex:0.6,
      backgroundColor: '#ffff',
      alignContent:"center",
  },
  modal_header:{
    flexDirection:'row-reverse',
    padding:2,
    backgroundColor: '#ffff',
    alignContent:"center",
    fontSize:18                                                                                                                                                                                        
  },
  modal_details:{
    flexDirection:'row-reverse',
    padding:2,
    flex:0.6,
    backgroundColor: '#ffff',
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
      flex:6,
      flexDirection:'row',
      paddingLeft:10,
      backgroundColor:'#ffff',
      padding:5,
      alignContent:"center"
    },

    item2: {
        flex:6,
        padding:3,
        flexDirection:'row',
        paddingLeft:20,
        backgroundColor:'#ffff',
        alignContent:"center"
      },

      item_botm: {
        flex:6,
        padding:3,
        paddingBottom:10,
        flexDirection:'row',
        paddingLeft:20,
        backgroundColor:'#ffff',
        alignContent:"center"
      },

    title: {
      color:'black',
      padding:5,
      fontSize: 18,
    },

    title2: {
        color:'black',
     
        padding:5,
        fontSize: 25,
      },
      modal_details: {
        color:'#4A4A4A',
        padding:5,
        fontSize: 15,
        marginLeft:5
      },

    details: {
        color:'#4A4A4A',
        padding:5,
        fontSize: 15,
        marginLeft:5,
      },

      product_details: {
        color:'#4A4A4A',
        padding:5,
        marginRight:100,
        fontSize: 15,
        marginLeft:5,
      },
      cancel: {
        color:'red',
        padding:5,
        fontSize: 15,
        alignSelf:"center",
        borderWidth:2,
        borderColor:"#DE5252",
        textAlign:"center",
        marginRight:15,
      },
      view_details: {
        color:'black',
        padding:5,
        fontSize: 15,
        borderWidth:2,
        alignContent:"center",
        alignItems:"center",
        alignSelf:"center",
        textAlign:"center",
        borderColor:"#868484",
        marginRight:15
      },

      details_botm: {
        color:'#4A4A4A',
        padding:5,
        paddingBottom:15,
        fontSize: 15,
        paddingRight:15,
      },

    qty: {
      color:"#179DEA",
      padding:8,
      fontSize: 18,
      borderRadius:5,
      borderWidth:2,
      borderColor:'#179DEA',
      textAlign:"center",
      fontWeight:"bold"
    },

    place_order_text: {
      padding:8,
      fontSize: 18,
      color:"#FFFFFF",
    },
    place_order:{
      marginHorizontal:20,
      marginVertical:10,
      flexDirection:'row',
      borderRadius:5,
      backgroundColor:'#179DEA'}
})
