import * as React from 'react';
import { StyleSheet,Button, Text, View,TouchableOpacity,ScrollView,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Main extends React.Component {
    render() {
  return (
      <View style={{flex:6,backgroundColor: '#ffff',}}>
    <View style={{flex:1.3,backgroundColor: '#3490DD',}}>
      <View style={{ flexDirection:'row-reverse',padding:5}} >
      <TouchableOpacity onPress={this._onPressButton}>
      <Icon name="comments" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={this._onPressButton}>
      <Icon name="cart-plus" size={25} color={"#ffff"} style={{paddingLeft:10,paddingTop:10,paddingRight:10}}/>
      </TouchableOpacity>
    </View>
    <View style={{  flexDirection: 'row', padding:10,}} >
        <View style={{flex:2, marginLeft:10}}>
        <Icon name="user-circle" size={40} color={"#ffff"}/>
        </View>
        <View style={{ flexDirection: 'row', alignItems:'stretch'}} >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <View style={styles.button2}  >
                <Text style={styles.buttonText2}>Log In</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPressButton}>
            <View style={styles.button1}>
                <Text style={styles.buttonText1}>Sign-up</Text>
            </View>
            </TouchableOpacity>
        </View>
    </View>
  </View>
    <View style={{flex:4.7,backgroundColor: '#DADCDC'}}>
        <ScrollView style={{marginTop:5}}>
           <TouchableOpacity onPress={this._onPressButton}>
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

            <TouchableOpacity onPress={this._onPressButton}>
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

            <TouchableOpacity onPress={this._onPressButton}>
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

            <TouchableOpacity onPress={this._onPressButton}>
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

            <TouchableOpacity onPress={this._onPressButton} style={{marginTop:20}}>
                <View style={styles.scrollViews}>
                    <Icon name="sign-out" size={20} color={"#4D4E4F"} style={styles.scrollIcon}/>
                    <Text style={styles.scrollText}>Sign Out</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPressButton}>

                <View style={styles.scrollViews}>
                <Icon name="gear" size={20} color={"#4D4E4F"} style={styles.scrollIcon}/>
                    <Text style={styles.scrollText}>Account Settings</Text>
                </View>
            </TouchableOpacity>
          
        </ScrollView>
    </View>
    </View>
  );
}}

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
  