import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BorderRadius, Color, Font, Window} from '../globalStyle/Theme';
import {Switch} from 'react-native-paper';
import Icon from '../core/Icon';
import TextField from './TextFeild';
import {loyaltyDiscount} from '../apis/loyalty';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

const CheckoutOptions = ({
  setOpenInput,
  openInput,
  coupon,
  setCoupon,
  removeCoupon,
  couponHandler,
  setPoints,
  points,
  setPaymentMethod,
  paymentMethod,
  setLoading,
  initializePaymentSheet,
  setPointsDiscount,
  pointsDiscount,
  setTip,
  tip,
  subTotal,
  orderNote,
  setOrderNote,
}) => {
  const {cart, auth, branch} = useSelector(state => ({...state}));

  return (
    <View style={styles.container}>
      {CardData.map((item, index) => {
        if ((item.id == 2) & !auth.user) return;

        return (
          <CartDetails
            setOpenInput={setOpenInput}
            openInput={openInput}
            discount={cart.coupon.discount}
            item={item}
            key={index}
            coupon={coupon}
            setCoupon={setCoupon}
            cart={cart}
            removeCoupon={removeCoupon}
            couponHandler={couponHandler}
            setPoints={setPoints}
            points={points}
            auth={auth}
            setPaymentMethod={setPaymentMethod}
            paymentMethod={paymentMethod}
            setLoading={setLoading}
            initializePaymentSheet={initializePaymentSheet}
            setPointsDiscount={setPointsDiscount}
            pointsDiscount={pointsDiscount}
            setTip={setTip}
            tip={tip}
            subTotal={subTotal}
            orderNote={orderNote}
            setOrderNote={setOrderNote}
          />
        );
      })}
    </View>
  );
};

