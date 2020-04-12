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

export default function Content({navigation,route}){
var {title,product_category_id } = route.params;
const [current_list_data, setcurrent_list_data] = useState('');

useFocusEffect(
  React.useCallback(() => {
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

function Item({product_name,navigation, product_id, title,price,image_url,product_category_id}) {
  
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
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborumrr
            </Text>
          </ViewMoreText>
            <View style={{width:deviceWidth/2.5,flex:3,flexDirection:'row-reverse',marginTop:5}}>
                <Text style={{  fontSize: 18,}}>P {price}</Text>
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
})
