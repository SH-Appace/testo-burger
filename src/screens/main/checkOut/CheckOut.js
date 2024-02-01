import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Keyboard,
  StatusBar,
  TextInput,
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
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {placeOrder} from '../../../apis/order';
import {Modal} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import BottomPopupRemoveFromCart from '../../../components/BottomPopupRemoveFromCart';
import {couponApply} from '../../../apis/coupon';
import {CartEmptySvg} from '../../../assets/svgs/CheckoutSvg';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import {useBackButton} from '../../../hooks';
import {PaymentSheet, useStripe} from '@stripe/stripe-react-native';
import {stripePost} from '../../../apis/stripe';
import Loader from '../../../components/Loader';
import OrderType from '../../../components/OrderType';
import CheckoutDeliverTo from '../../../components/CheckoutDeliverTo';
import CheckOutSelectBranch from '../../../components/CheckOutSelectBranch';
import CheckoutSelectWhen from '../../../components/CheckoutSelectWhen';
import CheckoutSummaryDetails from '../../../components/CheckoutSummaryDetails';
import CheckoutOptions from '../../../components/CheckoutOptions';
import CheckoutPaymentDetails from '../../../components/CheckoutPaymentDetails';
import NotLoginPopup from '../../../components/NotLoginPopup';

const CheckOut = ({route, item}) => {
  let navigation = useNavigation();
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visibleNotLoginPopup, setVisibleNotLoginPopup] = useState(false);
  const [visibleBranch, setVisibleBranch] = useState(false);
  const [popupRemoveFromCart, setPopupRemoveFromCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [popupData, setPopupData] = useState();
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
  const [tip, setTip] = useState(0);
  const [orderNote, setOrderNote] = useState('');
  const dispatch = useDispatch();

  const {cart, auth} = useSelector(state => ({...state}));
  //STRIPE
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
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
    } else if (tip !== 0) {
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
            deliveryFee +
            tip,
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
    setSubTotal(cart.total);
    setCoupon(cart.coupon.code);
    // const amount =
    // if (cart.total !== 0) initializePaymentSheet();
  }, [refresh]);
  // useEffect(() => {
  //   if (auth.user.default_address !== null) {
  //     setAddress(auth.user.default_address.address);
  //     setAddressType(auth.user.default_address.address_type);
  //   }
  // }, [isFocused]);
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

    if (!auth.user) {
      setVisibleNotLoginPopup(true);
      return;
    }

    if (cart.addedItems.length === 0) {
      showMessage({
        message: 'Your basket is empty!',
        type: 'danger',
      });
      return;
    }

    if (!auth.user.default_address && cart.orderType === 'delivery') {
      showMessage({
        message:
          'Please set a delivery address! Delivery Address is compulsory.',
        type: 'danger',
      });
      return;
    }

    const filtered = cart.addedItems.map(item => ({
      ...item,
      selectedVariations: item.selectedVariations.map(x => ({
        ...x,
        values: {label: x.values.map(val => val.label).reverse()},
      })),
    }));

    const orderData = {
      loyalty_discount: pointsDiscount,
      branch_id: branchId || null,
      schedule_at: cart.orderType === 'delivery' ? deliveryTime || null : null,
      order_amount:
        subTotal -
        (subTotal / 100) * cart.coupon.discount -
        pointsDiscount +
        deliveryFee,
      payment_method: 'cash_on_delivery',
      order_type: cart.orderType,
      longitude:
        cart.orderType === 'delivery'
          ? auth.user.default_address.longitude
          : null,
      latitude:
        cart.orderType === 'delivery'
          ? auth.user.default_address.latitude
          : null,
      dm_tips: tip,
      coupon_code: coupon,
      contact_person_name: auth.user.name,
      contact_person_number: auth.user.phone,
      address:
        cart.orderType === 'delivery'
          ? auth.user.default_address.address
          : null,
      address_type:
        cart.orderType === 'delivery'
          ? auth.user.default_address.address_type
          : null,
      floor:
        cart.orderType === 'delivery' ? auth.user.default_address.floor : null,
      road:
        cart.orderType === 'delivery' ? auth.user.default_address.road : null,
      house:
        cart.orderType === 'delivery' ? auth.user.default_address.house : null,
      order_note: orderNote,
      cart: filtered.map(item => ({
        food_id: item.foodId,
        note: item.note,
        item_campaign_id: null,
        variations: item.selectedVariations.flat(),
        quantity: item.quantity,
        price: item.foodDetails.price,
        name: item.foodDetails.name,
        image: item.foodDetails.image,
        add_on_ids: item.selectedAddOns.map(addOn => addOn.id),
        add_on_qtys: item.selectedAddOns.map(addOn => item.quantity),
      })),
    };

    placeOrder(
      orderData,
      auth.token,
      setLoading,
      dispatch,
      navigation,
      setCoupon,
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
              {cart.addedItems.length > 0 ? 'Checkout Orders' : ''}
            </Text>
          }
        />
      </View>
      {cart.addedItems.length > 0 ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 20,
          }}
          keyboardShouldPersistTaps="handled">
          <OrderType
            setActiveBg={setActiveBg}
            activeBg={activeBg}
            setBranchId={setBranchId}
            setSelectedBranch={setSelectedBranch}
          />
          {cart.orderType === 'delivery' ? (
            <CheckoutDeliverTo />
          ) : (
            <CheckOutSelectBranch
              branchId={branchId}
              setBranchId={setBranchId}
              setSelectedBranch={setSelectedBranch}
            />
          )}
          <CheckoutSelectWhen
            setDeliveryTime={setDeliveryTime}
            deliveryTime={deliveryTime}
            deliveryTimeObject={deliveryTimeObject}
            setDeliveryTimeObject={setDeliveryTimeObject}
            setOpen={setOpen}
          />
          <CheckoutSummaryDetails
            visible={visible}
            setVisible={setVisible}
            setPopupData={setPopupData}
            setRefresh={setRefresh}
            refresh={refresh}
            onShowPopup={onShowPopup}
            setAddonsPrice={setAddonsPrice}
            setVariationsPrice={setVariationsPrice}
            setCartItemIndex={setCartItemIndex}
            setCartItemAmount={setCartItemAmount}
            setCartItemQuantity={setCartItemQuantity}
          />

          <CheckoutOptions
            setOpenInput={setOpenInput}
            openInput={openInput}
            coupon={coupon}
            setCoupon={setCoupon}
            cart={cart}
            removeCoupon={removeCoupon}
            couponHandler={couponHandler}
            setPoints={setPoints}
            points={points}
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

          <CheckoutPaymentDetails
            subTotal={subTotal}
            deliveryFee={deliveryFee}
            discount={cart.coupon.discount}
            pointsDiscount={pointsDiscount}
            tip={tip}
          />
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
            cart.addedItems.length > 0
              ? `Place Order - $${
                  subTotal -
                  (subTotal / 100) * cart.coupon.discount -
                  pointsDiscount +
                  deliveryFee +
                  tip
                }`
              : 'Browse Menu'
          }
          icon="mail"
          isIcon={false}
          theme="primary"
          onPressFunc={
            cart.addedItems.length > 0
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

      <NotLoginPopup
        visible={visibleNotLoginPopup}
        setVisible={setVisibleNotLoginPopup}
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

export default CheckOut;
