import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  TouchableHighlight,
  Alert
} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';



export default function CartScreen ({navigation}) {
  const [listData, setListData] = useState(null);
  const [TotalCartPrice, setTotalCartPrice] = useState('0');

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
            var final_total = filtered_newData.map(item => item.price).reduce((prev, next) => +prev + +next);

            setTotalCartPrice(final_total);
            var counter =-1;
              var data = filtered_newData.map(function(item2) {
              var data_title = filtered_newData.map(function(item) {
              
                if(item2.id==item.id){
                  ++counter;
                  return {
                    section:counter,
                    id: item.id,
                    product_name: item.product_name,
                    price: item.price,
                    base_price:item.base_price,
                    add_on_price:item.add_on_price,
                    qty:item.qty
                  };
                }else{return null}
              });
              var f_data_title = data_title.filter(e => e != null);

              return {
                id: item2.id,
                product_id: item2.product_id,
                product_name: item2.product_name,
                qty:item2.qty,
                price:item2.price,
                data_title:f_data_title,
                data:item2.data,
              };
            });


       
            setListData(data);
            // console.log(data);
       

          }catch(error){}
         
        });
      });


      return () => {

        
      };
    }, [])
  );

const closeRow = (rowMap, rowKey) => {

  if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
  }
};

const deleteRow = (rowKey,id) => {
  const newData = [...listData];
  const prevIndex = listData.findIndex(item => item.id === id);
  console.log(prevIndex+" rowKey " +rowKey + "id "+id);
  newData.splice(prevIndex, 1);
   
    //ASYNC STORAGE REMOVE ALL PRE-SELECTED ADDITIONS
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              let key = store[i][0];
              var jsonPars = JSON.parse(store[i][1]);
              var basetotal= +jsonPars.base_price+ +jsonPars.add_on_price;
              if(key==id){
                setTotalCartPrice(+TotalCartPrice- +basetotal);
                removeItems(key)
              }else{
              }
            });
          });
      });

      // const newData = [...listData];
      // const prevIndex = listData.findIndex(item => item.id === rowKey);
      // console.log(newData);
      // newData.splice(prevIndex, 1);
    
      setListData(newData);
};

  //SET ITEM STORAGE
  const setItemStorage = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  };

  //DELETE ITEM STORAGE
 const removeItems  = async (key) => {
      await AsyncStorage.removeItem(key);
  }

const add_qty = (section,rowKey,id,product_name,price,base_price,add_on_price,qty) => {
  const newData = [...listData];
  const prevIndex = listData.findIndex(item => item.id === id);
  var added_qty = ++qty;


  console.log(base_price + "/ " + add_on_price +" /"+added_qty)
  var t_price = (+base_price + +add_on_price)* +added_qty;
  newData[section].data_title.splice(0, 1,
    { 
      section: section,
      id: id,
      product_name: product_name,
      price: t_price,
      base_price:base_price,
      add_on_price:add_on_price,
      qty:added_qty});
  setListData(newData);
  update_cart(id,added_qty,'plus');

};

const minus_qty = (section,rowKey,id,product_name,price,base_price,add_on_price,qty) => {
  const newData = [...listData];
  const prevIndex = listData.findIndex(item => item.key === rowKey);
  var added_qty = --qty;

  if(added_qty>0){
    var t_price = (+base_price * +add_on_price)* +added_qty;

    console.log(base_price + "/ " + add_on_price +" /"+added_qty)
  
    newData[section].data_title.splice(prevIndex, 1,
      { 
        section: section,
        id: id,
        product_name: product_name,
        price: t_price,
        base_price:base_price,
        add_on_price:add_on_price,
        qty:added_qty});
    setListData(newData);
    update_cart(id,added_qty,'minus');
  }else{ //delete
    deleteRow(rowKey,id);
  }
};


const update_cart = (my_key,my_qty,minus_plus) =>{ //add pre selected is add to cart key == 0
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          var jsonPars = JSON.parse(store[i][1]);
          var total_price = (+jsonPars.base_price+ +jsonPars.add_on_price)* +my_qty;
          var basetotal= +jsonPars.base_price+ +jsonPars.add_on_price;
          if(key==my_key){
            if(minus_plus=='plus'){
              setTotalCartPrice(+TotalCartPrice+ +basetotal);
            }else{
              setTotalCartPrice(+TotalCartPrice- +basetotal);
            }
           
            setItemStorage(key,{
              'id':jsonPars.id,
              'add_to_cart':1,
              'product_id':jsonPars.product_id,
              'product_name': jsonPars.product_name,
              'qty':my_qty,
              'add_on_price':jsonPars.add_on_price,
              'base_price':jsonPars.base_price,
              'price':total_price,
              'data':jsonPars.data});
          }
        });
      });
    });
}

const onRowDidOpen = rowKey => {
  console.log('This row opened', rowKey);
};


