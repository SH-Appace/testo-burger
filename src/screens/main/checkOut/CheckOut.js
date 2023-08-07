import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import {CardData, TimeData} from './CheckOutDetails';
import styles from './CheckOutStyle';
import {useDispatch, useSelector} from 'react-redux';
import {placeOrder} from '../../../apis/order';
import {FAB, Modal, RadioButton} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import {SkypeIndicator} from 'react-native-indicators';
import BottomPopupRemoveFromCart from '../../../components/BottomPopupRemoveFromCart';
import TextField from '../../../components/TextFeild';
import {couponApply} from '../../../apis/coupon';
import {CartEmptySvg} from '../../../assets/svgs/CheckoutSvg';
import {OrderTypeData} from '../homePage/HomePageDetails';
import {DeliverySvgs, PickupSvgs} from '../../../assets/svgs/HomePage';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import {useBackButton} from '../../../hooks';
import {PaymentSheet, useStripe} from '@stripe/stripe-react-native';
import {stripePost} from '../../../apis/stripe';
import {loyaltyDiscount} from '../../../apis/loyalty';
import {Linking} from 'react-native';
import Loader from '../../../components/Loader';

const SummaryDetails = ({
  item,
  setVisible,
  setPopupData,
  index,
  onShowPopup,
  setAddonsPrice,
  setCartItemIndex,
  setCartItemAmount,
  setCartItemQuantity,
  setVariationsPrice,
}) => {
  let navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        setVisible(true), setPopupData(item);
      }}
      style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item.foodDetails.image}}
          // source={require('../../../assets/images/pics/foodBg.png')}
          style={{width: 80, height: 80, borderRadius: BorderRadius}}
          resizeMode="cover"
        />
        <FAB
          style={styles.fab}
          icon="close"
          customSize={40}
          onPress={() => {
            onShowPopup();
            item.selectedAddOns.map(x =>
              setAddonsPrice(prev => prev + x.price),
            );
            item.selectedVariations.map(x =>
              x.values.map(y =>
                setVariationsPrice(prev => prev + parseInt(y.optionPrice)),
              ),
            );
            setCartItemIndex(index);
            setCartItemAmount(item.foodDetails.price);
            setCartItemQuantity(item.quantity);
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginLeft: 10,
          }}>
          <Text style={styles.Heading}>{item.foodDetails.name}</Text>
          <Text style={{...styles.Heading, color: Color.primary}}>
            ${item.totalPrice}{' '}
            <Text style={{color: Color.greyscale, fontSize: 12}}>
              - View More
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={styles.OneStyle}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.replace('Custom', {
              edit: true,
              productId: item.foodId,
              product: item.foodDetails,
              quantity: item.quantity,
              selectedAddOns: item.selectedAddOns,
              selectedVariations: item.selectedVariations,
              index: index,
              totalPrice: item.totalPrice,
            })
          }>
          <Icon
            iconFamily={'MaterialCommunityIcons'}
            name="pencil-minus"
            size={20}
            color={Color.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

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
}) => {
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
        style={{
          justifyContent: 'space-between',
          margin: 1,
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
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
              <Text
                style={{
                  ...styles.TextStyle,
                  color: Color.tertiary,
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                {' '}
                {item.payment}{' '}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                {discount > 0 && item.id === 2 && (
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      backgroundColor: Color.primary,
                      borderRadius: 15,
                      marginLeft: 5,
                    }}>
                    <Text
                      style={{
                        color: Color.light,
                        fontSize: 12,
                        fontFamily: Font.Urbanist_Light,
                      }}>
                      Discount {discount}%
                    </Text>
                  </View>
                )}
                {pointsDiscount > 0 && item.id === 2 && (
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      backgroundColor: Color.primary,
                      borderRadius: 15,
                      marginLeft: 5,
                    }}>
                    <Text
                      style={{
                        color: Color.light,
                        fontSize: 12,
                        fontFamily: Font.Urbanist_Light,
                      }}>
                      Points Discount ${pointsDiscount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {openInput !== 1 && item.id === 1 && (
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: Color.primary,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    color: Color.light,
                    fontSize: 12,
                    fontFamily: Font.Urbanist_Light,
                  }}>
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
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => setPaymentMethod(1)}
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                    height: 50,
                    borderRadius: BorderRadius,
                    backgroundColor:
                      paymentMethod === 1 ? Color.primary : 'transparent',
                    borderWidth: 1,
                    borderColor:
                      paymentMethod === 1 ? Color.primary : Color.secondary,
                  }}>
                  <Text
                    style={{
                      ...styles.TextStyle,
                      color:
                        paymentMethod === 1 ? Color.light : Color.secondary,
                      fontFamily: Font.Urbanist_Bold,
                    }}>
                    COD
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    initializePaymentSheet();
                    setPaymentMethod(2);
                  }}
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                    height: 50,
                    borderRadius: BorderRadius,
                    backgroundColor:
                      paymentMethod === 2 ? Color.primary : 'transparent',
                    borderColor:
                      paymentMethod === 2 ? Color.primary : Color.secondary,
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      ...styles.TextStyle,
                      color:
                        paymentMethod === 2 ? Color.light : Color.secondary,
                      fontFamily: Font.Urbanist_Bold,
                    }}>
                    Credit Card
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View style={{flex: 0.7, marginRight: 0}}>
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
                      initializePaymentSheet();
                    }}
                    style={{
                      height: 45,
                      borderRadius: BorderRadius,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 10,

                      backgroundColor: Color.primary,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Font.Urbanist_Bold,
                        color: Color.light,
                      }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View style={{flex: 0.7, marginRight: 0}}>
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
                    loyaltyPoints={parseFloat(auth.user.loyalty_point)}
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
                    style={{
                      height: 45,
                      borderRadius: BorderRadius,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 10,

                      backgroundColor: Color.primary,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Font.Urbanist_Bold,
                        color: Color.light,
                      }}>
                      Use Points
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </>
      )}
    </>
  );
};
const DeliveryDetails = ({item, setBranchId, branchId, setSelectedBranch}) => {
  function convertToAMPM(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for AM time
    return `${hours12}:${(minutes < 10 ? '0' : '') + minutes} ${ampm}`;
  }
  const openGoogleMaps = address => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    Linking.openURL(mapUrl);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedBranch(item);
        setBranchId(item.id);
      }}
      style={{
        justifyContent: 'space-between',
        margin: 1,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={{height: 30, width: 30, borderRadius: 30}}
            onPress={() => openGoogleMaps(item.address)}>
            <Icon
              iconFamily={'Entypo'}
              name={'location-pin'}
              size={25}
              color={Color.primary}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                ...styles.TextStyle,
                color: Color.tertiary,
                // marginLeft: 0,
                // marginRight: 5,
                fontSize: 16,
              }}>
              {' '}
              {item.name}{' '}
            </Text>
            <Text
              style={{
                ...styles.TextStyle,
                color: Color.lightGray,
                // marginLeft: 0,
                // marginRight: 5,
              }}>
              {' '}
              {convertToAMPM(item.opening_time)}
              {' - '}
              {convertToAMPM(item.closeing_time)}
            </Text>
          </View>
        </View>
      }
      <RadioButton
        uncheckedColor={Color.primary}
        color={Color.primary}
        value="first"
        status={branchId === item.id ? 'checked' : 'unchecked'}
        onPress={() => {
          setSelectedBranch(item);
          setBranchId(item.id);
        }}
      />
    </TouchableOpacity>
  );
};
const TimeDetails = ({
  item,
  setDeliveryTime,
  setOpen,
  deliveryTime,
  deliveryTimeObject,
  setDeliveryTimeObject,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (item.id === 1) {
          setDeliveryTime('');
          setDeliveryTimeObject(null);
          return;
        } else if (item.id === 2) {
          setOpen(true);
          return;
        }
      }}
      style={{
        justifyContent: 'space-between',
        margin: 1,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Icon
            iconFamily={'MaterialCommunityIcons'}
            name={item.icon}
            size={25}
            color={Color.primary}
          />
          <View>
            <Text
              style={{
                ...styles.TextStyle,
                color: Color.tertiary,
                marginLeft: 5,
                marginRight: 5,
              }}>
              {' '}
              {item.name}{' '}
            </Text>
            {deliveryTimeObject !== null && item.id === 2 && (
              <Text
                style={{
                  ...styles.TextStyle,
                  color: Color.secondary,
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                {' '}
                {deliveryTimeObject.toDateString() +
                  ', ' +
                  deliveryTimeObject.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}{' '}
              </Text>
            )}
          </View>
        </View>
      }
      <RadioButton
        uncheckedColor={Color.primary}
        color={Color.primary}
        value="first"
        status={
          deliveryTime === '' && item.id === 1
            ? 'checked'
            : deliveryTime !== '' && item.id === 2
            ? 'checked'
            : 'unchecked'
        }
        onPress={() => {
          if (item.id === 1) {
            setDeliveryTime('');
            setDeliveryTimeObject(null);
            return;
          } else if (item.id === 2) {
            setOpen(true);
            return;
          }
        }}
      />
    </TouchableOpacity>
  );
};

const PaymentDetails = ({deliveryFee, subTotal, discount, pointsDiscount}) => {
  return (
    <View>
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.TextStyle}> Subtotal </Text>
        <Text style={styles.TotalStyle}>${subTotal} </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.TextStyle}> Delivery Fee </Text>
        <Text style={styles.TotalStyle}>${deliveryFee} </Text>
      </View>
      {discount !== 0 && (
        <View
          style={{
            justifyContent: 'space-between',
            marginVertical: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.TextStyle}> Coupon Discount </Text>
          <Text style={styles.TotalStyle}>{discount}%</Text>
        </View>
      )}
      {pointsDiscount !== 0 && (
        <View
          style={{
            justifyContent: 'space-between',
            marginVertical: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.TextStyle}> Loyalty Points Discount </Text>
          <Text style={styles.TotalStyle}>${pointsDiscount}</Text>
        </View>
      )}

      <View style={GlobalStyle.TopBorderStyle}></View>
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.TextStyle}>Total</Text>
        <Text style={styles.TotalStyle}>
          $
          {subTotal -
            (subTotal / 100) * discount -
            pointsDiscount +
            deliveryFee}
        </Text>
      </View>
    </View>
  );
};

