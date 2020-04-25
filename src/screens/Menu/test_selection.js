import React, { useState, useRef } from 'react';
import {ScrollView, Button, Text, View,Alert,StyleSheet,TouchableOpacity,SectionList,TextInput,CheckBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';


import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 

export default function test_selection ({navigation,route}) {
    const {product_id,product_category_id,content_data } = route.params;
    const[data,setData] = useState(content_data);


    const onSelect = useRef(id => {
      const newData = [
        ...data.map(mitem =>{ 
       
          if(id[1]== mitem.dropdown_header_id){
            
            const newData2 = [...mitem.data.map(item =>{ 
                if(id[0]==item.details_id){
                  return{
                    ...item,
                    selected: !item.selected,
                  };
                }else{
                  return item;
                }
                
              })]

                console.log(newData2);
                  return{
                    ...mitem,
                    data:newData2
                  };
          }
          return mitem;

      
        }),
      ];
      setData(newData);
    });


    
  return (

    <View style={{flex:1,flexDirection:'column'}}>
   <SectionList
          //all data
          sections={data}

          //content
          renderItem={
            ({item,section}) =>
            <Items 

            name={item.name} 
            price = {item.price} 
            required = {section.required}
            id = {item.details_id}
            id2 = {item.details_dropdown_header_id}
            selected={item.selected}
            onSelect={onSelect.current}
            ></Items>
          }
          keyExtractor={item => item.details_id}
          extraData={item => item.selected}

          //header
          renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title} required: {section.required}</Text>
          )}

          //at the end of the list
          ListFooterComponent  ={
            () => (
              <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "Special instructions"
                     placeholderTextColor = "#9a73ef"
                     autoCapitalize = "none"
               />)
          }

   
        >
    </SectionList>

    <Button title="- 1 + Add to Cart"></Button>
       

  </View>
  );
}

function Items({name,price,required,id,id2,onSelect,selected}){
    var ids = [id,id2];

    return (
      <TouchableOpacity
        onPress={() =>onSelect(ids)}
        style={[
          styles.item,
          { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
        ]}
      >
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    );
  
}


// function Items({name,price,required,id,onSelect,selected}){

//   const toggleSwitch = () => null

// return(
// <TouchableOpacity onPress={() => onSelect(id)}

// style={[
//   styles.item,
//   { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
// ]}>
//     <View style={{padding:10}}
    
//     >
//       <CircleCheckBox
//           checked={true}
//           onToggle={toggleSwitch}
//           labelPosition={LABEL_POSITION.RIGHT}
//           label={name+"   +"+required}
//       ></CircleCheckBox>
//     </View>
// </TouchableOpacity>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#F55145',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});