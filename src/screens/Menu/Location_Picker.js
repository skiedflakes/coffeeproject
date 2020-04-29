import * as React from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from "react-native-maps";
import AsyncStorage from '@react-native-community/async-storage';
import { getPreciseDistance } from 'geolib';

export default class Location_Picker extends React.Component {

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
        longitudeDelta: 0.0421,}}>

        <Marker
            style={{height: 10, width:10 }}
            coordinate={{  latitude: 14.6010,
            longitude: 120.9842, }}
            tracksViewChanges={false}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e.nativeEvent.coordinate)}
        />
    
    </MapView>     

  </View>
  <View style={{padding:20,marginTop:60}}>
  </View>
  </View>
  </>
  );
}}

onMarkerDragEnd = (coord) => {
    const user_lat = coord.latitude;
    const user_lng = coord.longitude;

    const delivery_lat = 14.60498536757159;
    const delivery_lng = 120.98707526922226;

    var pdis = getPreciseDistance(
        { latitude: user_lat, longitude: user_lng },
        { latitude: delivery_lat, longitude: delivery_lng }
      );
      alert(`Precise Distance ${pdis} Meter or ${pdis / 1000} KM`);
  };

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
    width: 400,
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
