import React, { useState, useRef,useEffect } from 'react';
import {Button,BackHandler,SafeAreaView, FlatList, Text, View,Alert,StyleSheet,TouchableOpacity,SectionList,TextInput,CheckBox,Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 
import { call, set, min } from 'react-native-reanimated';

export default function Content_details ({navigation,route}) {
  const {product_name,product_id,product_category_id} = route.params;

  const [spinner, setSpinner] = React.useState(false);

  var [current_qty,setqty] = useState(1);
  
  //new const
  const [listData, setListData] = useState('');
  const [base_price,setbase_price] = useState(0);
  const [add_on_price,setadd_on_price] = useState(0);
  const [final_price,setfinal_price] = useState(0);

  const [required_check,setrequired_check] = useState(''); // from db
  const [required_checked,setrequired_checked] = useState(''); //user input

  useFocusEffect(
    React.useCallback(() => {
    //ASYNC STORAGE REMOVE ALL PRE-SELECTED ADDITIONS
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0];
            var jsonPars = JSON.parse(store[i][1]);
            if(jsonPars.selected_additions==1){
              removeItems(key)
            }else{
            
            }
          
          });
        });
    });

    // LOAD SELECTIONS
    setSpinner(true)
    const formData = new FormData();
    formData.append('product_category_id',product_category_id);
    formData.append('product_id',product_id);

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
              var mymessage = '';

              if(item.required==0&&item.max_limit==0){ //dont show optional any
                mymessage= 'optional choose any';
              }else if(item.required ==1 && item.max_limit == 1){ //show limit and required
                mymessage= 'required '+ item.required;
              }else if(item.required == item.max_limit){ //show limit and required
                mymessage= 'required '+ item.required+ ' optional limit '+item.max_limit;
              }else if(item.required==0&& item.max_limit>0){ //show max
                mymessage= 'optional max '+ item.max_limit;
              }else {

              }

              return {
                header_id: item.header_id,
                title: item.title,
                title2: mymessage,
                current_checked:0,
                required: item.required,
                max_limit: item.max_limit,
                data:item.data,
              };
            }); 

           
            setListData(data);
            var filtered_data = data.filter(e => e != null);
            var total_required = filtered_data.map(item => item.required).reduce((prev, next) => +prev + +next);
            setrequired_check(total_required);

            setSpinner(false)

            }).catch((error) => {
            console.error(error);
            setSpinner(false)
          });

      return () => {
      };
    }, [])
  );

  //DELETE ITEM STORAGE
  const removeItems  = async (key) => {
    await AsyncStorage.removeItem(key);
    update_price('selection');
  }


  //SET ITEM STORAGE
  const setItemStorage = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  };

  //add SELECTED
  const add_pre_selected = (h_id,d_id,name,price,required,header) =>{ //add pre selected is add to cart key == 0
    var n = new Date().getTime(); // get unique ID
    setItemStorage(n.toString(),
    {'id':n.toString(),
    'selected_additions':1,
    'h_id':h_id,
    'd_id': d_id,
    'header_name':header,
    'name':name,
    'price':price,
    'required':required})
  }
  //delete PRE-SELECTED many
  const delete_pre_selected_req_many = (h_id,d_id) =>{ //add pre selected is add to cart key == 0
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0];
            var jsonPars = JSON.parse(store[i][1]);
            if(jsonPars.selected_additions==1 &&jsonPars.h_id==h_id&jsonPars.d_id==d_id){
              removeItems(key)
         
            }else{
            }
          });
        });
    });
  }

    //delete PRE-SELECTED one
const delete_pre_selected_req_1 = (h_id,d_id) =>{ //add pre selected is add to cart key == 0
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              let key = store[i][0];
              var jsonPars = JSON.parse(store[i][1]);
              if(jsonPars.selected_additions==1 &&jsonPars.h_id==h_id&&jsonPars.d_id){
                removeItems(key)
           
              }else{
              }
            });
          });
      });
}

    //update PRE-SELECTED one
