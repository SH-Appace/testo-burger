import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CardField, useStripe} from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const {confirmPayment} = useStripe();

  return (
    <View style={{flex: 1}}>
      <Text>PaymentScreen</Text>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          placeholderColor: '#A9A9A9',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
          color: '#000',
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
