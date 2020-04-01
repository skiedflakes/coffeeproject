import React, { useState, useRef } from 'react';
import {ScrollView, Button, Text, View,Alert,StyleSheet,TouchableOpacity,SectionList,TextInput,CheckBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';


import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 

export default function Content_details ({navigation,route}) {
    const {product_id,product_category_id,content_data } = route.params;
    const[data,setData] = useState(content_data);

    //callback state
    const onSelect = useRef(id => {
      console.log('L62 id == ',id);
    
      const newData = [
        ...data.map(mitem =>{
       
         const formatted_array = mitem.data.map(item =>{
            if (id == item.details_id){
              console.log(item.selected);
              return{
                ...item,
                selected: !item.selected,
              };
            }else{
              return{
                ...item,
                
              };
            }
         
          })

          return{
            ...mitem,
            data: formatted_array,
          };
        }),
      ];
      

      setData(newData);

      // newData.map(mitem =>{
  
      //   mitem.data.map(item =>{
      //     console.log('L63 mew data == ',item.selected);
      //   })
      
      // })
  
    });
  
    
  return (

    <View style={{flex:1,flexDirection:'column'}}>
   <SectionList
          //all data
          sections={data}

          //content
          renderItem={
            ({item,section}) =>
            <ItemPure 

            name={item.name} 
            price = {item.price} 
            required = {section.required}
            id = {item.details_id}
            selected={item.selected}
            onSelect={onSelect.current}
            ></ItemPure>
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
class ItemPure extends React.PureComponent {
  render(){
    return (
      <TouchableOpacity
        onPress={() => this.props.onSelect(this.props.id)}
        style={[
          styles.item,
          { backgroundColor: this.props.selected ? '#6e3b6e' : '#f9c2ff' },
        ]}
      >
        <Text style={styles.title}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }

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