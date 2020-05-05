import React,{useState,useRef,useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Linking,
  Dimensions
} from "react-native";
const deviceWidth = Dimensions.get('window').width;
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
const supportedURL = "https://google.com";
const unsupportedURL = "slack://open?team=123456";

export default function FeedScreen () {
    const [gcash_result,setgcash_result] = useState('');
    const [redirecturl,set_redirecturl] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      getMoviesFromApiAsync();
 
      return () => {
      };
      }, [])
    );

    async function getMoviesFromApiAsync() {
      try {
        let response = await fetch('https://reactnative.dev/movies.json');
        let json = await response.json();
        return json.movies;
      } catch (error) {
        console.error(error);
      }
    }
    const SendIntentButton = ({ action, extras, children }) => {
        const handlePress = useCallback(async () => {
          try {
            await Linking.sendIntent(action, extras);
          } catch (e) {
            Alert.alert(e.message);
          }
        }, [action, extras]);
      
        return <Button title={children} onPress={handlePress} />;
      };


    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return     <TouchableOpacity
        style={[styles.button, styles.stripe]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>TEST Pay with GCASH</Text>
      </TouchableOpacity>
      };
 
return (
  <View style={styles.container}>
{/* 
    <TouchableOpacity
      style={[styles.button, styles.stripe]}
      onPress={() =>paygcash()}
    >
      <Text style={styles.buttonText}>request ayden</Text>
    </TouchableOpacity>

    <OpenURLButton url={'https://render.alipay.com/p/c/jzmcoal2/gcash-cashier?amountValue=50&paymentId=114431158850627199875251573113584126eYXKmMwkWX202005020001720020&county=US&callback=https%3A%2F%2Ftest.adyen.com%2Fhpp%2FcompleteGCash.shtml%3FsessionId%3DvwniNSG3oi2%252Bi4kdGpEBP6S%252BXYenshwilxYlUBrMWIw%253D&amountCurrency=PHP&merchantName=null'}>
      Confirm</OpenURLButton> */}
      <WebView style={{height:250,width:250}}
      source={{ uri: 'https://render.alipay.com/p/c/jzmcoal2/gcash-cashier?amountValue=50&paymentId=114431158850627199875251573113584126eYXKmMwkWX202005020001720020&county=US&callback=https%3A%2F%2Ftest.adyen.com%2Fhpp%2FcompleteGCash.shtml%3FsessionId%3DvwniNSG3oi2%252Bi4kdGpEBP6S%252BXYenshwilxYlUBrMWIw%253D&amountCurrency=PHP&merchantName=null' }} />
</View>
)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#34a853',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginVertical: 8,
  },
  direct: {
    backgroundColor: '#db7d35',
  },
  stripe: {
    backgroundColor: '#556cd6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
})