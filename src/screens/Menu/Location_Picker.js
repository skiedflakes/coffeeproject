import React,{useState,useRef} from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from "react-native-maps";
import AsyncStorage from '@react-native-community/async-storage';
import { getPreciseDistance } from 'geolib';

export default function Location_Picker ({navigation,route}) {
  const {TotalCartPrice,latitude,longitude} = route.params;

  const [Draglongitude, setDragLongitude] = useState('');
  const [Draglatitude, setDragLatitude] = useState('');
  const [distance, setDistance] = useState('');

  onMarkerDragEnd = (coord) => {
    const user_lat = coord.latitude;
    const user_lng = coord.longitude;

    setDragLatitude(user_lat);
    setDragLongitude(user_lng);

    // STORE location
    const store_lat = 14.60498536757159; 
    const store_lng = 120.98707526922226;

    var pdis = getPreciseDistance(
        { latitude: user_lat, longitude: user_lng },
        { latitude: store_lat, longitude: store_lng }
      );
      alert(`Precise Distance ${pdis} Meter or ${pdis / 1000} KM`);

      setDistance(pdis / 1000);
      console.log(distance)
  };

  function dialogBox(navigation,TotalCartPrice,latitude,longitude,Draglatitude,Draglongitude,distance){
    if(Draglatitude==''){
      alert("Please move the red marker, to change your location.")
    } else {
      Alert.alert(
        'Update Location',
        'Are you sure you want to move your location?',
        [
          {text: 'OK', onPress: () => goBack(navigation,TotalCartPrice,latitude,longitude,Draglatitude,Draglongitude,distance)},
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
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,}}>

        <Marker
            title={"You"}
            style={{height: 10, width:10 }}
            coordinate={{latitude: latitude, longitude: longitude,}}
            tracksViewChanges={false}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e.nativeEvent.coordinate)}
        />
    
    </MapView>     
  </View>
  </View>
  <Button style={{}} title="Update Location" onPress={() => dialogBox(navigation,TotalCartPrice,latitude,longitude,Draglatitude,Draglongitude,distance)}></Button>
  </>
  );
}

function goBack(navigation,TotalCartPrice,latitude_,longitude_,Draglatitude,Draglongitude,distance){
  navigation.navigate("Place Order",{TotalCartPrice,latitude_,longitude_,Draglatitude,Draglongitude,distance});
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
