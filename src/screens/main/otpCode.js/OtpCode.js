import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {Color, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import stylesForOtp from './OtpStyle';
import styles from '../../auth/AuthStyle';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import {SkypeIndicator} from 'react-native-indicators';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {verifyPhoneReq} from '../../../apis/auth';
import {useBackButton} from '../../../hooks';

const CELL_COUNT = 6;

const OtpCode = ({navigation, route}) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [time, setTime] = useState(props.initialValue || 60);
  const [checkCode, setCheckCode] = useState(null);
  const timerRef = useRef(time);
  const dispatch = useDispatch();

  const {data} = route.params;
  useEffect(() => {
    if (route.params) {
      setCheckCode(route.params.confirm);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  const verify = async () => {
    if (value.length <= 5) {
      return showMessage({
        message: 'Please enter 6 digit OTP code!',
        type: 'danger',
      });
    }
    setLoading(true);
    try {
      const confirmed = await checkCode.confirm(value);
      if (confirmed) {
        showMessage({
          message: 'Confirmed!',
          type: 'success',
        });
        if (route.params.fromForgotPassword === true) {
          navigation.replace('ResetPassword', {
            userId: data.user.id,
          });
        } else {
          verifyPhoneReq(
            {phone: route.params.credentials.phone},
            setLoading,
            dispatch,
            data,
            route.params.credentials,
            route.params.isFirstLogin === 1
              ? () =>
                  navigation.replace('EditProfile', {
                    fromOTPcode: true,
                  })
              : () => navigation.replace('DrawerNavigator'),
          );
        }
      }
    } catch (e) {
      showMessage({
        message: 'Invalid OTP code. Please try again!',
        type: 'danger',
      });
      setLoading(false);
    }
  };

  const resend = async () => {
    setLoading(true);

    const confirmation = await auth().signInWithPhoneNumber(data.user.phone);
    if (confirmation) {
      showMessage({
        message: 'OTP sent successfully!',
        type: 'success',
      });
      setCheckCode(confirmation);
      setLoading(false);
    }
  };
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={{...GlobalStyle.Container}}>
      <StatusBar
        translucent
        backgroundColor={Color.light}
        barStyle={'dark-content'}
      />
      <AppBar
        center={
          <Text style={GlobalStyle.AppCenterTextStyle}>
            OTP Code Verification
          </Text>
        }
        right={<Text style={{color: Color.black}}></Text>}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={stylesForOtp.textStyle}>
            Code has been send to {data.user.phone}
          </Text>
        </View>
        <View style={{marginVertical: 60}}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[stylesForOtp.cell, isFocused && stylesForOtp.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          {time !== 0 ? (
            <Text style={stylesForOtp.textStyle}>
              Resend code in <Text style={{color: Color.primary}}>{time}</Text>s
            </Text>
          ) : (
            <Text style={stylesForOtp.textStyle} onPress={resend}>
              <Text style={{color: Color.primary}}>Resend OTP Code</Text>
            </Text>
          )}
        </View>
      </View>
      <View style={GlobalStyle.BottomButtonContainer}>
        <Button
          text="Verify"
          icon="mail"
          isIcon={false}
          theme="primary"
          // navLink="EditProfile"
          onPressFunc={() => verify()}
        />
      </View>
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
    </SafeAreaView>
  );
};

export default OtpCode;
