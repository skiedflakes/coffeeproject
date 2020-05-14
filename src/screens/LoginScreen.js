import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default function LoginScreen({navigation}){

  const [username, u_onChangeText] = React.useState("");
  const [password, p_onChangeText] = React.useState("");
  return(
      <View style={styles.Layout}>
        <View style={styles.loginLayout}>
        <Text style={{textAlign:"center", marginBottom: 10}}>Cafe Project</Text>
        <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Email"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText={text => u_onChangeText(text)}
              username={username}/>
        <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Password"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              secureTextEntry = {true}
              password ={password}
              onChangeText={text => p_onChangeText(text)}/>
          <Button
            title="Login"
            onPress={() => loginFetch(username,password,navigation)}
          />
        </View>
      </View>
      );
  }

const loginFetch = (userName,password,navigation) =>{

  
   const setItemStorage = async (key,value) => {
        try {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          // Error saving data
        }
      };


  const formData = new FormData();
  formData.append('username',userName);
  formData.append('password',password);

  fetch(global.global_url+'login.php', {
   
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: formData
  }).then((response) => response.json())
        .then((responseJson) => {

          const first = responseJson.login_response[0]
          console.log(first);
          if(first.status == 'success'){
            //call function multiset to save data to async storage
            setItemStorage('user_details',{'user_details':1,'user_id':first.user_id,'name': first.name,'user_type_id':first.user_type_id})
    
            global.g_user_id = first.user_id;
            global.g_name = first.name;
            global.g_user_type_id = first.user_type_id;
            // navigation.navigate('Profile_Main', {
            //   name: first.name,
            //   user_id:first.user_id,
            //   user_type_id:first.user_type_id,
            // })

            navigation.goBack()

          } else {
            Alert.alert('failed !');
          }


        }).catch((error) => {
          console.error(error);
        });
  };

const styles = StyleSheet.create({
  Layout:{
    backgroundColor: '#feebe4',
    flex: 1,
    justifyContent: "center"
  },
  loginLayout:{
    backgroundColor: '#faf9f7',
    margin: 10,
    padding: 10
  },
});
