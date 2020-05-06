import React,{useState,useRef} from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity, Alert,Image, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from "react-native-maps";
import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location';
import { ActivityIndicator } from 'react-native';

export default function Location_Picker ({navigation,route}) {
  const {TotalCartPrice,} = route.params;

  const [spinner, setSpinner] = React.useState(false);

  // STORE location
  const store_lat = 10.627794; 
  const store_lng = 122.965016;

  // user location
  const [Draglatitude, setDragLatitude] = useState(10.641707);
  const [Draglongitude, setDragLongitude] = useState(122.945301);
  const [isMarkerDrag, setMarkerDrag] = useState(false);

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const origin = {latitude: Draglatitude, longitude: Draglongitude};
  const destination = {latitude: store_lat, longitude: store_lng};

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {
    //setDragLatitude(location.longitude);
    //setDragLongitude(location.latitude);
    console.log("longitude - "+location.longitude)
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })

  onMarkerDragEnd = (coord) => {
    const user_lat = coord.latitude;
    const user_lng = coord.longitude;
    setDragLatitude(user_lat);
    setDragLongitude(user_lng);
    setMarkerDrag(true);
  };

  function dialogBox(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration){
    Alert.alert(
      'Confirm Location',
      'Are you want that is your current location?',
      [
        {text: 'OK', onPress: () => confirmLocation(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration)},
        {text: 'NO', onPress: () => console.log('NO Pressed'), 
        style: 'cancel'},
      ],
      { cancelable: false }
    );
  }

  return (
    <>
  <View style={{
    flex: 1,
    flexDirection: 'column',
  }}>
  <View  style={styles.container}>

    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      showsMyLocationButton={true}
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
            apikey={global.GOOGLE_MAPS_APIKEY}
            strokeColor="red"
            strokeWidth={3}
            onStart={(params) => {
              setSpinner(true);
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              setSpinner(false);
              setDistance(Math.round(result.distance))
              setDuration(Math.round(result.duration))
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR');
            }}
          />
    
    </MapView>     
  </View>
  <View style={{flexDirection:"row-reverse"}}>
      <Text style={{backgroundColor:"#969696", borderRadius:20, padding:5, margin:5, color:"white"}}>{"Distance: "+distance+" km"}</Text>
  </View>
  <View style={{flexDirection:"row-reverse"}}>
      <Text style={{backgroundColor:"#969696", borderRadius:20, padding:5, marginRight:5, color:"white"}}>{"Duration: "+duration+" min"}</Text>
  </View>
  {spinner && <CustomProgressBar />}
  </View>
  <Button style={{}} title="Confirm" onPress={() => dialogBox(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration)}></Button>
  </>
  );
}

const CustomProgressBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible} transparent={true}>
    <View style={{ alignItems: 'center', justifyContent: 'center',flex: 1 }}>
      <View style={{ borderRadius: 10, backgroundColor: '#f0f0f0', padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '200' }}>Calculating</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);

function confirmLocation(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration){
  navigation.navigate("Payment Methods",{TotalCartPrice,Draglatitude,Draglongitude,distance,duration});
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
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
