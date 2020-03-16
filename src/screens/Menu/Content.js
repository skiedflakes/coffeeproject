import React, { useState, useEffect } from 'react';
import { Text, View,Image,StyleSheet,TouchableOpacity,Dimensions,FlatList,SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const deviceWidth = Dimensions.get('window').width;

export default function Content({content_data}){
console.log.apply(content_data)
return (
    <View>
    <FlatList
            style={{alignContent:"center",alignSelf:"center"}}
            numColumns={2}
            data={content_data}
            renderItem={
              ({ item }) => 
              <Item title={item.product_name} product_id={item.product_id} />
              }
            keyExtractor={item => item.product_id.toString()}
        />
    </View>
);
}

function Item({ id, title, selected, onSelect }) {
    return (
    //     <TouchableOpacity
    //         onPress={() => null}
    //         style={
    //         { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' }
    //         }
    //     >
    //          <Image style={{flex: 1}} resizeMode='cover' source={{ uri:'http://192.168.1.105/cafeproject/assets/product_image/test.jpeg'}}></Image>
    //     <Text>{title}</Text>
    //   </TouchableOpacity>

<TouchableOpacity>
<View style={{
    backgroundColor:'#ffff',
    flex:6,
    margin:5,
    alignContent:"center",

}}>
<Image style={{width: deviceWidth / 2,
    height: deviceWidth / 2, alignSelf: 'center' }} resizeMode='contain' source={{ uri: 'http://192.168.1.105/cafeproject/assets/product_image/test.jpeg' }}></Image>
<Text>{title}</Text>
</View>
</TouchableOpacity>

    );
  }