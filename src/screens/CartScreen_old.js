import React, { Component ,useState} from 'react';
import { View,Button,FlatList,Text,StyleSheet,TouchableOpacity, Alert} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function CartScreen ({navigation}) {
  const [selectedItems, setselectedItems] = useState();
  const [mycart,setmycart] = useState([]);
  const [total_price,set_total_price] = useState('');

  useFocusEffect(
    React.useCallback(() => {
     //remove selected items
     AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        const newData= stores.map((result, i, store) => {
            let key = store[i][0];
            var jsonPars = JSON.parse(store[i][1]);
            if(jsonPars.add_to_cart==1){
              // setItemStorage(n.toString(),{'id':n.toString(),'selected_additions':0,'add_to_cart':1,'product_id':product_id,'product_name': product_name,'qty':current_qty,'price':current_price})
                return jsonPars;
            }else{
             
            }
          
          });
          try{
            var filtered_newData = newData.filter(e => e != null);
            console.log("cart data: ",filtered_newData.length);

            var total = filtered_newData.map(item => item.price).reduce((prev, next) => +prev + +next);
            set_total_price(total);
            setmycart(filtered_newData);

          }catch(error){}
         
        });
      });


      return () => {

        
      };
    }, [])
  );


  const clear_async = ()=> {
    console.log(mycart);
    const removeItems  = async (key) => {
      console.log('main == ',key)
      await AsyncStorage.removeItem(key);
    }
    
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0];
            var jsonPars = JSON.parse(store[i][1]);
            if(jsonPars.add_to_cart==1){
              removeItems(key)
            }else{
            }
          });
        });
      });

      
    setmycart(null);
  }
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

  const save_products = () =>{
    if( global.g_user_id!=''){
      var stringify_cart = JSON.stringify(mycart);
      const formData = new FormData();
      formData.append('user_id',global.g_user_id);
      formData.append('total_price',total_price);
      formData.append('mycart',stringify_cart);
      
      fetch(global.global_url+'cart/save_product.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: formData
      }).then((response) => response.json())
            .then((responseJson) => {
              
             responseJson.save_response.map(function(item) {
                 Alert.alert(item.status);
                 if(item.status=='success'){
                    // clear asnyc
                    clear_async();
                     navigation.goBack()
                 }
              });
    
                 }).catch((error) => {
              console.error(error);
            });
    
    
      }else{
        navigation.navigate('Login');
       }
  }



  return (
    <View style={styles.main}>
        <Button title="clear cart" onPress={clear_async}></Button>
 
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{alignContent:"center",margin:2}}
            data={mycart}
            renderItem={
              ({ item }) => 
              <RowItem 
              product_name = {item.product_name}
              price = {item.price}
              qty = {item.qty}
              />
              }
            keyExtractor={item => item.id}
            ItemSeparatorComponent = { FlatListItemSeparator }
        />

        <TouchableOpacity
        onPress={() => save_products()}
         style={styles.place_order}>
         <View style={{flex:6,flexDirection:"row"}}>
           <View style={{flex:2}}>
           <Text style={styles.place_order_text}></Text>
           </View>
           <View style={{flex:3}}>
           <Text style={styles.place_order_text}>Place Order</Text>
          </View>
          <View style={{flex:2,flexDirection:"row-reverse",marginHorizontal:20}}>
            <Text style={styles.place_order_text}>P {total_price}</Text>
          </View>
         </View>
        </TouchableOpacity>
      </View>
  );
}

function RowItem({id,product_name,qty,price}){
  return(
      <TouchableOpacity onPress={() => null}>
          <View style={styles.item}>
            <View style={{flex:3,flexDirection:"row"}}>
            <Text style={styles.qty}>{qty}</Text>
            <Text style={styles.title}>{product_name}</Text>
            </View>
            <View style={{flex:3,flexDirection:"row-reverse",marginHorizontal:20}}>
            <Text style={styles.title}>P {price}</Text> 
            </View>
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
