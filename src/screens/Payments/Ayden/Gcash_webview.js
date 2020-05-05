import React,{useState,useRef,useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Linking
} from "react-native";

import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';

const supportedURL = "https://google.com";

const unsupportedURL = "slack://open?team=123456";

export default function FeedScreen () {
    const [gcash_result,setgcash_result] = useState('');
    const [redirecturl,set_redirecturl] = useState('');
  useFocusEffect(
    React.useCallback(() => {
    //   const formData = new FormData();
    //   formData.append('paymentData','Ab02b4c0!BQABAgBobcgXX+pqL1K5HEMjQAxlVlzC8RH2dk8mBXQm5lw9E+NodwI1nILbdOnYCY2OXDOEm72EeWa9NwLBPwnOWAbrh3k355pYYQxAAC4fJkvMKHuwenvMDYe80jVHivubz\/tAxocqAl\/OsoyPMWnmK4b52th7m+4KKo8iAdhHXzTxD0ZYdrAdZkF+vQkJ270vM\/ajqVrALE97NiuQwqx0UIJ0knFye2akaBCNyYxMWJoDKOJLCJeMVVVwNfUYggGcBmeRvEN1lwBGhdW\/0\/\/aggcLZxIp1KhQO+cl2kqC5PljmtVx71zr68oM5jjArllupceHRmIH3tvq\/gyh7fgK\/e98xKIeaF0BBrkSc36gngAPUxRxjUJgMY5GlpDc6WZ0K4KvjvNB\/y3DXHlQkA7AsMd+ZHQR8sNKyqb1phHsixtL6py91UylKTsK3GDYI0FYZP+TeDZSSsXq64EDMs\/d6DScTaxNTV7PhnBWJXs3Oky1AwxqD+Hyd35PwaOxoXQtWw2pk05Fuwpb7BzxAAeQY62GSbSTmtfJSDoGOXC1riCfK\/rP1UdHN3l9QPAtiObJV6xO2Kvk8i0dVz5GvlUUVyk0+fmeoA+QmLLpvDx0FrlxotHYWkWL2YkQTZmgduZapL\/axOehbqnaC7lhZUUsR724CvuJTun6A3gEnjZM040LnRCSfO3IUgVsWtPso09iwrDZAEp7ImtleSI6IkFGMEFBQTEwM0NBNTM3RUFFRDg3QzI0REQ1MzkwOUI4MEE3OEE5MjNFMzgyM0Q2OERBQ0M5NEI5RkY4MzA1REMifYPsEf5YKJtKVkFayb1kuEQ78vLc9Ik1S2ujeThza1QT1cNsQ0DI4IUE+Bw440DywHP0kzBregALXc2sQFM\/9ErD4UtLqYziPdE8KkMSF\/BbQ7A+hr9eJzVcmXYIQC5BjbM2pYH\/V8IlQYJOlnzYu078BtO7LhUoBBoob4QzXzNfMnRf\/wqNQrcpQS7B1ZDF\/E6AOc8IGStW6SON2AKtlrCynFc\/eWGXdtLcpUzrEx67YTe0\/e+jz92SErcQZrjF6IMn2P0FgTMlVuvDpve+pU8hKXLgAkZ9B3mkIpnAdt6IVuL1r+s1AYaJ5PvEiYN5TUnr1AvOLWHfgi90QZjL2FWiow4zAi1b+vialygLSqxsqm2lG87Or59a3vfXeVD6LDsOn8sBvlcN5QzusVwKSFx4jkVqDZL3pYQ0vpNLN8cLoOn3p70pocmIyalB+GHp59f7WJspi1DxyqXTyqxADJvNB6a0EepvjUyWvsQCJRv3m1sLKQsX1dh7YZpnjmKjUUCw5xkIQj5fXGSIZxSv\/TDnRhRBE2M\/y1Q\/Y8ew+CqeqyqPanNnXS097HqeqxlIMb3v7\/xEStYWmqy9K1So2JqV4rzKtetjsm7l96FNg2OEtES8c4JOB0qvS\/uMqJsdYk0NyRyjxMnXHwpuTENPHdXtPzfQCpmGIHDJrMFx4vD7ZL4b3DyC2qKDvQs2rtJY9dlvr+KwmtnnUINMfyf6gWeyeT+yx+O1ybdRGFs8NaQ5qAS2kVfEyEGGsUejf8G8njA4bYcLPhp365843p2aYWFAOsPHc\/7ZT4zY4qM1uh5iq7NkZ5Jx1YD4Ho6BG1MlpCfcg3Om7GTsiGcaw5AydaYnHJA=');
    //   formData.append('details', {
    //     "payload":"Ab02b4c0!BQABAgCW5sxB4e/=="
    //   });

    //              // console.log(formData);
    //   fetch('https://checkout-test.adyen.com/v52/payments/details', {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json',
    //       },
    //       body: JSON.stringify(formData)
    //   }).then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log("post gcash ",responseJson);
    //           }).catch((error) => {
    //           console.error(error);
    //         });
      return () => {
      };
      }, [])
    );

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

   const paygcash = () => {

    var d = new Date();
    var ref_number = d.getTime();
    fetch('https://checkout-test.adyen.com/v52/payments', {
        method: 'POST',
        headers: {
          'x-API-key': 'AQErhmfuXNWTK0Qc+iSTnWI+ouGrWoRHCJBeDjcDSAoOVmlfJ3WOTAcn+suS7xDBXVsNvuR83LVYjEgiTGAH-FYYKqG40WhEyZXZcYMZXQg6P+5AvFLqa4u6Udp2Gdf4=-~n>~R7G5kj2ugW?W',
          'content-type': 'application/json',
          },
          body: JSON.stringify({ 
          "merchantAccount":"CoffeeProject625ECOM",
          "merchantName":"CoffeeProject625ECOM",
          "reference":ref_number,
          "amount":{
            "currency":"PHP",
            "value":50
          },
          "paymentMethod":{
            "type":"gcash"
          },
          "returnUrl":"https://your-company.com/checkout?shopperOrder=12xy.."
        })
      }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);


                      var  action =  responseJson.action
                        // resultCode: item.resultCode,
                        // details: item.details,
                        // paymentData: item.paymentData,
                        // redirect : item.redirect

                  console.log(action.url);
                  set_redirecturl(action.url);
              }).catch((error) => {
              console.error(error);
            });

            //post gcash
    }

    const OpenURLButton = ({ url, children }) => {
        console.log(url);
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
      
        return <Button title={children} onPress={handlePress} />;
      };
 
return (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, styles.stripe]}
      onPress={() => paygcash()}
    >
      <Text style={styles.buttonText}>Pay with GCASH</Text>
    </TouchableOpacity>


    <TouchableOpacity
      style={[styles.button, styles.stripe]}
      onPress={() => paygcash()}
    >
      <Text style={styles.buttonText}>show url</Text>
    </TouchableOpacity>


    <OpenURLButton url={redirecturl}>Confirm</OpenURLButton>


    <SendIntentButton action="android.intent.action.POWER_USAGE_SUMMARY">
        Power Usage Summary
      </SendIntentButton>
      <SendIntentButton
        action="android.settings.APP_NOTIFICATION_SETTINGS"
        extras={[
          { "android.provider.extra.APP_PACKAGE": "com.facebook.katana" },
        ]}
      >
        App Notification Settings
      </SendIntentButton>

<WebView
style={{height:150,width:250}}
source={{uri: redirecturl}}/>

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