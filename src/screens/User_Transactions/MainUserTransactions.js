import React, { useState, useEffect } from 'react';
import { Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-paper';



export default function MainUserTransactions ({navigation}) {
  const [selectedItems, setselectedItems] = useState();
  const [total_price,set_total_price] = useState('');
  const [order_list, set_order_list] = React.useState(null);

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
                        order_id: item.reference_no,
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
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  return (
    <View style={styles.main}>
    <View style={styles.header} >
    <View style={{  flexDirection: 'row', padding:2,}} >
        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <Icon name="comments" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
        </TouchableOpacity>

    </View>
    <View style={{ flex:6,  flexDirection: 'row', padding:2,}} >
      <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>Transaction</Text>
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
              navigation={navigation}
              order_id={item.order_id} 
              total_amount={item.total_amount} 
              all_product = {item.all_product}
              date_added = {item.date_added}
              status_name={item.status_name}
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

function RowItem ({navigation,order_id,total_amount,all_product,date_added,status_name}) {
    return (
        <View>
            <View style={styles.item}>
              <View style={{flex:3,flexDirection:'row',alignItems:"center",alignContent:"center"}}> 
                <Text style={styles.title}>Ref. {order_id}</Text>
              </View>
              <Text style={styles.title2}>P {total_amount}</Text>
            </View>

            <View style={styles.item2}>
                <View style={{flex:3,flexDirection:'row',alignItems:"center",alignContent:"center"}}> 

                 <Octicons name="package" size={25} color={"#4A4A4A"} style={{alignSelf:"center"}}/>
                 <Text style={styles.details}> {all_product}</Text>

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
                    <Text style={styles.details}>8 minutes Arrival</Text>
                </View>

            </View>

            <View style={styles.item_botm}>
            <View style={{flex:3,flexDirection:'row',alignItems:"center",alignContent:"center"}}> 
                 <AntDesign name="sync" size={20} color={"#4A4A4A"} style={{alignSelf:"center"}}/>
                <Text style={styles.details}> {status_name}</Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("View Details");}} style={{flex:3,flexDirection:'row-reverse',alignItems:"center",alignContent:"center"}}> 
                <Text style={styles.view_details}>Full Details</Text>
                </TouchableOpacity>
           
            </View>
        </View>
    );
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
const styles = StyleSheet.create({
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

    details: {
        color:'#4A4A4A',
        padding:5,
        fontSize: 15,
        paddingRight:15,
        marginRight:10,
        marginLeft:5
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