const CheckOut = ({route, item}) => {
  let navigation = useNavigation();
  const [cartData, setCartData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visibleBranch, setVisibleBranch] = useState(false);
  const [popupRemoveFromCart, setPopupRemoveFromCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [popupData, setPopupData] = useState();
  const [addressType, setAddressType] = useState('');
  const [address, setAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [points, setPoints] = useState(0);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [variationsPrice, setVariationsPrice] = useState(0);
  const [cartItemIndex, setCartItemIndex] = useState(0);
  const [cartItemAmount, setCartItemAmount] = useState(0);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const [openInput, setOpenInput] = useState('');
  const [activeBg, setActiveBg] = useState(1);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryTimeObject, setDeliveryTimeObject] = useState(null);
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [branchId, setBranchId] = useState('');
  const [selectedBranch, setSelectedBranch] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [pointsDiscount, setPointsDiscount] = useState(0);
  const [stripeOpen, setStripeOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {cart, auth, branch} = useSelector(state => ({...state}));
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  //STRIPE
  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(`${API_URL}/payment-sheet`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const {paymentIntent, ephemeralKey, customer} = await response.json();

  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   };
  // };
  useEffect(() => {
    if (
      cart.coupon.discount !== 0 &&
      pointsDiscount !== 0 &&
      paymentMethod === 2
    ) {
      initializePaymentSheet();
    } else if (cart.coupon.discount !== 0 && paymentMethod === 2) {
      initializePaymentSheet();
    } else if (pointsDiscount !== 0 && paymentMethod === 2) {
      initializePaymentSheet();
    } else if (cart.coupon.discount === 0 && paymentMethod === 2) {
      initializePaymentSheet();
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.coupon.discount, pointsDiscount]);
  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await stripePost(
        {
          order_amount:
            cart.total -
            (cart.total / 100) * cart.coupon.discount -
            pointsDiscount +
            deliveryFee,
        },
        auth.token,
        setLoading,
      );

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Testo Burger',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      style: 'alwaysDark',
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      billingDetailsCollectionConfiguration: {
        address: PaymentSheet.AddressCollectionMode.NEVER,
      },
      appearance: {
        primaryButton: {
          colors: {
            light: {background: Color.primary},
            dark: {background: Color.primary},
          },
        },
      },
    });
    if (!error) {
      setLoading(false);
    }
  };
  //   appearance: { colors: { light: { primary: Color.primary, }, dark: { primary: Color.primary, }, }, primaryButton: { colors: { light: { background: Color.primary, }, dark: { background: Color.primary, }, }, }, }, }
  // });

  const openPaymentSheet = async () => {
    setStripeOpen(true);
    const {error} = await presentPaymentSheet();

    if (error) {
      setStripeOpen(false);
      // Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      submitHandler();
    }
  };

  useEffect(() => {
    setCartData(cart.addedItems);
    setSubTotal(cart.total);
    setCoupon(cart.coupon.code);
    // const amount =
    // if (cart.total !== 0) initializePaymentSheet();
  }, [refresh]);
  useEffect(() => {
    if (auth.user.default_address !== null) {
      setAddress(auth.user.default_address.address);
      setAddressType(auth.user.default_address.address_type);
    }
  }, [isFocused]);
  useEffect(() => {
    function checkBranchIsOpen() {
      const currentTime = new Date();
      const openingTime = selectedBranch.opening_time;
      const closingTime = selectedBranch.closeing_time;

      const currentTimeString = currentTime.toLocaleTimeString('en-US', {
        hour12: false,
      });

      return (
        currentTimeString >= openingTime && currentTimeString <= closingTime
      );
    }
    if (branchId === '') {
      return;
    } else if (checkBranchIsOpen()) {
      setBtnDisabled(false);
    } else {
      setVisibleBranch(true);
      setBtnDisabled(true);
      setBranchId('');
      setSelectedBranch({});
    }
  }, [branchId]);

  const onClosePopup = () => {
    setPopupRemoveFromCart(false);
  };
  const onShowPopup = () => {
    setPopupRemoveFromCart(true);
  };
  const removeItemFromCart = () => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        index: cartItemIndex,
        amount:
          addonsPrice * cartItemQuantity +
          cartItemAmount * cartItemQuantity +
          variationsPrice,
      },
    });
    setRefresh(!refresh);
    onClosePopup();
  };
  const submitHandler = () => {
    Keyboard.dismiss();

    if (cart.addedItems.length === 0) {
      return showMessage({
        message: 'Your basket is empty!',
        type: 'danger',
      });
    }
    if (!auth.user.default_address) {
      return showMessage({
        message: 'Please set a delivery address!',
        type: 'danger',
      });
    }

    const filtered = cart.addedItems.map(item => {
      item.selectedVariations.map(x => {
        let tempValues = [];
        x.values.map(val => (tempValues = [val.label, ...tempValues]));
        return (x.values = {label: tempValues});
      });
      return item.selectedVariations;
    });

    placeOrder(
      {
        loyalty_discount: cart.loyaltyPoints.enable
          ? cart.loyaltyPoints.discount
          : null,
        branch_id: branchId !== '' ? branchId : null,
        schedule_at: deliveryTime === '' ? null : deliveryTime,
        order_amount:
          subTotal -
          (subTotal / 100) * cart.coupon.discount -
          pointsDiscount +
          deliveryFee,
        payment_method: 'cash_on_delivery',
        order_type: cart.orderType,
        longitude: auth.user.default_address.longitude,
        latitude: auth.user.default_address.latitude,
        dm_tips: null,
        coupon_code: coupon,
        contact_person_name: auth.user.name,
        contact_person_number: auth.user.phone,
        address: auth.user.default_address.address,
        address_type: auth.user.default_address.address_type,
        floor: auth.user.default_address.floor,
        road: auth.user.default_address.road,
        house: auth.user.default_address.house,
        order_note: 'Bring it Hot!',
        cart: cart.addedItems.map(item => {
          return {
            food_id: item.foodId,
            item_campaign_id: null,
            variations: filtered.flat(),
            quantity: item.quantity,
            price: item.foodDetails.price,
            name: item.foodDetails.name,
            image: item.foodDetails.image,
            add_on_ids: item.selectedAddOns.map(item => item.id),
            add_on_qtys: item.selectedAddOns.map(qty => item.quantity),
          };
        }),
      },
      auth.token,
      setLoading,
      dispatch,
      navigation,
    );
  };
  const couponHandler = () => {
    Keyboard.dismiss();
    if (coupon === '') {
      return showMessage({
        message: 'Enter coupon to apply!',
        type: 'danger',
      });
    }
    setOpenInput(false);
    couponApply({code: coupon}, auth.token, setLoading, dispatch);
  };
  const removeCoupon = () => {
    dispatch({
      type: 'REMOVE_COUPON',
    });
    setOpenInput(false);
    setCoupon('');
  };

  //DATE PICKER
  const onDismissSingle = () => {
    setOpen(false);
    setDeliveryTime('');
    setDeliveryTimeObject(null);
  };

  const onConfirmSingle = params => {
    if (params.date === undefined) {
      return;
    }
    setOpen(false);
    setOpenTime(true);
  };

  // TIME PICKER
  const onDismiss = () => {
    setOpenTime(false);
    setDeliveryTime('');
    setDeliveryTimeObject(null);
  };

  const onConfirm = params => {
    setOpenTime(false);
    const hours = params.hours < 10 ? '0' + params.hours : params.hours;
    const minutes = params.minutes < 10 ? '0' + params.minutes : params.minutes;

    const [year, month, day] = deliveryTime.split('-');
    const dateObject = new Date(year, month - 1, day, hours, minutes, '00');

    setDeliveryTimeObject(dateObject);
    setDeliveryTime(prev => `${prev} ${hours}:${minutes}:00`);
  };

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9F9F9'}}>
      <StatusBar
        animated={true}
        backgroundColor={
          loading ? '#555555' : stripeOpen ? '#555555' : '#F9F9F9'
        }
        barStyle={loading ? 'light-content' : 'dark-content'}
        showHideTransition={'fade'}
      />
      <View style={{paddingHorizontal: Window.fixPadding * 2}}>
        <AppBar
          center={
            <Text style={GlobalStyle.AppCenterTextStyle}>
              {cartData.length > 0 ? 'Checkout Orders' : ''}
            </Text>
          }
        />
      </View>
      {cartData.length > 0 ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            paddingBottom: 15,
          }}
          keyboardShouldPersistTaps="handled">
          <FlatList
            data={OrderTypeData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Window.fixPadding * 2,
            }}
            initialNumToRender={5}
            scrollEnabled={false}
            renderItem={({item}) => (
              <OrderType
                setActiveBg={setActiveBg}
                activeBg={activeBg}
                cart={cart}
                item={item}
                setBranchId={setBranchId}
                setSelectedBranch={setSelectedBranch}
              />
            )}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
          {cart.orderType === 'delivery' ? (
            <View
              style={{
                backgroundColor: Color.light,
                padding: 15,
                marginTop: 20,
                borderRadius: BorderRadius,
                marginHorizontal: Window.fixPadding * 2,
              }}>
              <Text style={styles.DeliveryStyle}>Deliver to</Text>
              <View style={GlobalStyle.TopBorderStyle}></View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Delivery', {
                    openPopupParam: false,
                    placeName: '',
                    coords: {},
                    fromProfile: false,
                  })
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {auth.user.default_address ? (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: Color.primary,
                        padding: 15,
                        borderRadius: 50,
                      }}>
                      <Icon
                        iconFamily={'Ionicons'}
                        color={Color.light}
                        name="ios-location-sharp"
                        size={20}
                      />
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 15}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 1,
                        }}>
                        <Text style={styles.Heading}>{addressType}</Text>
                        <Text
                          style={{
                            lineHeight: 12,
                            fontSize: 10,
                            backgroundColor: Color.primary,
                            color: Color.light,
                            padding: 8,
                            marginLeft: 10,
                            fontFamily: Font.Urbanist_SemiBold,
                            borderRadius: BorderRadius,
                          }}>
                          Default
                        </Text>
                      </View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 14,
                          color: Color.greyscale,
                          fontFamily: Font.Urbanist_Medium,
                          width: Window.width / 1.8,
                        }}>
                        {address}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text style={[styles.Heading, {fontSize: 12}]}>
                    Add New Delivery Address
                  </Text>
                )}
                <Icon
                  iconFamily={'Entypo'}
                  name="chevron-small-right"
                  size={25}
                  color={Color.primary}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.BoxContainerStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.DeliveryStyle}>Select Branch</Text>
                {branchId === '' && (
                  <Icon
                    iconFamily={'Ionicons'}
                    color={Color.primary}
                    name="warning"
                    size={22}
                  />
                )}
              </View>
              <View style={GlobalStyle.TopBorderStyle} />
              {branch[0].map((item, index) => (
                <DeliveryDetails
                  branchId={branchId}
                  setBranchId={setBranchId}
                  setSelectedBranch={setSelectedBranch}
                  item={item}
                  key={index}
                />
              ))}
            </View>
          )}
          <View style={styles.BoxContainerStyle}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.DeliveryStyle}>Select When</Text>
            </View>
            <View style={GlobalStyle.TopBorderStyle} />
            {TimeData.map((item, index) => (
              <TimeDetails
                setDeliveryTime={setDeliveryTime}
                deliveryTime={deliveryTime}
                deliveryTimeObject={deliveryTimeObject}
                setDeliveryTimeObject={setDeliveryTimeObject}
                setOpen={setOpen}
                item={item}
                key={index}
              />
            ))}
          </View>
          <View style={styles.BoxContainerStyle}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.DeliveryStyle}>Order Summary</Text>
            </View>
            <View style={GlobalStyle.TopBorderStyle} />
            {cartData.length > 0 ? (
              cartData.map((item, index) => (
                <>
                  <SummaryDetails
                    item={item}
                    visible={visible}
                    setVisible={setVisible}
                    setPopupData={setPopupData}
                    index={index}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    onShowPopup={onShowPopup}
                    setAddonsPrice={setAddonsPrice}
                    setVariationsPrice={setVariationsPrice}
                    setCartItemIndex={setCartItemIndex}
                    setCartItemAmount={setCartItemAmount}
                    setCartItemQuantity={setCartItemQuantity}
                  />
                  {index + 1 === cartData.length ? null : (
                    <View style={GlobalStyle.TopBorderStyle} />
                  )}
                </>
              ))
            ) : (
              <Text style={[styles.Heading, {fontSize: 12}]}>
                Your basket is empty
              </Text>
            )}
          </View>

          <View style={styles.BoxContainerStyle}>
            {CardData.map((item, index) => (
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
              />
            ))}
          </View>

          <View style={styles.BoxContainerStyle}>
            <PaymentDetails
              subTotal={subTotal}
              deliveryFee={deliveryFee}
              discount={cart.coupon.discount}
              pointsDiscount={pointsDiscount}
            />
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <CartEmptySvg width={Window.width / 1.5} height={Window.height / 3} />
          <Text
            style={{
              color: Color.tertiary,
              fontFamily: Font.Urbanist_Bold,
              fontSize: 30,
              marginTop: 22,
            }}>
            Hungry?
          </Text>
          <Text
            style={{
              color: Color.tertiary,
              fontFamily: Font.Urbanist_Regular,
              fontSize: 16,
              textAlign: 'center',
              marginTop: 12,
            }}>
            You haven't added anything to your basket!
          </Text>
        </View>
      )}
      <View
        style={[
          GlobalStyle.BottomButtonContainer,
          {paddingHorizontal: Window.fixPadding * 2},
        ]}>
        <Button
          disabled={cart.orderType === 'delivery' ? false : btnDisabled}
          text={
            cartData.length > 0
              ? `Place Order - $${
                  subTotal -
                  (subTotal / 100) * cart.coupon.discount -
                  pointsDiscount +
                  deliveryFee
                }`
              : 'Browse Menu'
          }
          icon="mail"
          isIcon={false}
          theme="primary"
          onPressFunc={
            cartData.length > 0
              ? () => {
                  if (paymentMethod === 1) {
                    submitHandler();
                  } else {
                    openPaymentSheet();
                  }
                }
              : () =>
                  navigation.reset({
                    index: 0,

                    routes: [
                      {
                        name: 'BottomTabScreen',
                        state: {
                          routes: [{name: 'Menu'}],
                        },
                      },
                    ],
                  })
          }
        />
      </View>

      {popupData && (
        <Popup
          // item={item}
          visible={visible}
          setVisible={setVisible}
          item={popupData}
        />
      )}

      <BranchPopup
        // item={item}
        visible={visibleBranch}
        setVisible={setVisibleBranch}
      />

      {loading && <Loader />}

      <BottomPopupRemoveFromCart
        ref={target => (popupRef = target)}
        onTouchOutside={onClosePopup}
        openPopup={popupRemoveFromCart}
        removeItemFromCart={removeItemFromCart}
      />
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={undefined}
        onConfirm={onConfirmSingle}
        // onConfirm={() => console.log(deliveryTime)}
        onChange={params => {
          const res = new Date(params.date);
          const year = res.getUTCFullYear();
          const month = res.getUTCMonth() + 1; // months are zero-based
          const day = res.getUTCDate();
          setDeliveryTime(
            `${year}-${month < 10 ? '0' : ''}${month}-${
              day < 10 ? '0' : ''
            }${day}`,
          );
        }}
        saveLabel={deliveryTime !== '' ? 'Next' : 'Select date to continue'}
        label={' '}
        editIcon={' '}
        validRange={{startDate: new Date()}}
      />
      <TimePickerModal
        visible={openTime}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12}
        minutes={0}
        confirmLabel={'Save'}
      />
    </SafeAreaView>
  );
};

