import React, { useState, useEffect } from 'react';
import { Text, View,Image,TouchableOpacity,Dimensions,FlatList,Alert,StyleSheet,Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const deviceWidth = Dimensions.get('window').width;
import ViewMoreText from 'react-native-view-more-text';

export default function Content({navigation,route}){
var { content_data,title,user_type_id } = route.params;

navigation.setOptions({ title: title });
console.log.apply(content_data)
return (
    <View style={{flexDirection: 'column',flex: 1}}>
        <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={content_data}
            renderItem={
              ({ item }) => 
              <Item title={item.product_name} product_id={item.product_id} price={item.price} image_url={item.image_url} />
              }
            keyExtractor={item => item.product_id.toString()}
           
        />
        <Button title="View your cart"></Button>
    </View>
);
}

function Item({ id, title,price,image_url, selected, onSelect }) {
 
    return (
<TouchableOpacity onPress={() =>  Alert.alert('Simple Button pressed')}>
    <View style={{
        backgroundColor:'#ffff',
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.05)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 3,
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 1,
      backgroundColor: '#fff',
    },
    cardText: {
      fontSize: 14,
    },
  });