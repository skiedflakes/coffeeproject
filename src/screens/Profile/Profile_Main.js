import React, { useState, useEffect,} from 'react';
import { StyleSheet,Alert, Text, View,TouchableOpacity,ScrollView,Image,BackHandler,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
//import components
import { useFocusEffect } from '@react-navigation/native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


export default function Profile_Main({route,navigation}) {
    var [name,set_name] = useState('');
    var [user_id,setuser_id] = useState(''); 
    var [user_type_id,setuser_type_id] = useState(''); 

    useFocusEffect(
        React.useCallback(() => {
          
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                      let key = store[i][0];
                      var jsonPars = JSON.parse(store[i][1]);
                      if(jsonPars.user_details==1){
                        setuser_id(jsonPars.user_id);
                        set_name(jsonPars.name);
                        setuser_type_id(jsonPars.user_type_id);
                      }else{
                      }
                    });
                  });
                });
        }, [])
      );

    return (
        <View style={{flex:6,backgroundColor: '#ffff',}}>
                            <View style={{flex:6,backgroundColor: '#ffff',}}>
                            <View style={{flex:1.3,backgroundColor: '#3490DD',}}>
                            <View style={{ flexDirection:'row-reverse',padding:5}} >
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Icon name="comments" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Icon name="cart-plus" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
                            </TouchableOpacity>
                            </View>
                            <View style={{  flexDirection: 'row', padding:10,}} >
                                <View style={{ flexDirection: 'row',flex:2, marginLeft:10}}>
                                <Icon name="user-circle" size={40} color={"#ffff"}/>
                      
                              <Text style={{marginLeft:20,fontSize:25,color:"#ffff"}}>{name}</Text>
                                </View>
                                 {user_id < 0?                                                                  
                                            <View style={{ flexDirection: 'row', alignItems:'stretch'}} >
                                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                            <View style={styles.button2}  >
                                            <Text style={styles.buttonText2}>Log In</Text>      
                                            </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                            <View style={styles.button1}>
                                            <Text style={styles.buttonText1}>Sign-up</Text>
                                            </View>
                                            </TouchableOpacity>
                                            </View>: null }
                            </View>
                            </View>
                              <View style={{flex:4.7,backgroundColor: '#DADCDC'}}>
                              <ScrollView style={{marginTop:5}}>
                              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                      <View style={styles.scrollViews}>
                                          <View style={styles.scrollViews_1}>
                                              <Icon name="tasks" size={20} color={"#4D4E4F"} style={styles.scrollIcon}/>
                                              <Text style={styles.scrollText}>Transaction Logs</Text>
                                          </View>
                                          <View style={styles.scrollViews_2} >
                                              <Icon name="caret-right" size={20} color={"#4D4E4F"} style={styles.scrollIcon} />
                                          </View>
                                      </View>
                                      
                                  </TouchableOpacity>
                  
                                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                      <View style={styles.scrollViews}>
                                          <View style={styles.scrollViews_1}>
                                              <Icon name="shopping-bag" size={20} color={"#269FE3"} style={styles.scrollIcon}/>
                                              <Text style={styles.scrollText}>My Purchases</Text>
                                          </View>
                                          <View style={styles.scrollViews_2} >
                                              <Icon name="caret-right" size={20} color={"#4D4E4F"} style={styles.scrollIcon} />
                                          </View>
                                      </View>
                                  </TouchableOpacity>
                  
                                  <TouchableOpacity >
                                      <View style={styles.scrollViews}>
                                          <View style={styles.scrollViews_1}>
                                              <Icon name="heart" size={20} color={"#F5A2BD"} style={styles.scrollIcon}/>
                                              <Text style={styles.scrollText}>Favorites</Text>
                                          </View>
                                          <View style={styles.scrollViews_2} >
                                              <Icon name="caret-right" size={20} color={"#4D4E4F"} style={styles.scrollIcon} />
                                          </View>
                                      </View>
                                  </TouchableOpacity>
                  
                                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                      <View style={styles.scrollViews}>
                                          <View style={styles.scrollViews_1}>
                                              <Icon name="tags" size={20} color={"#BF1818"} style={styles.scrollIcon}/>
                                              <Text style={styles.scrollText}>My Vouchers</Text>
                                          </View>
                                          <View style={styles.scrollViews_2} >
                                              <Icon name="caret-right" size={20} color={"#4D4E4F"} style={styles.scrollIcon} />
                                          </View>
                                      </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                      <View style={styles.scrollViews}>
                                          <Icon name="sign-out" size={20} color={"#4D4E4F"} style={styles.scrollIcon}/>
                                          <Text style={styles.scrollText}>Sign Out</Text>
                                      </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  
                                      <View style={styles.scrollViews}>
                                      <Icon name="gear" size={20} color={"#4D4E4F"} style={styles.scrollIcon}/>
                                          <Text style={styles.scrollText}>Account Settings</Text>
                                      </View>
                            </TouchableOpacity>
                        </ScrollView>
                </View>
            </View>
        </View>
    );
}
 


function onpress(){
    AsyncStorage.clear();
    Alert.alert('Simple Button pressed');
}

function signed_out(navigation){
    const removeItems  = async (key) => {
        console.log('main == ',key)
        await AsyncStorage.removeItem(key);
      }
      
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              let key = store[i][0];
              var jsonPars = JSON.parse(store[i][1]);
              if(jsonPars.user_details==1){
                removeItems(key)
              }else{
              }
            });
          });
        });
    BackHandler.exitApp();
}

const styles = StyleSheet.create({
    button1: {
      alignItems: 'center',
      backgroundColor: '#197CC8',
      borderWidth:1.5,
      borderRadius:2,
      borderColor:"#ffff",
      marginLeft:10
    },
    button2: {
      alignItems: 'center',
      backgroundColor: '#ffff',
      borderWidth:1.5,
      borderRadius:2,
      borderColor:"#197CC8",
      marginLeft:10
    },
    buttonText1: {
      textAlign: 'center',
      padding: 10,
      color: '#ffff'
      
    },

    buttonText2: {
      textAlign: 'center',
      padding: 10,
      color: '#197CC8'
    },

    scrollViews: {
        backgroundColor: '#E5E7E7',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderColor:"#474949",
        flex:6,
        flexDirection:"row",
        alignContent:"center"
      },

      scrollViews_1:{
        flex:2,
        flexDirection:"row", 
        alignItems:"center"},

      scrollViews_2: {
        flexDirection:"row",
        alignItems:"center",
        paddingRight:20
    },
    
    scrollText: {
        padding: 10,
        color: '#474949'
      },
    
      scrollIcon:{
          marginLeft:10,
      }
  })
  