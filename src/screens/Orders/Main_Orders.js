import React, { useState, useEffect } from 'react';
import { Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';



export default function Main_Orders ({navigation}) {
  const [selectedItems, setselectedItems] = useState();
  const [total_price,set_total_price] = useState('');
  const [order_list, set_order_list] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {

        const fetchUser = async () => {
            fetch(global.global_url+'order/get_order_header.php')
            .then((response) => response.json())
                  .then((responseJson) => {
                    var data = responseJson.order_header.map(function(item) {
                      return {
                        order_id: item.order_id,
                        total_amount: item.total_amount
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
      <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>Orders</Text>
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

function RowItem ({navigation,order_id,total_amount}) {
    return (
        <TouchableOpacity onPress={() => null}>
            <View style={styles.item}>
              <View style={{flex:3,flexDirection:'row',alignItems:"center"}}>
             
    <Text style={styles.title}>Order No. {order_id}</Text>
              </View>
              <Text style={styles.title}>P{total_amount}</Text>
                <MaterialIcons style={{alignSelf:'center'}} name="keyboard-arrow-right" size={25} color={"#393737"}/>
            </View>
        </TouchableOpacity>
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
    title: {
      color:'#4A4A4A',
      padding:10,
      fontSize: 18,
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
