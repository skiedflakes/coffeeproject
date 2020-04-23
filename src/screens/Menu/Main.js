import React, { useState, useEffect } from 'react';
import { Dimensions,Image,Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Content from './Content';

const deviceWidth = Dimensions.get('window').width;

export default function Main ({route,navigation,body_content}) {
  const [menu_list, setMenu_list] = React.useState(null);
  var [content, setcontent] = React.useState(null);
  
  useFocusEffect(
    React.useCallback(() => {
      setcontent(<Content category_id={0}/>);
      fetch(global.global_url+'menu/get_all_tags.php')
            .then((response) => response.json())
                  .then((responseJson) => {
                    var data = responseJson.array_tags.map(function(item) {
                      return {
                        product_category_id: item.product_category_id,
                        product_type_name: item.product_type_name,
                        category_url: item.category_url
                      };
                    });
                     setMenu_list(data);
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
      <Text style={{color:'#ffff',alignSelf:'center',marginLeft:20,fontSize:20}}>Menu</Text>
      <Entypo name="chevron-small-down" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
    </View>
    </View>
    <View style={styles.body}>
    <View style={{  flexDirection: 'row',alignContent:"center",alignItems:"center"}} >
        {/* <Text>{user}</Text> */}
        <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            style={{alignContent:"center",margin:2}}
            data={menu_list}
            renderItem={
              ({ item }) => 
              <Item
                navigation={navigation}
                title={item.product_type_name} 
                product_category_id={item.product_category_id} 
                image_url ={item.category_url}
                />
              }
            keyExtractor={item => item.product_category_id.toString()}
        />
    </View>     
      {/* {content} */}

    </View>
    </View>
  );
}


function RowItem ({navigation,title,product_category_id}) {
  return (
      <TouchableOpacity onPress={() => getContent(navigation,title,product_category_id)}>
          <View style={styles.item}>
            <View style={{flex:3,flexDirection:'row',alignItems:"center"}}>
            <MCI name="food" size={25} color={"#393737"}/>
              <Text style={styles.title}>{title}</Text>
            </View>
           
              <MaterialIcons style={{alignSelf:'center'}} name="keyboard-arrow-right" size={25} color={"#393737"}/>
          </View>
      </TouchableOpacity>
  );
}


function Item({navigation,title,product_category_id,image_url}) {
  
  return (
    <TouchableOpacity onPress={() => 
    {
      navigation.navigate("Content",{title,product_category_id});
    }}>
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
              <View style={{width:deviceWidth/2.5,flex:3,flexDirection:'row-reverse',marginTop:5}}>
              </View>
              </View>
          </View>
      </View>
    </TouchableOpacity>
  );
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
