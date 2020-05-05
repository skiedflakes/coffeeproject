import React,{useState,useRef} from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity, Alert,Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from "react-native-maps";
import AsyncStorage from '@react-native-community/async-storage';

export default function Location_Picker ({navigation,route}) {
  const {TotalCartPrice,latitude,longitude} = route.params;

  // STORE location
  const store_lat = 10.627794; 
  const store_lng = 122.965016;

  // user location
  const [Draglatitude, setDragLatitude] = useState(10.641707);
  const [Draglongitude, setDragLongitude] = useState(122.945301);

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const origin = {latitude: Draglatitude, longitude: Draglongitude};
  const destination = {latitude: store_lat, longitude: store_lng};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCwrEeL9t4q1kOmU4TEElsZf9nBEboe_JI';

  onMarkerDragEnd = (coord) => {
    const user_lat = coord.latitude;
    const user_lng = coord.longitude;
    setDragLatitude(user_lat);
    setDragLongitude(user_lng);
  };

  function dialogBox(navigation,TotalCartPrice,latitude,longitude,Draglatitude,Draglongitude,distance,duration){
    if(Draglatitude==''){
      alert("Please move the red marker, to change your location.")
    } else {
      Alert.alert(
        'Update Location',
        'Are you sure you want to move your location?',
        [
          {text: 'OK', onPress: () => goBack(navigation,TotalCartPrice,latitude,longitude,Draglatitude,Draglongitude,distance,duration)},
          {text: 'NO', onPress: () => console.log('NO Pressed'), 
          style: 'cancel'},
        ],
        { cancelable: false }
      );
    } 
  }

  return (
    <>
  <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }}>
  <View  style={styles.container}>

    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      showsTraffic={true}
      initialRegion={{
        latitude: Draglatitude,
        longitude: Draglongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,}}>

        <Marker
            title={"You"}
            style={{height: 10, width:10 }}
            coordinate={{latitude: Draglatitude, longitude: Draglongitude}}
            tracksViewChanges={false}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e.nativeEvent.coordinate)}
        />

        <Marker
            title={"Store"}
            pinColor="violet"
            style={{height: 10, width:10 }}
            coordinate={{latitude: store_lat, longitude: store_lng}}
            tracksViewChanges={false}
        />

        <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor="red"
            strokeWidth={3}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              setDistance(result.distance)
              setDuration(result.duration)
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
    
    </MapView>     
  </View>
  </View>
  <Button style={{}} title="Update Location" onPress={() => dialogBox(navigation,TotalCartPrice,latitude,longitude,Draglatitude,Draglongitude,distance,duration)}></Button>
  </>
  );
}

function goBack(navigation,TotalCartPrice,latitude_,longitude_,Draglatitude,Draglongitude,distance,duration){
  navigation.navigate("Place Order",{TotalCartPrice,latitude_,longitude_,Draglatitude,Draglongitude,distance,duration});
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
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
image:{ 
  height:30,
  width:30
}


 });
