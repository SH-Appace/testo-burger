import React, {Component, useState} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  ImageBackground,
  Image,
  Keyboard,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextField from '../../../components/TextFeild';
import Button from '../../../components/Button';
import {Modal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {couponApply} from '../../../apis/coupon';
import {SkypeIndicator} from 'react-native-indicators';
import {showMessage} from 'react-native-flash-message';
import {useBackButton} from '../../../hooks';
import {StatusBar} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NotLoginPopup from '../../../components/NotLoginPopup';

const QRCode = ({navigation}) => {
  const [coupon, setCoupon] = useState('');
  const [visiblePlaced, setVisiblePlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleNotLoginPopup, setVisibleNotLoginPopup] = useState(false);

  const {auth} = useSelector(state => ({...state}));
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const onSuccess = e => {
    
    if (coupon !== '') {
      return;
    }

    if (JSON.parse(e.data).key === 'foodu-001') {
      if (!auth.user) {
        setVisibleNotLoginPopup(true);
        return;
      }
      setCoupon(JSON.parse(e.data).code);
      couponApply(
        {code: JSON.parse(e.data).code},
        auth.token,
        setLoading,
        dispatch,
        showModal,
      );
    } else {
      showMessage({
        message: 'Invalid QR Code',
        type: 'danger',
      });
    }
  };
  const applyHandler = () => {
    Keyboard.dismiss();
    if (coupon === '') {
      return showMessage({
        message: 'Enter coupon to apply!',
        type: 'danger',
      });
    }
    if (!auth.user) {
      setVisibleNotLoginPopup(true);
      return;
    }

    couponApply({code: coupon}, auth.token, setLoading, dispatch, showModal);
  };
  const hideModal = () => {
    setVisiblePlaced(false);
  };
  const showModal = () => {
    setVisiblePlaced(true);
  };
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={'#961111'}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <ImageBackground
        source={require('../../../assets/images/pics/backgroundBurger.png')}
        resizeMode="cover"
        style={{flex: 1,paddingTop: insets.top}}>
        <View style={{paddingHorizontal: Window.fixPadding * 2}}>
          <AppBar
            iconColor={Color.light}
            center={
              <Text
                style={[GlobalStyle.AppCenterTextStyle, {color: Color.light}]}>
                Scan QR Code
              </Text>
            }
          />
        </View>
        <ImageBackground
          source={require('../../../assets/images/pics/qrBg.png')}
          resizeMode="contain"
          style={{
            alignSelf: 'center',
            width: Window.width / 1.1,
            height: Window.height / 1.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: Window.width / 1.4,
              height: Window.height / 1.5,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: Window.width / 1.4,
                height: Window.height / 2.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.heading}>
                Align the QR code within the frame to scan.
              </Text>
              <ImageBackground
                source={require('../../../assets/images/pics/BarcodeScan.png')}
                resizeMode="contain"
                style={{
                  marginBottom: -50,
                  marginTop: 30,
                  width: Window.width / 2,
                  height: Window.width / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: Window.width / 2.2,
                    height: Window.width / 2.2,
                    borderRadius: 10,
                  }}>
                  <QRCodeScanner
                    reactivate={true}
                    showMarker={false}
                    onRead={onSuccess}
                    cameraStyle={{
                      width: Window.width / 2.2,
                      height: Window.width / 2.5,
                    }}
                    containerStyle={{
                      borderRadius: 10,
                      width: Window.width / 2.2,
                      height: Window.width / 2.2,
                      overflow: 'hidden',
                    }}
                    flashMode={RNCamera.Constants.FlashMode.off}
                  />
                </View>
              </ImageBackground>
            </View>
            <View
              style={{
                width: Window.width / 1.4,
                height: Window.height / 4.8,
                alignItems: 'center',
                paddingTop: 20,
                justifyContent: 'space-evenly',
              }}>
              <Text style={styles.heading}>
                Or enter your Discount Codecode below
              </Text>
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
                  />
                </View>
                <View style={{flex: 0.3, marginLeft: 10}}>
                  <TouchableOpacity
                    onPress={applyHandler}
                    style={{
                      height: 45,
                      borderRadius: 16,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 10,

                      backgroundColor: Color.primary,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: Font.Urbanist_Bold,
                        color: Color.light,
                      }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
      <CouponAppliedPopup
        visible={visiblePlaced}
        hideModal={hideModal}
        navigation={navigation}
      />
      <NotLoginPopup
        visible={visibleNotLoginPopup}
        setVisible={setVisibleNotLoginPopup}
        message='Please login to use coupon Code'
      />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#000000AA',
          }}>
          <SkypeIndicator size={50} color={Color.grey} />
        </View>
      )}
    </View>
  );
};
export default QRCode;
const CouponAppliedPopup = ({visible, hideModal, navigation}) => {
  return (
    <Modal
      theme={{
        colors: {
          backdrop: '#000000AA',
        },
      }}
      animationType="fade"
      transparent={true}
      visible={visible}
      onDismiss={hideModal}
      // contentContainerStyle={containerStyle}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'center',
          paddingHorizontal: 30,
        }}>
        <View
          style={{
            height: 443,
            backgroundColor: Color.light,
            borderRadius: 20,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            justifyContent: 'center',
          }}>
          <Image
            style={{alignSelf: 'center', width: 160, height: 160}}
            source={require('../../../assets/images/pics/SmileEmoji.png')}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: Font.Urbanist_Bold,
              lineHeight: 24,
              textAlign: 'center',
              color: Color.primary,
              marginTop: 20,
            }}>
            Coupon Code Applied
          </Text>
          <View
            style={{
              marginVertical: 25,
              width: 155,
              alignSelf: 'center',
            }}>
            <Text style={{...GlobalStyle.BasicTextStyle, textAlign: 'center'}}>
              Enjoy your discount in the next order :)
            </Text>
          </View>
          <Button
            theme="primary"
            text="OK"
            onPressFunc={() => {
              hideModal();
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 24,
    fontFamily: Font.Urbanist_Bold,
    color: Color.secondary,
  },
  buttonTouchable: {
    padding: 16,
  },
  heading: {
    fontFamily: Font.Urbanist_Medium,
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    width: 200,
  },
});
