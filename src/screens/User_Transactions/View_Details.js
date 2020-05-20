import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,

} from "react-native";

import { useFocusEffect } from '@react-navigation/native';



export default function View_Details ({navigation,route}) {
  const {order_id,total_amoun} = route.params;
  const [listData, setListData] = useState('');

  useFocusEffect(
    React.useCallback(() => {
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
            setListData(data);
            }).catch((error) => {
            console.error(error);
          });

      return () => {
      };
    }, [])
  );
  
return (
  <View style={styles.container}>
    <SectionList
      sections={listData}
      keyExtractor={(item, index) => item + index}

      renderItem={({ item,section }) =>
      <Item 
      order_details_dropdown_id = {item.order_details_dropdown_id}
       h_name = {item.h_name}
       d_name = {item.d_name}
       price = {item.price}
      />
     }
     renderSectionHeader={({ section: { product_name,total_price} }) => (
      <View style={{flex:6,flexDirection:"row"}}>
        <Text style={styles.header}>{product_name}</Text>
        <Text style={styles.header}>{total_price}</Text>
      </View>
    )}
    />
  </View>
)
}

function Item ({order_details_dropdown_id,h_name,d_name,price}){
  return (
    <View style={{flex:6,flexDirection:"row"}}>
      
        <Text style={styles.header}>{d_name}</Text>
        <Text style={styles.header}>{price}</Text>
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#ffff"
  },
  title: {
    fontSize: 24
  }
});