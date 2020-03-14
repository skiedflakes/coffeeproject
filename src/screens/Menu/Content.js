import React, { useState, useEffect } from 'react';
import { Text, View,Alert,StyleSheet,TouchableOpacity,ScrollView,FlatList,SafeAreaView } from 'react-native';
export default function Content({category_id}){

return (
    <View>
        <Text>{category_id}</Text>
    </View>
);
}