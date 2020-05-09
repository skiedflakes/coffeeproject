import React,{useState,useRef,useEffect} from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity, Alert,Image, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useFocusEffect } from '@react-navigation/native';
import { Marker } from "react-native-maps";
import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Location_Picker ({navigation,route}) {
  const {TotalCartPrice,} = route.params;

  const [spinner, setSpinner] = React.useState(true);
  const [spinnerMSG, setSpinnerMSG] = React.useState("Getting user location");

  // STORE location
  const store_lat = 10.627794; 
  const store_lng = 122.965016;

  // Zoom level
  const latDelta = 0.0922;
  const lngDelta = 0.0421;
  const DEFAULT_PADDING = { top: 200, right: 50, bottom: 50, left: 50 };

  // User location
  const [UserOriginlatitude, setUserOriginLatitude] = useState(0);
  const [UserOriginlongitude, setUserOriginLongitude] = useState(0);

  const [Draglatitude, setDragLatitude] = useState(0);
  const [Draglongitude, setDragLongitude] = useState(0);
  const [getUserLocation, setgetUserLocation] = useState(false);

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const [MapRef, setMapRef] = useState();
  const origin = {latitude: Draglatitude, longitude: Draglongitude};
  const destination = {latitude: store_lat, longitude: store_lng};

  useFocusEffect(
    React.useCallback(() => {
      console.log("test")
      if (!getUserLocation) {
        getUserLoc();
      }
    })
  );

  function getUserLoc(){
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
        setSpinner(false);
        setgetUserLocation(true);
        setDragLatitude(location.latitude);
        setDragLongitude(location.longitude);

        setUserOriginLatitude(location.latitude);
        setUserOriginLongitude(location.longitude);
      
        console.log("longitude - "+location.longitude)
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
  }

  function returnToOriginLoc(){
    setDragLatitude(UserOriginlatitude);
    setDragLongitude(UserOriginlongitude);
   
    let r = {
      latitude: UserOriginlatitude,
      longitude: UserOriginlongitude,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
    MapRef.animateToRegion(r, 1000);
  }

  onMarkerDragEnd = (coord) => {
    const user_lat = coord.latitude;
    const user_lng = coord.longitude;
    setDragLatitude(user_lat);
    setDragLongitude(user_lng);

    MapRef.fitToCoordinates([{ latitude: user_lat, longitude: user_lng }, { latitude: store_lat, longitude: store_lng }], { edgePadding: DEFAULT_PADDING, animated: true, });
  };

  const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible} transparent={true}>
      <View style={{ alignItems: 'center', justifyContent: 'center',flex: 1 }}>
        <View style={{ borderRadius: 10, backgroundColor: '#f0f0f0', padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '200' }}>{spinnerMSG}</Text>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );

return (
    <>
  <View style={{flex: 1,flexDirection: 'column',}}>
  <View  style={styles.container}>

  {getUserLocation && 
  <MapView
      ref={(ref) => {setMapRef(ref)}}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={{flex: 1, marginBottom: 1}}
      showsMyLocationButton={false}
      showsTraffic={true}
      initialRegion={{
        latitude: Draglatitude,
        longitude: Draglongitude,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,}}>

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
              setSpinnerMSG('Calculating');
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
              setSpinner(false);
              console.log('GOT AN ERROR');
            }}
          />
    </MapView>}

  </View>
  
  <View style={{flexDirection:"row-reverse"}}>
    {/* <Icon style={{backgroundColor:"#4784ed", borderRadius:50, padding:3, margin:5, color:"white"}} onPress={() => returnToOriginLoc()} name="ios-person" size={25} color="#4F8EF7" /> */}
    <Text style={{backgroundColor:"#4784ed", borderRadius:20, padding:5, margin:5, color:"white"}} onPress={() => returnToOriginLoc()}>Origin</Text>
  </View>
  </View>

  <View style={{flexDirection:"row-reverse", alignSelf:"center"}}>
      <Text style={{padding:5, margin:5, color:"black", fontSize:15, fontWeight:"bold"}}>{"Duration: "+duration+" min"}</Text>
      <Text style={{padding:5, margin:5, color:"black", fontSize:15, fontWeight:"bold"}}>{"Distance: "+distance+" km"}</Text>
  </View>

  <View style={{flexDirection:"row-reverse", alignSelf:"center"}}>
  <Button title="Proceed" onPress={() => dialogBox(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration)}></Button>
  <Button color="#ff5c5c" title="Cancel" onPress={() => navigation.goBack(null)}></Button>
  </View>
  {spinner && <CustomProgressBar />}
  </>
  );
}

function dialogBox(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration){
  Alert.alert(
    'Confirm Location',
    'Are you sure this is your current location?',
    [
      {text: 'OK', onPress: () => confirmLocation(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration)},
      {text: 'NO', onPress: () => console.log('NO Pressed'), 
      style: 'cancel'},
    ],
    { cancelable: false }
  );
}

function confirmLocation(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration){
  navigation.navigate("Place Order",{TotalCartPrice,Draglatitude,Draglongitude,distance,duration});
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
    marginBottom: 1
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