const Popup = ({item, visible, setVisible}) => {
  const hideModal = () => {
    setVisible(false);
  };
  const containerStyle = {
    marginHorizontal: 20,

    borderRadius: BorderRadius,
    backgroundColor: Color.light,
  };
  return (
    <Modal
      theme={{
        colors: {
          backdrop: '#000000AA',
        },
      }}
      animationType="fade"
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}>
      <View
        style={{
          paddingVertical: 40,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: Font.Urbanist_Bold,
            // lineHeight: 24,
            color: Color.tertiary,
            marginBottom: 20,
          }}>
          Food Items
        </Text>

        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Image
            style={{width: 80, height: 80, borderRadius: 15}}
            // source={{uri: item.foodDetails.image}}
            source={require('../../../assets/images/pics/foodBg.png')}
            resizeMode="cover"
          />
          <View style={{flexDirection: 'column', flex: 1}}>
            <View
              style={{
                justifyContent: 'space-between',
                marginLeft: 10,
                flexDirection: 'row',
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Color.tertiary,
                  fontFamily: Font.Urbanist_Bold,
                  width: 150,
                }}>
                {item.quantity > 1 && `x${item.quantity} `}
                {item.foodDetails.name}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: Color.secondary,
                  fontFamily: Font.Urbanist_Bold,
                }}>
                ${item.foodDetails.price}
              </Text>
            </View>
            {item.selectedAddOns.map((x, i) => (
              <View
                style={{
                  justifyContent: 'space-between',
                  marginLeft: 10,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    ...GlobalStyle.BasicTextStyle,
                    color: '#8A94A3',
                    fontSize: 14,
                  }}>
                  {item.quantity > 1 && `x${item.quantity} `}
                  {x.name}
                </Text>
                <Text
                  style={{
                    ...GlobalStyle.BasicTextStyle,
                    color: '#8A94A3',
                    fontSize: 13,
                  }}>
                  ${x.price}
                </Text>
              </View>
            ))}
            {item.selectedVariations.map((x, i) =>
              x.values.map((variation, index) => (
                <View
                  style={{
                    justifyContent: 'space-between',
                    marginLeft: 10,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      ...GlobalStyle.BasicTextStyle,
                      color: '#8A94A3',
                      fontSize: 14,
                    }}>
                    {item.quantity > 1 && `x${item.quantity} `}
                    {variation.label}
                  </Text>
                  <Text
                    style={{
                      ...GlobalStyle.BasicTextStyle,
                      color: '#8A94A3',
                      fontSize: 13,
                    }}>
                    ${variation.optionPrice}
                  </Text>
                </View>
              )),
            )}
          </View>
        </View>

        <Button theme="primary" text="OK" onPressFunc={() => hideModal()} />
      </View>
    </Modal>
  );
};
const BranchPopup = ({visible, setVisible}) => {
  const hideModal = () => {
    setVisible(false);
  };
  const containerStyle = {
    marginHorizontal: 20,

    borderRadius: BorderRadius,
    backgroundColor: Color.light,
  };
  return (
    <Modal
      theme={{
        colors: {
          backdrop: '#000000AA',
        },
      }}
      animationType="fade"
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}>
      <View
        style={{
          paddingVertical: 40,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: Font.Urbanist_Bold,
            // lineHeight: 24,
            color: Color.primary,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Warning!
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Font.Urbanist_Medium,
            // lineHeight: 24,
            color: Color.tertiary,
            marginBottom: 25,
            textAlign: 'center',
          }}>
          Selected branch is closed at the moment. Sorry for the inconvinience,
          Please try again later or try another branch!
        </Text>

        <Button theme="primary" text="OK" onPressFunc={() => hideModal()} />
      </View>
    </Modal>
  );
};
const OrderType = ({item, cart, setBranchId, setSelectedBranch}) => {
  const dispatch = useDispatch();

  const updateOrderType = type => {
    dispatch({
      type: 'UPDATE_ORDER_TYPE',
      payload: type,
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (item.id === 2) {
          setBranchId('');
          setSelectedBranch({});
        }
        updateOrderType(item.value);
      }}
      style={{
        flex: 1,
        height: 75,
        borderRadius: BorderRadius,
        backgroundColor:
          cart.orderType === item.value ? Color.secondary : Color.light,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: item.id === 1 ? 10 : 0,
        marginLeft: item.id === 2 ? 10 : 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
      }}>
      {item.id === 1 ? (
        <PickupSvgs
          color={cart.orderType === item.value ? Color.light : '#2A3B56'}
        />
      ) : item.id === 2 ? (
        <DeliverySvgs
          color={cart.orderType === item.value ? Color.light : '#2A3B56'}
        />
      ) : null}
      <View style={{marginLeft: 8, width: 85}}>
        <Text
          style={{
            color:
              cart.orderType === item.value ? Color.light : Color.headingSm,
            fontSize: 15,
            fontFamily: Font.Urbanist_Bold,
          }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            paddingTop: 0.5,
            color:
              cart.orderType === item.value ? Color.tertiary : Color.greyscale,
            fontSize: 11,
            fontFamily: Font.Urbanist_Medium,
          }}>
          {item.discount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CheckOut;
