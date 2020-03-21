import React, { useState, useEffect } from 'react';
import { Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFocusEffect } from '@react-navigation/native';

//import content
import Content from './Content';

export default function Main ({route,navigation,body_content}) {
  const [menu_list, setMenu_list] = React.useState(null);
  var [content, setcontent] = React.useState(null);
  
  useFocusEffect(
    React.useCallback(() => {
      setcontent(<Content category_id={0}/>);
      // Do something when the screen is focused
      const fetchUser = async () => {
            fetch('http://192.168.1.105/cafeproject/tags_get_all.php')
            .then((response) => response.json())
                  .then((responseJson) => {
                    var data = responseJson.product_data.map(function(item) {
                      return {
                        product_category_id: item.product_category_id,
                        product_type_name: item.product_type_name
                      };
                    });
                     setMenu_list(data);
                  }).catch((error) => {
                    console.error(error);
                  });
      }
      fetchUser();
      return () => {
      };
    }, [])
  );

function RowItem ({ title,product_category_id}) {
    return (
        <TouchableOpacity onPress={() => getContent(title,product_category_id)}>
            <View style={styles.item}>
              <View style={{flex:3,flexDirection:'row'}}>
              <MCI name="food" size={25} color={"#393737"}/>
                <Text style={styles.title}>{title}</Text>
              </View>
             
                <MaterialIcons style={{alignSelf:'center'}} name="keyboard-arrow-right" size={25} color={"#393737"}/>
            </View>
        </TouchableOpacity>
    );
}

function getContent(title,product_category_id){
  fetch('http://192.168.1.105/cafeproject/menu/get_menu_details.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_category_id: product_category_id
    })
  }).then((response) => response.json())
        .then((responseJson) => {
          var data = responseJson.product_data.map(function(item) {
            return {
              product_id: item.product_id,
              product_name: item.product_name,
              price: item.price
            };
          });
          console.log(data);

          navigation.navigate("Content",{title,content_data:data});
          // setcontent(<Content content_data={data}/>);
        }).catch((error) => {
          console.error(error);
        });
  }
  return (
    <View style={styles.main}>
    <View style={styles.header} >
    <View style={{  flexDirection: 'row', padding:2,}} >
        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <Icon name="comments" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <Icon name="cart-plus" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
        </TouchableOpacity>
    </View>
    <View style={{ flex:6,  flexDirection: 'row', padding:2,}} >
      <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>Menu</Text>
      <Entypo name="chevron-small-down" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
    </View>
    </View>
    <View style={styles.body}>
    <View style={{  flexDirection: 'row',alignContent:"center",alignItems:"center"}} >
        {/* <Text>{user}</Text> */}
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{alignContent:"center",margin:2}}
            data={menu_list}
            renderItem={
              ({ item }) => 
              <RowItem
               title={item.product_type_name} product_category_id={item.product_category_id} />
              }
            keyExtractor={item => item.product_category_id.toString()}
        />
    </View>     
      {/* {content} */}

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
        flexDirection:'row',
        paddingLeft:10,
        backgroundColor:'#ffff',
        padding:5,
      },
      title: {
        color:'#4A4A4A',
        padding:5,
        fontSize: 18,
      },
})
