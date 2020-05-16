import React, { useState, useEffect } from 'react';
import { Dimensions,Image,Text,Modal, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import { ActivityIndicator } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Content from './Content';
import { Avatar, Badge, withBadge } from 'react-native-elements'

const deviceWidth = Dimensions.get('window').width;

export default function Main ({route,navigation,body_content}) {
  const [menu_list, setMenu_list] = React.useState(null);
  var [content, setcontent] = React.useState(null);
  
  var [badge_val, setbadge_val] = React.useState(null);
  var [badge_hidden, setbadge_hidden] = React.useState(false);

  const [spinner, setSpinner] = React.useState(false);
  const [spinnerMSG, setSpinnerMSG] = React.useState("Loading");

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          const newData= stores.map((result, i, store) => {
              let key = store[i][0];
              var jsonPars = JSON.parse(store[i][1]);
              if(jsonPars.add_to_cart==1){
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

      setSpinner(true)
      setSpinnerMSG("Loading")
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

                     setSpinner(false)

                  }).catch((error) => {
                    console.error(error);
                    setSpinner(false)
      });
      return () => {
    };
    }, [])
  );

  const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible} transparent={true}>
      <View style={{ alignItems: 'center', justifyContent: 'center',flex: 1 }}>
        <View style={{ borderRadius: 10, backgroundColor: '#f0f0f0', padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '200' }}>{spinnerMSG}</Text>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
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
    {spinner && <CustomProgressBar />}
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
              style={{width: deviceWidth / 2, height: deviceWidth / 2, alignSelf: 'center'}} 
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
      badgeStyle: { 
        position: 'absolute',
        top: 0,
        right: -4 
      },
})
