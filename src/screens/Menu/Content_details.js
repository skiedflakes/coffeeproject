import React, { useState, useRef,useEffect } from 'react';
import {Button,BackHandler,SafeAreaView, FlatList, Text, View,Alert,StyleSheet,TouchableOpacity,SectionList,TextInput,CheckBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 
import { call, set, min } from 'react-native-reanimated';

export default function Content_details ({navigation,route}) {
  const {product_name,price,product_id,product_category_id,data_details,data_header} = route.params;
  var [current_price,setprice] = useState(price);
  var [current_qty,setqty] = useState(1);
  var [current_additional,setcurrent_additional] = useState(0);

//new
  const [listData, setListData] = useState('');

  useFocusEffect(
    React.useCallback(() => {

     const formData = new FormData();
    formData.append('product_category_id',2);

    fetch(global.global_url+'menu/get_dropdown_details_v2.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        },
        body: formData
    }).then((response) => response.json())
          .then((responseJson) => {
            var data = responseJson.all_data.map(function(item) {
         
              return {
                header_id: item.header_id,
                title: item.title,
                current_checked:0,
                required: item.required,
                data:item.data,
              };
            });
            
            console.log(data);
            setListData(data);

            }).catch((error) => {
            console.error(error);
          });


      return () => {
      };
    }, [])
  );
  
  const setItemStorage = async (key,value) => {
 

    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  };

  const add_to_cart = () =>{
    var d = new Date();
    var n = d.getTime();
    setItemStorage(n.toString(),{'id':n.toString(),'selected_additions':0,'add_to_cart':1,'product_id':product_id,'product_name': product_name,'qty':current_qty,'price':current_price})
    getContent(navigation,product_name,product_category_id);
  }

  const update_total_price = (minus_plus) =>{
    var qty = current_qty;

    if(minus_plus=='plus'){
        qty = ++current_qty;
        var total = (+price * +current_qty)+ +current_additional;
        setprice(total);
    }else if(minus_plus=='minus'){
      if(current_qty>1){
        qty = --current_qty;
        var total = (+price * +current_qty)+ +current_additional;
        setprice(total);
      }else{
      }
    }else{
      setcurrent_additional(minus_plus);
        setprice((+price* +1)+ +minus_plus);
    }
    setqty(qty);
  }

  const callback = () =>{
    try{
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          const newData = stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            var jsonPars = JSON.parse(store[i][1]);
            if(jsonPars.selected_additions==1){
              return JSON.parse(store[i][1]);
            }else{
              return null;
            }

          });

          try{

            var filtered_newData = newData.filter(e => e != null);
            var total = filtered_newData.map(item => item.price).reduce((prev, next) => +prev + +next);
            update_total_price(total);
            console.log(total);
          
          }catch(error){}
        });


      });

    }catch(error){}
  }



  //new 
  const updateRow = (rowKey,myname,checked,required) => {
    // console.log([true,false,true,false,true].filter(v => v).length);
    const [section] = rowKey.split('.');
    const newData = [...listData];
    const prevIndex = listData[section].data.findIndex(
        item => item.key === rowKey
    );

    if(required==1){ // if one required

      //set all to false
      newData[section].data.map(function(item,index) {
        newData[section].data.splice(index, 1,{key:item.key,text:item.text,checked:false});
      });

      //set only one true
      newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked});

    }else{ //if two or more required
      
      newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked});
      var result = newData[section].data.filter(obj => {
        return obj.checked == true
      })
      
      if(result.length>required){ // check if more than required
        newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:checked}); // set to default
      }
    }

    setListData(newData);
};


const Item = ({title,selected,updateRow,id,required}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <CircleCheckBox
            checked={selected ? true :false}
            labelPosition={LABEL_POSITION.RIGHT}
            onToggle={() => updateRow(id,title,selected,required)}
          />
  </View>
);

  return (

    <SafeAreaView style={styles.container}>
      <View style={{flex:5}}>

      <SectionList
      sections={listData}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item,section }) =>
       <Item 
       title={item.text} 
       selected={item.checked}
       updateRow = {updateRow}
        id = {item.key}
        required={section.required}
       />
      }
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />

    </View>
    <View style={{flex:1}}>
      <View style={{flex:6,alignContent:"center"}}>

        <View style={{flex:3,flexDirection:"row",alignItems:"center",paddingVertical:10}}>
          <View style={{flex:2.5,flexDirection:"row-reverse",alignContent:"center",alignItems:"center",alignSelf:"center"}}>
            <Button title="+" onPress={() => update_total_price('plus')}></Button>
          <Text style={{textAlign:"center",marginHorizontal:10}}>{current_qty}</Text>
            <Button title="-" onPress={() => update_total_price('minus')}></Button>
          </View>
          <View style={{flex:1.5,flexDirection:"row-reverse",marginLeft:20}}>
          <Text style={{fontSize:18}}>P {current_price}</Text>
          </View>
        </View>

        <View style={{flex:3,alignItems:"center"}}>
          <Button title="add to cart" onPress={()=>add_to_cart()}></Button>
        </View>
      </View>

    </View>

  </SafeAreaView>
  
  );
}


//php get data

function getContent(navigation,title,product_category_id){
  const formData = new FormData();
  formData.append('product_category_id',product_category_id);
  
  
  fetch(global.global_url+'menu/get_menu_details.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: formData
  }).then((response) => response.json())
        .then((responseJson) => {
          var data = responseJson.product_details.map(function(item) {
            return {
              product_id: item.product_id,
              product_name: item.product_name,
              price: item.price,
              image_url: item.image_url
            };
          });
          navigation.navigate("Content",{title,content_data:data,product_category_id});
        }).catch((error) => {
          console.error(error);
        });
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 6,
    margin:10,

  },

    
  header_item: {
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize:20
  },
  
  item: {
    padding: 10,
  },

  title: {
    flex:3,
    fontSize: 15,
  },

  title2: {
    fontSize: 25,
  },
});