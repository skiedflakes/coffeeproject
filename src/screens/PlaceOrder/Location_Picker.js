import React,{useState,useRef,useEffect} from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity, Alert,Image, Modal,TouchableHighlight } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useFocusEffect } from '@react-navigation/native';
import { Marker } from "react-native-maps";
import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Location_Picker ({navigation,route}) {
  const {TotalCartPrice,} = route.params;

  const [StoreArray, setStoreArray] = useState('');

  const [spinner, setSpinner] = React.useState(true);
  const [spinnerMSG, setSpinnerMSG] = React.useState("Getting user location");

  const [isLocationFar, setIsLocationFar] = React.useState(false);
  const [TextDistanceColor, setTextDistanceColor] = React.useState('black');

  // STORE location
  const [store_lat, setStoreLat] = useState();
  const [store_lng, setStoreLongi] = useState();

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

  const [selectedStore, setSelectedStore] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [BranchName, setBranchName] = useState('');
  const [BranchID, setBranchID] = useState('');

  const [MapRef, setMapRef] = useState();
  const origin = {latitude: Draglatitude, longitude: Draglongitude};
  const destination = {latitude: store_lat, longitude: store_lng};

  useFocusEffect(
    React.useCallback(() => {
      console.log("test")
      if (!getUserLocation) {
        getUserLoc();
        getchStoreLocation();
      }
    })
  );

  function getchStoreLocation(){
    const formData = new FormData();
    formData.append('product_category_id', "id");
    fetch(global.global_url+'location_picker/fetchStoreLocation.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: formData

    }).then((response) => response.json())
      .then((responseJson) => {

            //get current data
            var data = responseJson.array_store.map(function(item,index) {
                return {
                branch_id:item.branch_id,
                branch_name: item.branch_name,
                latitude: item.latitude,
                longitude: item.longitude,
                };
                });
                
                setStoreArray(data);

                console.log(StoreArray)

      }).catch((error) => {
        console.error(error);
      });
  }

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
      
        let r = {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        };
        MapRef.animateToRegion(r, 1000);

        console.log("longitude - "+location.longitude)
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
  }

  function returnToOriginLoc(){
    //setDragLatitude(UserOriginlatitude);
    //setDragLongitude(UserOriginlongitude);
   
    let r = {
      latitude: Draglatitude, //UserOriginlatitude 
      longitude: Draglongitude, //UserOriginlongitude
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
    MapRef.animateToRegion(r, 1000);
  }

  const onMarkerDragEnd = (coord) => {
    const user_lat = coord.latitude;
    const user_lng = coord.longitude;
    setDragLatitude(user_lat);
    setDragLongitude(user_lng);
    moveFitMarkerScreen(store_lat,store_lng,user_lat,user_lng);
    // if (store_lat != null) {
    //   MapRef.fitToCoordinates([{ latitude: user_lat, longitude: user_lng }, { latitude: parseFloat(store_lat), longitude: parseFloat(store_lng) }], { edgePadding: DEFAULT_PADDING, animated: true, });
    // }
  };

  const handleMarkerPress = (marker) => {
    const store_latitude = marker.latitude
    const store_longitude = marker.longitude 
    const store_name = marker.branch_name
    const store_id = marker.branch_id
    setBranchID(store_id);
    setBranchName(store_name);
    setSelectedStore(store_name);
    setStoreLat(store_latitude);
    setStoreLongi(store_longitude);
    moveFitMarkerScreen(store_latitude,store_longitude,Draglatitude,Draglongitude);
  };

  function moveFitMarkerScreen(store_latitude, store_longitude, user_latitude, user_longitude){
    if (store_latitude != null) {
      MapRef.fitToCoordinates([{ latitude: user_latitude, longitude: user_longitude }, { latitude: parseFloat(store_latitude), longitude: parseFloat(store_longitude) }], { edgePadding: DEFAULT_PADDING, animated: true, });
    }
  }

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
        
        {StoreArray[0] != null && StoreArray.map((marker, index) => (
            <MapView.Marker
                key = {index}
                coordinate = {{
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude)
                }}
                title = { marker.branch_name }
                pinColor="violet" 
                onPress={() => handleMarkerPress(marker)}
            />
          ))
        }

        {store_lat != null && <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={global.GOOGLE_MAPS_APIKEY}
            strokeColor="red"
            strokeWidth={3}
            onStart={(params) => {
              setSpinnerMSG('Calculating');
              setSpinner(true);
              setDuration('...');
              setDistance('...');
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              setSpinner(false);
              setDistance(Math.round(result.distance))
              setDuration(Math.round(result.duration))
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)

              if (result.distance > 4) {
                setIsLocationFar(true); 
                setTextDistanceColor('red');
              } else {
                setIsLocationFar(false);
                setTextDistanceColor('black');
              }
            }}
            onError={(errorMessage) => {
              setSpinner(false);
              console.log('GOT AN ERROR');
            }}
          />
        }
        
    </MapView>}

  </View>
  
  <View style={{flexDirection:"row-reverse"}}>
    <Icon style={{backgroundColor:"#707070", padding:3, margin:5, color:"white"}} onPress={() => getUserLoc()} name="crosshairs-gps" size={25} color="#4F8EF7" />
    {/* <Text style={{backgroundColor:"#4784ed", borderRadius:20, padding:5, margin:5, color:"white"}} onPress={() => getUserLoc()}>Origin</Text> */}
  </View>
  </View>

  <Text style={{paddingTop:5, marginTop:5, color:"black", fontSize:15.5, fontWeight:"bold", alignSelf:"center"}}>{"Store: "+selectedStore}</Text>
  <View style={{flexDirection:"row-reverse", alignSelf:"center"}}>
      <Text style={{padding:5, margin:5, color:"black", fontSize:15.5, fontWeight:"bold"}}>{"Duration: "+duration +" min"}</Text>
      <Text style={{padding:5, margin:5, color:TextDistanceColor, fontSize:15.5, fontWeight:"bold"}}>{"Distance: "+distance}</Text>
  </View>

  <View style={{flexDirection:"row-reverse", alignSelf:"center"}}>
  <Button title="Proceed" onPress={() => dialogBox(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration,BranchID,BranchName)}></Button>
  <Button color="#ff5c5c" title="Cancel" onPress={() => navigation.goBack(null)}></Button>
  </View>
  {spinner && <CustomProgressBar />}
  </>
  );

  function dialogBox(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration,BranchID,BranchName){
    if (distance == '') {
      alert('Please select store');
    }
    else if (isLocationFar) {
      alert('Distanct is more then 5 km');
    } else {
      Alert.alert(
        'Confirm Location',
        'Are you sure this is your current location?',
        [
          {text: 'OK', onPress: () => confirmLocation(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration,BranchID,BranchName)},
          {text: 'NO', onPress: () => console.log('NO Pressed'), 
          style: 'cancel'},
        ],
        { cancelable: false }
      );
    }
  }
  
  function confirmLocation(navigation,TotalCartPrice,Draglatitude,Draglongitude,distance,duration,BranchID,BranchName){
    navigation.navigate("Payment Methods",{TotalCartPrice,Draglatitude,Draglongitude,distance,duration,BranchID,BranchName});
  }
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