const update_pre_selected_req_1 = (h_id,d_id,name,price,required,header) =>{ //add pre selected is add to cart key == 0
          AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                  let key = store[i][0];
                  var jsonPars = JSON.parse(store[i][1]);
                  if(jsonPars.selected_additions==1&&jsonPars.h_id==h_id&&jsonPars.d_id){
                    setItemStorage(key,
                      {'id':key,
                      'selected_additions':1,
                      'h_id':h_id,
                      'd_id': d_id,
                      'header_name':header,
                      'name':name,
                      'price':price,
                      'required':required})
                    update_price('selection')
                  }else{
                  }
                });
              });
          });
}


  //new updating sectionlist with select button
  const updateRow = (h_id,d_id,rowKey,myname,checked,required,myprice,limit,header) => {
    // UPDATE UI AND DATA ON TOGGLE
      const [section] = rowKey.split('.');
      const newData = [...listData];
      const prevIndex = listData[section].data.findIndex(
          item => item.key === rowKey
      );

      if(limit>=required){

        if(required>0){
          if(required==1){ // if one required
            var check_has_true = newData[section].data.map(function(item,index) {
              if(item.checked==true){
                return true;
              }else{
                return false;
              }
            
            });
            
            check_has_true = check_has_true.includes(true);
            //set all to false
            newData[section].data.map(function(item,index) {
              newData[section].data.splice(index, 1,{key:item.key,text:item.text,checked:false,price:item.price,h_id:item.h_id,d_id:item.d_id});
              });
      
            //SAVE ASYNC STORAGE
            //IF CHECK IS FALSE
            if(check_has_true==false||checked==undefined){ // add to async storage PRE-SELECTED ADDITIONS
              //set only one true
              newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked,price:myprice,h_id:h_id,d_id:d_id}); 
              add_pre_selected(h_id,d_id,myname,myprice,required,header);
              if(h_id=='0'){ //static Size
                setbase_price(myprice);
              }
              update_price('selection');
            }else if(check_has_true==true&&checked==false){ //update selected
              //set only one true
              newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked,price:myprice,h_id:h_id,d_id:d_id});
              if(h_id=='0'){//static Size
                setbase_price(myprice);
              }
              update_pre_selected_req_1(h_id,d_id,myname,myprice,required,header);
              //if Size add as base price
            }else{ //remove from async storage+
                          //if Size add as base price
              delete_pre_selected_req_1(h_id,d_id);

              if(h_id=='0'){//static Size
                setbase_price(0);
              }
              update_price('selection');
            } 
    
  
        }else{ //if two or more required
          
            newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked,price:myprice,h_id:h_id,d_id:d_id});
            var result = newData[section].data.filter(obj => {
              return obj.checked == true
            })
            
            if(result.length>required){ // check if more than required
              newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:checked,price:myprice,h_id:h_id,d_id:d_id}); // set to default
  
            }else{
            //SAVE ASYNC STORAGE
            //IF CHECK IS FALSE
            if(checked==false||checked==undefined){ // add to async storage PRE-SELECTED ADDITIONS
              add_pre_selected(h_id,d_id,myname,myprice,1,header)
              update_price('selection')
            }else{ //remove from async storage
              delete_pre_selected_req_many(h_id,d_id);
            } 
            }
  
        }
        }else{
        if(limit==1){ // if one required
            var check_has_true = newData[section].data.map(function(item,index) {
              if(item.checked==true){
                return true;
              }else{
                return false;
              }
            
            });
  
            check_has_true = check_has_true.includes(true);
            //set all to false
            newData[section].data.map(function(item,index) {
              newData[section].data.splice(index, 1,{key:item.key,text:item.text,checked:false,price:item.price,h_id:item.h_id,d_id:item.d_id});
              });
      
            //SAVE ASYNC STORAGE
            //IF CHECK IS FALSE
            if(check_has_true==false||checked==undefined){ // add to async storage PRE-SELECTED ADDITIONS
              //set only one true
              newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked,price:myprice,h_id:h_id,d_id:d_id}); 
              add_pre_selected(h_id,d_id,myname,myprice,0,header);
              update_price('selection');
            }else if(check_has_true==true&&checked==false){ //update selected
              //set only one true
              newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked,price:myprice,h_id:h_id,d_id:d_id});
              update_pre_selected_req_1(h_id,d_id,myname,myprice,0,header);
  
            }else{ //remove from async storage+
              delete_pre_selected_req_1(h_id,d_id);
              update_price('selection');
            } 
    
  
        }else{ //if two or more required
          
            newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked,price:myprice,h_id:h_id,d_id:d_id});
            var result = newData[section].data.filter(obj => {
              return obj.checked == true
            })
            
            if(result.length>limit){ // check if more than required
              newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:checked,price:myprice,h_id:h_id,d_id:d_id}); // set to default
  
            }else{
            //SAVE ASYNC STORAGE
            //IF CHECK IS FALSE
            if(checked==false||checked==undefined){ // add to async storage PRE-SELECTED ADDITIONS
              add_pre_selected(h_id,d_id,myname,myprice,0,header)
              update_price('selection')
            }else{ //remove from async storage
              delete_pre_selected_req_many(h_id,d_id);
            } 
            }
  
        }
        }
      }else{ //cannot be
        console.log('cannot be');
      }

      setListData(newData);

    //END
     
};