const renderHiddenItem = (data, rowMap) => (
  <View style={styles.rowBack}>
      <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => closeRow(rowMap, data.item.id+data.item.product_name)}
      >
          <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(data.item.key,data.item.id)}
      >
          <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
  </View>
);

  return(
    <View style={styles.container}>
 <View style={{flex:6}}>
    <SectionList
      sections={listData}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item,section }) =>
       <Item 
       header_name = {item.header_name}
       title={item.name} 
       price={item.price} 
       required={section.required}
       />
      }
      renderSectionHeader={({ section: { title,data_title } }) => (
       <View>
        <SwipeListView
            
            data={data_title}
            renderItem={({ item }) => 
            <RowItem
              section={item.section}
              minus_qty={minus_qty}
              add_qty={add_qty}
              qty={item.qty}
              title={item.product_name}
              id={item.id}
              price = {item.price}
              base_price = {item.base_price}
              add_on_price = {item.add_on_price}
              />
            }
            rightOpenValue={-225}
            previewOpenValue={-40}
            previewOpenDelay={0}
            renderHiddenItem={renderHiddenItem}
            keyExtractor={item => item.id+item.product_name}
            onRowDidOpen={onRowDidOpen}
        />
   </View>
      )}
    />
    </View>
    <View>
      <TouchableOpacity
        onPress={() => cart_nav({navigation,TotalCartPrice})}
         style={styles.place_order}>
         <View style={{flex:6,flexDirection:"row"}}>
      
            <View style={{flex:3}}>
              <Text style={{
                  padding:8,
                  fontSize: 18,
                  color:"#FFFFFF",
                  marginLeft:20
                }}>Place Order</Text>
              </View>
          <Text style={{
              padding:8,
              fontSize: 18,
              color:"#FFFFFF",
              marginRight:20,
            }}>{TotalCartPrice}</Text>
         </View>
        </TouchableOpacity>
        </View>
  </View>
  )
}

function cart_nav({navigation,TotalCartPrice}){
  navigation.navigate("Place Order",{TotalCartPrice:TotalCartPrice});
  
}

function RowItem ({section,title,id,price,qty,base_price,add_on_price,add_qty,minus_qty}) {
  var t_price =(+base_price+ +add_on_price)* +qty;
  return (
    //   <TouchableNativeFeedback onPress={() => navigate_side_details(navigation,title,id,allow_nav,true)}>
 
          <View style={styles.row_item}>
            <View style={{flex:2,flexDirection:'row',alignItems:"center"}}>
            <TouchableNativeFeedback style={styles.add_plus}  onPress={() =>add_qty(section,id+title,id,title,price,base_price,add_on_price,qty) }>
              <Text style={{fontSize:18}}>+</Text>
            </TouchableNativeFeedback>
            <Text style={styles.title}>{qty}x</Text>

            <TouchableNativeFeedback style={styles.add_plus} onPress={() =>minus_qty(section,id+title,id,title,price,base_price,add_on_price,qty) }>
              <Text style={{fontSize:18}}>-</Text>
            </TouchableNativeFeedback>
            </View>
            <View style={{flex:3.5,flexDirection:'row',alignItems:"center",marginLeft:10}}>
            <Text style={styles.row_title}>{title}</Text>
            </View>

            <View style={{flex:1.5,flexDirection:'row',alignItems:"center",marginRight:10}}>
            <Text style={styles.title}>{t_price}</Text>
            <MaterialIcons style={{alignSelf:'center'}} name="keyboard-arrow-right" size={25} color={"#393737"}/>
            </View>
          </View>
  );
}

const Item = ({title,header_name,price,id,required}) => (
  <View style={styles.item}>
    <View style={{flex:3,flexDirection:'row',alignItems:"center"}}>
    <Text style={styles.item_text}>{header_name} : {title}</Text>
    </View>
    <Text style={styles.item_text}>{price}</Text>
  </View>
);


const styles = StyleSheet.create({
  
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
    backgroundColor:'#179DEA'},
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
    flex:6,
    backgroundColor: '#ffff',
    alignContent:"center",
    flexDirection:'column'
    },

    row_title:{
      color:'black',
      padding:5,
      fontSize: 20,
      fontWeight: "500",
    },
    item: {
      paddingBottom:10,
      flexDirection:'row',
      paddingLeft:25,
      backgroundColor:'#ffff',
      paddingRight:35,
      alignContent:"center",
      alignItems:"center"
    },
    item_text: {
      flexDirection:'row',
      backgroundColor:'#ffff',
      alignContent:"center",
      alignItems:"center",
      color:"#858181"
    },
    row_item: {
      borderTopColor:"gray",
      borderTopWidth:1,
      flexDirection:'row',
      paddingLeft:20,
      paddingTop:5,
      padding:5,
      backgroundColor:'#ffff',
      alignContent:"center",
      alignItems:"center",
      elevation:6
    },
    title: {
      color:'#4A4A4A',
      padding:10,
      fontSize: 20,
    },

    add_plus:{
      width:30,
      height:35,
      alignItems:'center',
      alignContent:"center",
      alignSelf:"center",
      color:'#4A4A4A',
      padding:5,
      fontSize: 20,
      borderRadius: 5,
      borderColor:'black',
      borderWidth:1.5,
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
