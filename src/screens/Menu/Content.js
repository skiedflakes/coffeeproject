import React, { useState, useEffect } from 'react';
import { Text, View,Image,TouchableOpacity,Dimensions,FlatList,Alert,StyleSheet,Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


//icons
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


//etc
import ViewMoreText from 'react-native-view-more-text';
const deviceWidth = Dimensions.get('window').width;
import { Avatar, Badge, withBadge } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

export default function Content({navigation,route}){
var {title,product_category_id } = route.params;
const [current_list_data, setcurrent_list_data] = useState('');

//badge
var [badge_val, setbadge_val] = React.useState(null);
var [badge_hidden, setbadge_hidden] = React.useState(false);

useFocusEffect(
  React.useCallback(() => {

    //check cart
AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
    const newData= stores.map((result, i, store) => {
        let key = store[i][0];
        var jsonPars = JSON.parse(store[i][1]);
        if(jsonPars.add_to_cart==1){
          // setItemStorage(n.toString(),{'id':n.toString(),'selected_additions':0,'add_to_cart':1,'product_id':product_id,'product_name': product_name,'qty':current_qty,'price':current_price})
            return jsonPars;
        }
      });
      try{
        var filtered_newData = newData.filter(e => e != null);
   
        if(filtered_newData.length==0){
          setbadge_hidden(true);
        }else{
          
          setbadge_val(filtered_newData.length);
          setbadge_hidden(false);
        }
      }catch(error){}
    });
});

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
                product_details: item.product_details,
                image_url: item.image_url
              };
            });
            setcurrent_list_data(data);
          
          }).catch((error) => {
            console.error(error);
          });

    return () => {
    };
  }, [])
);


return (
  <View style={styles.main}>
    <View style={styles.header} >
    <View style={{  flexDirection: 'row', padding:2,}} >
        <TouchableOpacity onPress={() =>   navigation.navigate('Cart')}>
        <Icon name="cart-plus" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
        {badge_hidden ? null : (<Badge value={badge_val} status="error" containerStyle={styles.badgeStyle}/>)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <Icon name="comments" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
        </TouchableOpacity>

    </View>
    
    <View style={{ flex:6,  flexDirection: 'row', padding:2,}} >
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
        <AntDesign name="arrowleft" size={25} color={"#ffff"} style={{marginLeft:10}}/>
        </TouchableOpacity>
        <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>{title}</Text>
    </View>
    </View>
    <View style={styles.body}>
    <View style={{  flexDirection: 'row',alignContent:"center",alignItems:"center"}} >
        {/* <Text>{user}</Text> */}
        <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={current_list_data}
            renderItem={
              ({ item }) => 
              <Item 
              product_name = {item.product_name}
              navigation={navigation} 
              title={item.product_name} 
              product_id={item.product_id} 
              price={item.price} 
              image_url={item.image_url}
              product_details={item.product_details}
              product_category_id ={product_category_id} />
              }
            keyExtractor={item => item.product_id.toString()}
           
        />
    </View>     
      {/* {content} */}

    </View>
    </View>
 
);
}

function Item({product_name,navigation, product_id, title,price,image_url,product_category_id,product_details}) {
  
    return (
<TouchableOpacity onPress={() => open_content_details(product_name,navigation,product_id,price,product_category_id)}>
    <View style={{
        backgroundColor:'#ffff',
        paddingTop:5,
        padding:1
    }}>
        <Image 
            style={{width: deviceWidth / 2.06, height: deviceWidth / 2, alignSelf: 'center'}} 
            resizeMode='contain' 
            source={{ uri: global.global_url+image_url}}>
        </Image>
        
        <View style={{flex:6,flexDirection:'column',padding:5,
          borderBottomWidth :1,
          borderBottomColor: '#B3B2B2',}}>
            <View style={{width:deviceWidth/2.5,flex:3,flexDirection:'row'}}>
                <Text style={{fontWeight:"bold",fontSize:18}}>{title}</Text>
                </View>
          
            <View style={{width:deviceWidth/2.5}}>
            <ViewMoreText
            numberOfLines={3}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
            >
              <Text>{product_details}</Text>
          </ViewMoreText>
            <View style={{width:deviceWidth/2.5,flex:3,flexDirection:'row-reverse',marginTop:5}}>
            </View>
            </View>
        </View>
    </View>
</TouchableOpacity>


    );
 
}

function renderViewMore(onPress){
    return(
      <Text style={{color:"#616060" ,fontWeight:"bold"}} onPress={onPress}>Read more ▼</Text>
    )
  }
 function renderViewLess(onPress){
    return(
      <Text style={{color:"#616060",fontWeight:"bold"}} onPress={onPress}>Hide ▲</Text>
    )
  }

  function open_content_details(product_name,navigation,product_id,price,product_category_id){


    const formData = new FormData();
    formData.append('product_category_id',product_category_id);
    
    
    fetch(global.global_url+'menu/get_dropdown_details.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        },
        body: formData
    }).then((response) => response.json())
          .then((responseJson) => {
            var data_header = responseJson.header.map(function(item) {
              return {
                header_id: item.header_id,
                header_name: item.name,
                required: item.required,
             
              };
            });

            var data_details = responseJson.details.map(function(item) {
              return {
                header_id: item.header_id,
                details_id: item.details_id,
                details_name: item.name,
                price:item.price,
                selected:false
              };
            });
       
            navigation.navigate("Content Details",{product_name,price,product_id,product_category_id,data_header:data_header,data_details:data_details});
          }).catch((error) => {
            console.error(error);
          });

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
      padding:10,
      fontSize: 18,
    },
    badgeStyle: { 
      position: 'absolute',
      top: 0,
      right: -4 
    },
})