const update_show_price = (base_price,add_on_price,qty) =>{

  setfinal_price((+base_price+ +add_on_price)* +qty);
}

const update_price = (minus_plus) => {
  var qty = current_qty;
  if(minus_plus=='plus'){
    qty = ++current_qty;
    setqty(qty);
    update_show_price(base_price,add_on_price,qty)

  }else if(minus_plus=='minus'){
    if(qty>1){
      qty = --current_qty;
      setqty(qty);
      update_show_price(base_price,add_on_price,qty)
    }

  }else if(minus_plus=='selection'){
    try{

      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          const final_price_data = stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            var jsonPars = JSON.parse(store[i][1]);
            if(jsonPars.selected_additions==1&&jsonPars.h_id!=0){
              return JSON.parse(store[i][1]);
            }else{
              return null;
            }

          });
   
          if(final_price_data!=null){
            try{
              
              var filtered_newData = final_price_data.filter(e => e != null);
              var total = filtered_newData.map(item => item.price).reduce((prev, next) => +prev + +next);
              setadd_on_price(total);
              
            }catch(error){
              setadd_on_price('0.00')
            }
          }else{
            setadd_on_price('0.00')
          }
        });
      });
    

      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          const final_price_data = stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            var jsonPars = JSON.parse(store[i][1]);
            if(jsonPars.selected_additions==1){
              return JSON.parse(store[i][1]);
            }else{
              return null;
            }

          });
   
          if(final_price_data!=null){
            try{
              
              var filtered_newData = final_price_data.filter(e => e != null);
              var total = filtered_newData.map(item => item.price).reduce((prev, next) => +prev + +next);
              var total_required_checked = filtered_newData.map(item => item.required).reduce((prev, next) => +prev + +next);
              setrequired_checked(total_required_checked);
              setfinal_price(+total*+current_qty);
   
            }catch(error){
              setfinal_price(0.00);
            }
          }else{
            setfinal_price(0.00);
          }
        });
      });

    }catch(error){}
  }
}


