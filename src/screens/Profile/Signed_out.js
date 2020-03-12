import React, { useState, useEffect } from 'react';
import { Button,Alert, Text, View,TouchableOpacity,ScrollView,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


export default function Signed_out({navigation}){
    return(
    <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center',flexDirection:"column"}}>
    <Text>Sign out Success</Text>
    <Button title='Ok' onPress={()=> navigation.navigate('Profile_Main', {
              name: '',user_id:'',user_type_id:'',
            })}/>
    
    </View>
    );
}
