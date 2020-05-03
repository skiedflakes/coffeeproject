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
      const formData = new FormData();
      formData.append('paymentData','Ab02b4c0!BQABAgAa0uRe6aQCEFyA\/ANoSYY+aIka8zeiUa5QHCl3iEFFS\/\/4HdmmESiswy4BIzHqEkMtmjOOTVNwt1QlGX92qtKHutLENxhyrLlzIrgBQvuGYtRp4AMqickqfF83WZNJYEMB\/QYkB0iAc4pVbBT+6WbEgfwJFYf+LcD1B6H3k7EOCN5verIcCxajMA20s9qLsOrQeSRMwQdW8epv6D6im08zl5Al5TlSAwf2\/eGscP41rq\/n7CivntsGX3mfShe\/dvFvEQ9ZHnu1FQ5TP+u3hNy1mROj6\/OksJKRtGhv2p\/fdhhM2Pn1eJhRCy3D2C9cqnZ3ZLte\/pzERYtkqAQyugwFz8IHmQgv4mA5MFtZxJ9o2FD2nUsPYDhbri+NbfouJNHy8Wm11It7dATkQfjUcZp6HdyQciZcgompFkXJz5w+J9rKzBUin9RBPFigidyuHryOokAXt6b0mzAC2nN36zbMf6BZTN2aYkEhXHaacUUXs5XOSxnll2ie3ZqApPNo8R2MRZfquPi3uSVvdUWrHcpzE1\/mqypM1emiamlJxYP2CIC9vWZLWO4LVGOfZNxVbFKxKpEQf+0K1SbAHFajfkjecck0\/DsDULBH4GBhkQy3shBWFyYIwDwAM0sfB\/jM5pzBJrxtj+bZZrdAJXPL4SXdxnjuF62G8VNk2\/frs5MHRhDgWYNiT+XHgqEECKwf8aMgAEp7ImtleSI6IkFGMEFBQTEwM0NBNTM3RUFFRDg3QzI0REQ1MzkwOUI4MEE3OEE5MjNFMzgyM0Q2OERBQ0M5NEI5RkY4MzA1REMifbqbXMr\/64Y+y\/mMnuebJepamaPuQpggEzdjG3N70Q\/neHqowZr501aoMGTGtYVvKL55YwVbYQHcW4Y7zz1lkqyKh5q5X1K1IG6UClMVNyDiqB435KLbaxjwAmrsbDUBoXek7dZKmWQxNbvmEWgAc8E+ZKzVyKhmB+96H5cFP1v0AnT1BgS7Z6INErYqxmAC+5V8Kf5KDJru1xXRAWNOhg72oZcv7TzO4Yjpaoz9CtMcV5DAwt7k1eY\/o3kqpg+75eiQlckcmNefL7UtNLY+hN\/zM6seWXqrQQz5Osm8srgZ3\/9v1RCLh12IBwk2wZTSb\/3Ux9GcF4E98BDkED\/m0k418EuOpO3jxXBtCGzwlT+BeXPNpsYLXDqMZ0xYX+EzpMMd5klblXwZG\/U6n1yq2wRmBCcV2VAB8qj9SIDpyn8O9I1L2HuvrL8Wpt1FR2WKIbtCCwWG\/2G2xd6AhlbVEG9oIn8ool1XI4htC96dMuBQRbRs1RlZtDuSdLu8PdOKA\/OfoKZD6Ws36JtYKBZrcIf24M+wzJHSCzJVWV\/kFefpAQGrvI4t\/xxAVpLeiSSlcJs3Xr6CRpiAPcqLU77\/95fxC1EE73B2jH5HuTkc0\/Do8GTZMnwd\/KNdOFRZnBwT0kNdVPw11Y4t6h\/pIRgNwyDGr3C+a58\/+0He1w+TgebYEX0+vGYgYFPayfjxhDioCLbuqJO0T4ppewlm4CrT0zXp\/EUFzbJDpB2U30cNfjL7Y9hvnh+EM9a1KYCG9ACpAvLPToMeWsphlkNtw7YayKBTZwdVMMgkObuzWdQ89RLJWXr57HhdmW\/RaBpXugS5Vmz80bc');
      formData.append('details', {
        "payload":"Ab02b4c0!BQABAgCW5sxB4123123e/=="
      });

                 // console.log(formData);
      fetch('https://checkout-test.adyen.com/v52/payments/details', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          },
          body: JSON.stringify(formData)
      }).then((response) => response.json())
            .then((responseJson) => {
                console.log("post gcash ",responseJson);
              }).catch((error) => {
              console.error(error);
            });
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
  ;
      };
 
return (
  <View style={styles.container}>

    <TouchableOpacity
      style={[styles.button, styles.stripe]}
      onPress={() =>set_redirecturl('https://www.google.com/')}
    >
      <Text style={styles.buttonText}>show url</Text>
    </TouchableOpacity>


    <OpenURLButton url={'https://render.alipay.com/p/c/jzmcoal2/gcash-cashier?amountValue=50&paymentId=114431158850627199875251573113584126eYXKmMwkWX202005020001720020&county=US&callback=https%3A%2F%2Ftest.adyen.com%2Fhpp%2FcompleteGCash.shtml%3FsessionId%3DvwniNSG3oi2%252Bi4kdGpEBP6S%252BXYenshwilxYlUBrMWIw%253D&amountCurrency=PHP&merchantName=null'}>Confirm</OpenURLButton>




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