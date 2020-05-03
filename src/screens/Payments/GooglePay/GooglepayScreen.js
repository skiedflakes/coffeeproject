import React,{useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  Alert,
  Platform
} from "react-native";

import GetLocation from 'react-native-get-location'
import { useFocusEffect } from '@react-navigation/native';
import { GooglePay } from 'react-native-google-pay';

const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

const requestData = {
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: 'PAYMENT_GATEWAY',
      // // stripe (see Example):
      // gateway: 'stripe',
      // gatewayMerchantId: '',
      // stripe: {
      //   publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      //   version: '2018-11-08',
      // },
      // other:
      gateway: 'adyen',
      gatewayMerchantId: '17549278243591902429',
    },
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: '10',
    totalPriceStatus: 'FINAL',
    currencyCode: 'PHP',
  },
  merchantName: 'Example Merchant',
};

const directRequestData = {
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: 'DIRECT',
      publicKey: 'BOdoXP+9Aq473SnGwg3JU1aiNpsd9vH2ognq4PtDtlLGa3Kj8TPf+jaQNPyDSkh3JUhiS0KyrrlWhAgNZKHYF2Y=',
    },
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: '5',
    totalPriceStatus: 'FINAL',
    currencyCode: 'PHP',
  },
  merchantName: '17549278243591902429',
}



export default function GooglepayScreen () {
  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        console.log('android ')
        GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST)
      }    
      return () => {
      };
      }, [])
    );

   const payWithGooglePay = (request_data) => {
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
    .then((ready) => {
      if (ready) {
        // Request payment token
        GooglePay.requestPayment(request_data)
          .then((token) => {
            // Send a token to your payment gateway
            console.log(token);
          })
          .catch((error) => console.log(error.code, error.message));
      }
    })
    }


return (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to react-native-google-pay!</Text>
    <TouchableOpacity style={styles.button} onPress={() => payWithGooglePay(requestData)}>
      <Text style={styles.buttonText}>PAYMENT_GATEWAY</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.direct]}
      onPress={() => null}
    >
      <Text style={styles.buttonText}>DIRECT</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.stripe]}
      onPress={() => null}
    >
      <Text style={styles.buttonText}>Stripe</Text>
    </TouchableOpacity>
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