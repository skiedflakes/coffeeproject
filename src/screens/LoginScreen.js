import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';

export default class  LoginScreen extends React.Component{
    render(){
        return(
        <View style={styles.Layout}>
          <View style={styles.loginLayout}>
          <Text style={{textAlign:"center", marginBottom: 10}}>Coffe Project</Text>
          <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {(text) => this.userName = text}/>
          <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {(text) => this.password = text}/>
            <Button
              title="Login"
              onPress={() => this.loginFetch()}
            />
          </View>
        </View>
        );
    }

    loginFetch(){
      fetch('http://192.168.1.105/schednotes_2020/login_test.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.userName,
          password: this.password
        })
      }).then((response) => response.json())
            .then((responseJson) => {
  
              const first = responseJson.login_response[0]
        
              if(first.status == 'success'){
                //this.props.navigation.navigate('Home')
                Alert.alert('success !');
              } else {
                Alert.alert('failed !');
              }
  
            }).catch((error) => {
              console.error(error);
            });
      }
}

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