export default CheckoutOptions;

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
  },
  headingRow: {
    fontSize: 14,
    color: Color.tertiary,
    lineHeight: 21.6,
    width: 150,
    fontFamily: Font.Urbanist_Medium,
  },
  subHeadingRow: {
    fontSize: 16,
    color: Color.primary,
    lineHeight: 21.6,
    width: 150,
    fontFamily: Font.Urbanist_Medium,
  },
  labelText: {
    color: Color.light,
    fontSize: 12,
    fontFamily: Font.Urbanist_Light,
  },
  labelContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Color.primary,
    borderRadius: 15,
    marginLeft: 5,
  },
  paymentButton: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    height: 40,
    borderRadius: BorderRadius,
    borderWidth: 1,
  },
  paymentButtonText: {
    lineHeight: 19.6,
    fontSize: 14,
    fontFamily: Font.Urbanist_Bold,
  },
  applyButton: {
    height: 45,
    borderRadius: BorderRadius,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: Color.primary,
  },
  applyButtonText: {
    fontSize: 14,
    fontFamily: Font.Urbanist_Bold,
    color: Color.light,
  },
  incrementDecrementBtn: {
    width: 46,
    height: 46,
    borderRadius: BorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.primary,
  },
});
const CartDetails = ({
  item,
  setOpenInput,
  openInput,
  discount,
  coupon,
  setCoupon,
  cart,
  removeCoupon,
  couponHandler,
  setPoints,
  points,
  auth,
  paymentMethod,
  setPaymentMethod,
  initializePaymentSheet,
  setLoading,
  setPointsDiscount,
  pointsDiscount,
  setTip,
  tip,
  subTotal,
  orderNote,
  setOrderNote,
}) => {
  const [status, setStatus] = useState(false);
  const [tipPercent, setTipPercent] = useState(0);

  useEffect(() => {
    // Calculate tip when subtotal or tipPercent changes
    const calculatedTip = (subTotal * tipPercent) / 100;
    setTip(calculatedTip);
  }, [subTotal, tipPercent]);
  const handleCustomTipChange = text => {
    // Remove any non-numeric characters and parse the input as a floating-point number
    const parsedValue = parseInt(text) || 0;

    if (!isNaN(parsedValue)) {
      setTip(parsedValue);
    } else {
      // Handle invalid input (e.g., display an error message)
    }
  };

  const incrementTipPercent = () => {
    if (tipPercent < 40) {
      const newTipPercent = tipPercent + 5;
      const newTipAmount = (subTotal * newTipPercent) / 100;
      setTip(newTipAmount);
      setTipPercent(newTipPercent);
    }
  };

  const decrementTipPercent = () => {
    if (tipPercent > 0) {
      const newTipPercent = tipPercent - 5;
      const newTipAmount = (subTotal * newTipPercent) / 100;
      setTip(newTipAmount);
      setTipPercent(newTipPercent);
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (openInput === item.id) {
            setOpenInput('');
          } else {
            setOpenInput(item.id);
          }
        }}
        style={[
          styles.row,
          {
            justifyContent: 'space-between',
            margin: 1,
            marginVertical: 10,
          },
        ]}>
        {
          <View style={styles.row}>
            <Icon
              iconFamily={'MaterialCommunityIcons'}
              name={item.icon}
              size={25}
              color={Color.primary}
            />
            <View
              style={{
                flexDirection:
                  discount !== 0 && pointsDiscount !== 0 ? 'column' : 'row',
                alignItems:
                  discount !== 0 && pointsDiscount !== 0
                    ? 'flex-start'
                    : 'center',
              }}>
              <Text style={styles.headingRow}> {item.payment} </Text>
              <View style={[styles.row, {marginTop: 5}]}>
                {discount > 0 && item.id === 2 && (
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Discount {discount}%</Text>
                  </View>
                )}
                {pointsDiscount > 0 && item.id === 2 && (
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                      Points Discount ${pointsDiscount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {openInput !== 1 && item.id === 1 && (
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>
                  {paymentMethod === 1 ? 'COD' : 'Credit Card'}
                </Text>
              </View>
            )}
          </View>
        }

        <Icon
          iconFamily={'Entypo'}
          name={item.chevron}
          size={20}
          color={Color.primary}
          style={{
            transform: [{rotate: openInput === item.id ? '90deg' : '0deg'}],
          }}
        />
      </TouchableOpacity>
      {openInput === item.id && (
        <>
          {item.id === 1 ? (
            <View
              style={[
                styles.row,
                {
                  marginVertical: 10,
                  width: '100%',
                },
              ]}>
              <TouchableOpacity
                onPress={() => setPaymentMethod(1)}
                style={[
                  styles.paymentButton,
                  {
                    backgroundColor:
                      paymentMethod === 1 ? Color.primary : 'transparent',
                    borderColor:
                      paymentMethod === 1 ? Color.primary : Color.secondary,
                  },
                ]}>
                <Text
                  style={[
                    styles.paymentButtonText,
                    {
                      color:
                        paymentMethod === 1 ? Color.light : Color.secondary,
                    },
                  ]}>
                  COD
                </Text>
              </TouchableOpacity>
              {auth.user && (
                <TouchableOpacity
                  onPress={() => {
                    initializePaymentSheet();
                    setPaymentMethod(2);
                  }}
                  style={[
                    styles.paymentButton,
                    {
                      backgroundColor:
                        paymentMethod === 2 ? Color.primary : 'transparent',
                      borderColor:
                        paymentMethod === 2 ? Color.primary : Color.secondary,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.paymentButtonText,
                      {
                        color:
                          paymentMethod === 2 ? Color.light : Color.secondary,
                      },
                    ]}>
                    Credit Card
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : item.id === 2 ? (
            <>
              <View style={styles.row}>
                <View style={{flex: 0.7}}>
                  <TextField
                    placeholder="Enter Coupon"
                    blurOnSubmit={true}
                    onChanged={setCoupon}
                    value={coupon}
                    height={46}
                    discount={cart.coupon.discount}
                    removeCoupon={removeCoupon}
                  />
                </View>
                <View style={{flex: 0.3, marginLeft: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      couponHandler();
                      // initializePaymentSheet();
                    }}
                    style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.row}>
                <View style={{flex: 0.7}}>
                  <TextField
                    placeholder="Points Amount"
                    keyboardType="number-pad"
                    blurOnSubmit={true}
                    onChanged={setPoints}
                    value={points}
                    height={46}
                    pointsDiscount={pointsDiscount}
                    removePoints={() => {
                      setPointsDiscount(0);
                      setPoints(0);
                    }}
                    loyaltyPoints={parseFloat(auth.user?.loyalty_point)}
                  />
                </View>
                <View style={{flex: 0.3, marginLeft: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (points.length < 1) {
                        return showMessage({
                          message: 'Enter more points amount!',
                          type: 'danger',
                        });
                      }
                      loyaltyDiscount(
                        {
                          loyalty_point: points,
                          total_amount:
                            cart.total -
                            (cart.total / 100) * cart.coupon.discount,
                        },
                        auth.token,
                        setLoading,
                        setPointsDiscount,
                        setOpenInput,
                      );
                    }}
                    style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Use Points</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : item.id === 4 ? (
            <TextInput
              style={{
                backgroundColor: Color.veryLightGray,
                height: 90,
                borderRadius: 16,
                paddingHorizontal: 10,
                color: Color.secondary,
                fontFamily: Font.Urbanist_Light,
              }}
              placeholder="Order Notes..."
              placeholderTextColor={Color.lightGray}
              multiline
              value={orderNote}
              onChangeText={text => setOrderNote(text)}
            />
          ) : (
            <>
              <View style={styles.row}>
                <View style={{flex: 0.68, marginRight: 0}}>
                  <TextField
                    placeholder="0"
                    blurOnSubmit={true}
                    onChanged={setTip}
                    value={tip.toString()}
                    height={46}
                    prefix="$"
                    keyboardType="number-pad"
                    tipPercent={tipPercent.toString()}
                    handleCustomTipChange={handleCustomTipChange}
                    disabled={status ? false : true}
                  />
                </View>
                <View style={[styles.row, {flex: 0.32, marginLeft: 10}]}>
                  <TouchableOpacity
                    style={[
                      styles.incrementDecrementBtn,
                      {
                        borderColor: status ? '#F9F9F9' : Color.primary,
                        backgroundColor: status ? '#F9F9F9' : Color.light,
                      },
                    ]}
                    disabled={status}
                    onPress={decrementTipPercent}>
                    <Icon
                      iconFamily={'AntDesign'}
                      name={'minus'}
                      style={styles.minusStyle}
                      color={Color.tertiary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={status}
                    style={[
                      styles.incrementDecrementBtn,
                      {
                        backgroundColor: status ? '#F9F9F9' : Color.primary,
                        marginLeft: 10,
                        borderColor: status ? '#F9F9F9' : Color.primary,
                      },
                    ]}
                    onPress={incrementTipPercent}>
                    <Icon
                      iconFamily={'Ionicons'}
                      name={'md-add'}
                      color={status ? Color.tertiary : Color.light}
                      style={styles.addStyle}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  styles.row,
                  {
                    width: '100%',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  },
                ]}>
                <Text style={styles.headingRow}>Enter Custom Amount</Text>
                <Switch
                  value={status}
                  onValueChange={() => {
                    setTipPercent(0);
                    setTip(0);
                    setStatus(!status);
                  }}
                />
              </View>
            </>
          )}
        </>
      )}
    </>
  );
};

const CardData = [
  {
    id: 1,
    payment: 'Payment Methods',
    icon: 'credit-card',
    chevron: 'chevron-small-right',
    navLink: 'Payment',
  },
  {
    id: 2,
    payment: 'Get Discounts',
    icon: 'shopping-outline',
    chevron: 'chevron-small-right',
  },
  {
    id: 3,
    payment: 'Add Tips',
    icon: 'plus',
    chevron: 'chevron-small-right',
  },
  {
    id: 4,
    payment: 'Add Order Notes',
    icon: 'plus',
    chevron: 'chevron-small-right',
  },
];