const add_to_cart = () =>{

  if(required_check==required_checked){
  
  var d = new Date();
  var add_to_cart_key = d.getTime();
  // set key id for selected
 
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      const newData= stores.map((result, i, store) => {
          let key = store[i][0];
          var jsonPars = JSON.parse(store[i][1]);
          if(jsonPars.selected_additions==1){
           return jsonPars;
          }else{
           
          }
        });
        try{
          //remove null and sort by header_id
          var filtered_newData = newData.filter(e => e != null).sort(function(a, b) { 
            return a.h_id - b.h_id  ||  a.h_id.localeCompare(b.h_id);
          });
           setItemStorage(add_to_cart_key.toString(),{
             'id':add_to_cart_key.toString(),
             'add_to_cart':1,
             'product_id':product_id,
             'product_name': product_name,
             'qty':current_qty,
             'add_on_price':add_on_price,
             'base_price':base_price,
             'price':final_price,
             'data':filtered_newData});
           getContent(navigation,product_name,product_category_id);
        }catch(error){}
       
      });
    });
  }else{
    Alert.alert('Missing required');
  }
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

  return (

    <SafeAreaView style={styles.container}>
      <View style={{flex:5}}>

      <SectionList
      showsVerticalScrollIndicator={false}
      sections={listData}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item,section }) =>
       <Item 
       title={item.text} 
       selected={item.checked}
       updateRow = {updateRow}
        id = {item.key}
        h_id = {item.h_id}
        d_id = {item.d_id}
        price = {item.price}
        required={section.required}
        limit = {section.max_limit}
        header = {section.title}
       />
      }
      renderSectionHeader={({section}) => (
       <RenderHeader 
       title2 = {section.title2}
        title = {section.title}
        />
      )}
    />
    </View>
    <View style={{flex:1}}>
      <View style={{flex:6,alignContent:"center"}}>

        <View style={{flex:6,alignContent:"center",alignItems:"center",flexDirection:"row"}}>
              <View style={{flex:4,flexDirection:"row-reverse",alignContent:"center",alignItems:"center"}}>
              <TouchableNativeFeedback style={styles.add_plus} onPress={() => update_price('plus')}>
                <Text style={{fontSize:18}}>+</Text>
              </TouchableNativeFeedback>
              <Text style={{color:'#4A4A4A',padding:10,fontSize: 20,}}>{current_qty}</Text>

              <TouchableNativeFeedback style={styles.add_plus} onPress={() => update_price('minus')}>
                <Text style={{fontSize:18}}>-</Text>
              </TouchableNativeFeedback>
            </View>
            <View style={{flex:2,flexDirection:"row-reverse",paddingLeft:30,alignContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:25,paddingLeft:5}}>{final_price}</Text>
            </View>
        </View>

        <View style={{flex:3,alignItems:"center",marginRight:15}}>
          <Button title="add to cart" onPress={()=>add_to_cart()}></Button>
        </View>
      </View>

    </View>
    {spinner && <CustomProgressBar />}
  </SafeAreaView>
  
  );
}

function RenderHeader({title,title2,}){
  return(
    <View style={{flexDirection:'row',alignContent:"center",alignItems:"center"}}>
     <View style={{flex:3}}>
    <Text style={{fontWeight: 'bold',fontSize:18}}>{title}</Text>
    </View>
    <Text style={{color:"gray",fontWeight: 'bold',fontSize:13,marginRight:25}}> {title2}</Text>
    </View>

  );
}
function Item ({h_id,d_id,title,selected,updateRow,id,price,required,limit,header}){
  return (
    <View  style={[
      styles.item,{marginHorizontal:15}
    ]} >
  <View style={{flex:6,flexDirection:"row",alignContent:"center",alignItems:"center"}}>
  <View style = {{flex:3}}>
  <CircleCheckBox
              checked={selected ? true :false}
              labelPosition={LABEL_POSITION.RIGHT}
              onToggle={() => updateRow(h_id,d_id,id,title,selected,required,price,limit,header)}
              label={title}
            />
  </View>
  <View style = {{flex:3,flexDirection:"row-reverse"}}>
    <View>
  <Text style={styles.title}>+ {price}</Text>
    </View>
  </View>
  </View>
  </View>
  
  );
}

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
  header: {
    fontSize: 20,

  },
  header_item: {
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize:20
  },
  
  item: {
    fontSize: 20,
    padding: 10,
  },

  title: {
    flex:3,
    fontSize: 15,
  },

  title2: {
    fontSize: 25,
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
});
