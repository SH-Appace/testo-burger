import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../globalStyle/Theme';
import {useSelector} from 'react-redux';

const CheckoutPaymentDetails = ({
  subTotal,
  deliveryFee,
  pointsDiscount,
  tip,
}) => {
  const {cart} = useSelector(state => ({...state}));

  return (
    <View style={styles.container}>
      <PaymentDetails
        subTotal={subTotal}
        deliveryFee={deliveryFee}
        discount={cart.coupon.discount}
        pointsDiscount={pointsDiscount}
        tip={tip}
      />
    </View>
  );
};

export default CheckoutPaymentDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.light,
    padding: 15,
    marginTop: 20,
    borderRadius: BorderRadius,
    marginHorizontal: Window.fixPadding * 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  textLeft: {
    lineHeight: 19.6,
    fontSize: 14,
    color: Color.darkGray,
    fontFamily: Font.Urbanist_Medium,
  },
  textRight: {
    lineHeight: 22.4,
    fontSize: 16,
    color: Color.secondary,
    fontFamily: Font.Urbanist_SemiBold,
  },
});

const PaymentDetails = ({
  deliveryFee,
  subTotal,
  discount,
  pointsDiscount,
  tip,
}) => {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.textLeft}>Subtotal </Text>
        <Text style={styles.textRight}>${subTotal} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textLeft}>Delivery Fee </Text>
        <Text style={styles.textRight}>${deliveryFee} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textLeft}>Tip </Text>
        <Text style={styles.textRight}>${tip} </Text>
      </View>
      {discount !== 0 && (
        <View style={styles.row}>
          <Text style={styles.textLeft}> Coupon Discount </Text>
          <Text style={styles.textRight}>{discount}%</Text>
        </View>
      )}
      {pointsDiscount !== 0 && (
        <View style={styles.row}>
          <Text style={styles.textLeft}> Loyalty Points Discount </Text>
          <Text style={styles.textRight}>${pointsDiscount}</Text>
        </View>
      )}

      <View style={GlobalStyle.TopBorderStyle}></View>
      <View style={styles.row}>
        <Text style={styles.textLeft}>Total</Text>
        <Text style={styles.textRight}>
          $
          {subTotal -
            (subTotal / 100) * discount -
            pointsDiscount +
            deliveryFee +
            tip}
        </Text>
      </View>
    </View>
  );
};
