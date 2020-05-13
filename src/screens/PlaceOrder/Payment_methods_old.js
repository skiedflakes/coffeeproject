import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  Alert,
  Button,
  Picker
} from "react-native";

export default function Payment_methods ({navigation,route}) {
const {TotalCartPrice,Draglatitude,Draglongitude,distance,duration} = route.params;
const [selectedValue, setSelectedValue] = useState("Payment Type");
const selectedPayment = (itemValue) =>{
  setSelectedValue(itemValue)
  if(itemValue=="GCASH"){
    navigation.navigate("GcashScreen");
  }else if(itemValue=="Google Pay"){
    navigation.navigate("GooglepayScreen");
  }
}

useFocusEffect(
  React.useCallback(() => {
  //ASYNC STORAGE REMOVE ALL PRE-SELECTED ADDITIONS
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          var jsonPars = JSON.parse(store[i][1]);
          if(jsonPars.selected_additions==1){
            removeItems(key)
          }else{
          
          }
        
        });
      });
  });

  // LOAD SELECTIONS
  setSpinner(true)
  const formData = new FormData();
  formData.append('product_category_id',product_category_id);
  formData.append('product_id',product_id);

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
            var mymessage = '';

            if(item.required==0&&item.max_limit==0){ //dont show optional any
              mymessage= 'optional choose any';
            }else if(item.required ==1 && item.max_limit == 1){ //show limit and required
              mymessage= 'required '+ item.required;
            }else if(item.required == item.max_limit){ //show limit and required
              mymessage= 'required '+ item.required+ ' optional limit '+item.max_limit;
            }else if(item.required==0&& item.max_limit>0){ //show max
              mymessage= 'optional max '+ item.max_limit;
            }else {
            }

            return {
              header_id: item.header_id,
              title: item.title,
              title2: mymessage,
              current_checked:0,
              required: item.required,
              max_limit: item.max_limit,
              data:item.data,
            };
          }); 

         
          setListData(data);
          var filtered_data = data.filter(e => e != null);
          var total_required = filtered_data.map(item => item.required).reduce((prev, next) => +prev + +next);
          setrequired_check(total_required);

          setSpinner(false)

          }).catch((error) => {
          console.error(error);
          setSpinner(false)
        });

    return () => {
    };
  }, [])
);

return (
  <View style={styles.container}>

      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 250,alignItems:"center",alignItems:"center",alignSelf:"center"}}
        onValueChange={(itemValue, itemIndex) => selectedPayment(itemValue)}
      >
        <Picker.Item label="Payment Type" value="Payment Type" />
        <Picker.Item label="GCASH" value="GCASH" />
        <Picker.Item label="Google Pay" value="Google Pay" />
        <Picker.Item label="Apple Pay" value="Apple Pay" />
    </Picker>

      <Button onPress={() => navigation.navigate("Place Order",{TotalCartPrice,Draglatitude,Draglongitude,distance,duration})} title="Confirm"></Button>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#34a853',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginVertical: 8,
  },
  direct: {
    backgroundColor: '#db7d35',
  },
  stripe: {
    backgroundColor: '#556cd6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
})