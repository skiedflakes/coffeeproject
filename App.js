/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from "react-native-maps";
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Alert,
  FlatList,
  Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  state ={
    data:[]
  }

  fetchData= async()=>{
    const response = await fetch('http://192.168.1.166:4547/users');
    const users = await response.json();
    this.setState({data: users});

  }
componentDidMount(){
  this.fetchData();
}

  render(){
    return(
      <>
        <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <View  style={styles.container}>

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: 14.5995,
            longitude: 120.9842,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
       
          }}
        >
            <Marker
            style={{height: 10, width:10 }}
                 coordinate={{  latitude: 14.62,
                  longitude: 120.9842, }}
                tracksViewChanges={false}
            >

            </Marker>

            {/* <Marker
              coordinate={{  latitude: 14.60,
              longitude: 120.9842, }}
              tracksViewChanges={false}
              title="test aron"
              icon={require('./assets/profile.png')}
            /> */}
{/* test */}
<MapView.Marker   
coordinate={{  latitude: 14.60,
              longitude: 120.9842, }}
title="Aron"
onPress={() => Alert.alert( 'Delivery',
'Update Delivery Status',
[
 
  {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
  {text: 'Finish Delivery', onPress: () => console.log('OK Pressed')},
],
{cancelable: false},)}>
  
  <View style={styles.circle}>
  
  <Image source = {{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}
   style={styles.circle}
   />
  </View></MapView.Marker>


<MapView.Marker   
coordinate={{  latitude: 14.60,
              longitude: 120.9842, }}
title="Aron"
onPress={() => Alert.alert( 'Delivery',
'Finish Delivery',
[
 
  {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
  {text: 'OK', onPress: () => console.log('OK Pressed')},
],
{cancelable: false},)}>
  
  <View style={styles.circle}>
  
  <Image source = {{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}
   style={styles.circle}
   />
  </View></MapView.Marker>

   <MapView.Marker
  coordinate={{  latitude: 14.63,
              longitude: 120.9842, }}
  title="test circle">
  <View >
    <Image source = {{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}
    style={styles.circle}
    />
  </View></MapView.Marker>

  <MapView.Marker
  coordinate={{  latitude: 14.635,
              longitude: 120.9842, }}
  title="test circle">
  <View >
    <Image source = {{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}
    style={styles.circle}
    />
  </View></MapView.Marker>


      <MapView.Circle
              center={{
                latitude: 14.6010,
                longitude: 120.9842,
              }}
              radius={1000}
              strokeWidth={1}
              strokeColor="#3399ff"
              fillColor="#80bfff"
            />
        </MapView>
      </View>
      <View style={{padding:20,marginTop:60}}>
      <Text>Welcome</Text>

       {/* <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>

       <View style={{backgroundColor:'#abc123',padding:2,margin:2}}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>{item.name}</Text>
         </View>

       }

       /> */}
        
      </View>
     
      </View>

      </>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red',
},
pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
},
image:{ height:30, width:30
   
}


 });


export default App;
