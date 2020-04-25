import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Alert
} from "react-native";

import { useFocusEffect } from '@react-navigation/native';
const DATA = [
  {
    title: "Main dishes",
            current_checked:0,
            required:2,
    data: [{key:'0.1',text:"Pizza",checked:false}, {key:'0.2',text:"Burger",checked:false}]
  },
  {
    title: "Desserts",
    current_checked:0,
    required:1,
    data: [{key:'1.1',text:"Black Sambo",checked:false}, {key:'1.2',text:"Ice Cream",checked:false}]
  }
];

import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 

const Item = ({title,selected,updateRow,id,required}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <CircleCheckBox
            checked={selected ? true :false}
            labelPosition={LABEL_POSITION.RIGHT}
            onToggle={() => updateRow(id,title,selected,required)}
          />
  </View>
);

export default function Content_details () {
  const [listData, setListData] = useState('');


  useFocusEffect(
    React.useCallback(() => {

     const formData = new FormData();
    formData.append('product_category_id',2);
    formData.append('product_id',2);
    fetch(global.global_url+'menu/get_dropdown_details_v2.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        },
        body: formData
    }).then((response) => response.json())
          .then((responseJson) => {
            var data = responseJson.all_data.map(function(item) {
         
              return {
                header_id: item.header_id,
                title: item.title,
                current_checked:0,
                required: item.required,
                data:item.data,
              };
            });
            
            console.log(data);
            setListData(data);

            }).catch((error) => {
            console.error(error);
          });


      return () => {
      };
    }, [])
  );


  const updateRow = (rowKey,myname,checked,required) => {
    // console.log([true,false,true,false,true].filter(v => v).length);
    const [section] = rowKey.split('.');
    const newData = [...listData];
    const prevIndex = listData[section].data.findIndex(
        item => item.key === rowKey
    );

    if(required==1){ // if one required

      //set all to false
      newData[section].data.map(function(item,index) {
        newData[section].data.splice(index, 1,{key:item.key,text:item.text,checked:false});
      });

      //set only one true
      newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked});

    }else{ //if two or more required
      
      newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:!checked});
      var result = newData[section].data.filter(obj => {
        return obj.checked == true
      })
      
      if(result.length>required){ // check if more than required
        newData[section].data.splice(prevIndex, 1,{key:rowKey,text:myname,checked:checked}); // set to default
      }
    }

    setListData(newData);
};


  return(
    <SafeAreaView style={styles.container}>
    <SectionList
      sections={listData}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item,section }) =>
       <Item 
       title={item.text} 
       selected={item.checked}
       updateRow = {updateRow}
        id = {item.key}
        required={section.required}
       />
      }
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
