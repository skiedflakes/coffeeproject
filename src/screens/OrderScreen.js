import * as React from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from "react-native-maps";
import AsyncStorage from '@react-native-community/async-storage';

export default class OrderScreen extends React.Component {
    render() {
  return (
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
        <Marker
            style={{height: 10, width:10 }}
            coordinate={{  latitude: 14.6010,
            longitude: 120.9842, }}
            tracksViewChanges={false}
        />

        <Marker
            style={{height: 10, width:10 }}
            coordinate={{  latitude: 14.602,
            longitude: 120.9842, }}
            tracksViewChanges={false}
        />

        <Marker
            style={{height: 10, width:10 }}
            coordinate={{  latitude: 14.605,
            longitude: 120.988, }}
            tracksViewChanges={false}
        />
        <Marker
            style={{height: 10, width:10 }}
            coordinate={{  latitude: 14.609,
            longitude: 120.982, }}
            tracksViewChanges={false}
        />
        <Marker
            style={{height: 10, width:10 }}
            coordinate={{  latitude: 14.600,
            longitude: 120.984, }}
            tracksViewChanges={false}
        />
    
    </MapView>


  </View>
  <View style={{padding:20,marginTop:60}}>
  </View>
  </View>
  </>
  );
}}

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
