import {
  Alert,
  Linking,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {BorderRadius, Color} from '../globalStyle/Theme';
import PhoneInput from 'react-native-phone-number-input';
import {Font} from '../globalStyle/Theme';
import Geolocation from 'react-native-geolocation-service';
import {getGeoInfo} from '../apis/geoInfo';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {TextMask, TextInputMask} from 'react-native-masked-text';

const PhoneInputComponent = ({
  placeholder,
  setLoading,
  value,
  disabled = false,
  onChanged = val => console.log('No Onchange Event', val),
  setRefresh,
}) => {
  const [focused, setFocused] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [newNumber, setNewNumber] = useState('');

  const phoneInputRef = useRef(null);
  const auth = useSelector(state => (state.auth));

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        Geolocation.getCurrentPosition(
          position => {
            getGeoInfo(
              position.coords.latitude,
              position.coords.longitude,
              setCountryCode,
              setLoading,
            );
          },
          error => {
            console.log(error.message.toString());
          },
          {
            showLocationDialog: true,
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
          },
        );
        return true;
      } else if (granted === 'denied') {
        Alert.alert(
          'Geolocation Permission Required',
          'App needs access to your location to sign in. Please go to app settings and grant permission.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
        setLoading(false);
        setRefresh(true);
      } else if (granted === 'never_ask_again') {
        Alert.alert(
          'Geolocation Permission Required',
          'App needs access to your location to sign in. Please go to app settings and grant permission.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
        setLoading(false);
        setRefresh(true);
      } else {
        setLoading(false);
        setRefresh(true);
        showMessage({
          message: 'Location permissions are required!',
          type: 'danger',
        });
        return false;
      }
    } catch (err) {
      setLoading(false);
      return false;
    }
  };
  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);
  useEffect(() => {
    if (auth !== null) {
      const timer = setTimeout(async () => {
        setNewNumber(
          auth.user.phone.replace(
            `+${phoneInputRef.current.getCallingCode()}`,
            '',
          ),
        );
      }, 50);
      return () => clearTimeout(timer);
    }
    setLoading(false);
  }, [auth, phoneInputRef]);
  // useEffect(() => {
  //   console.log('PHONEEEE', newNumber);
  //   if (countryCode !== '') {
  //     const timer = setTimeout(async () => {
  //       setNewNumber(value.phone);
  //     }, 0);
  //     return () => clearTimeout(timer);
  //   }
  // }, [countryCode]);
  return (
    <View
      style={[
        styles.TextInputContainer,
        {
          backgroundColor: focused ? 'rgba(246, 181, 29, 0.10)' : '#F9F9F9',
          borderWidth: focused ? 1 : 0,
          borderColor: Color.secondary,
        },
      ]}>
      {countryCode !== '' ? (
        <PhoneInput
          ref={phoneInputRef}
          defaultCode={countryCode}
          disabled
          disableArrowIcon
          containerStyle={{
            height: 56,
            marginVertical: 12,
            width: 100,
            borderRadius: 16,
            backgroundColor: 'transparent',
          }}
          textContainerStyle={{
            backgroundColor: 'transparent',
          }}
          textInputStyle={{transform: [{scale: 0}]}}
          codeTextStyle={{
            marginLeft: -10,
            fontSize: 14,
            fontFamily: Font.Urbanist_SemiBold,
            color: disabled ? '#bbb' : Color.tertiary,
          }}
          flagButtonStyle={{
            paddingHorizontal: 0,
            width: 25,
            minWidth: 0,
            marginLeft: 10,
          }}
        />
      ) : (
        <View style={{width: 100}} />
      )}
      {/* <TextInput
        style={{
          flex: 1,
          fontSize: 14,
          fontFamily: Font.Urbanist_SemiBold,
          color: disabled ? '#bbb' : '#807F7E',
          marginLeft: -25,
        }}
        placeholder={placeholder}
        placeholderTextColor={'#807F7E'}
        onChangeText={text => {
          const newtext = text.replace(/^0+/, '');
          setNewNumber(newtext.replace(/\s/g, ''));
          onChanged(prevState => ({
            ...prevState,
            code: '+' + phoneInputRef.current.getCallingCode(),
            phone: newtext.replace(/\s/g, ''),
          }));
        }}
        value={newNumber}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="phone-pad"
        editable={disabled ? false : true}
      /> */}
      <TextInputMask
        style={{
          flex: 1,
          fontSize: 14,
          fontFamily: Font.Urbanist_Regular,
          color: disabled ? '#bbb' : Color.tertiary,
          marginLeft: -35,
        }}
        type={'custom'}
        options={{
          mask: '999-999-9999',
        }}
        placeholder={'Enter your phone number'}
        placeholderTextColor={'#807F7E'}
        onChangeText={text => {
          const newtext = text
            .replace(/^0|[^\d\s]/g, '')
            .replace(/\s+/g, '')
            .substring(0, 10);
          // onChangeHandler(newtext, formKey);
          setNewNumber(newtext);
          onChanged(prevState => ({
            ...prevState,
            code: '+' + phoneInputRef.current.getCallingCode(),
            phone: newtext,
          }));
        }}
        value={newNumber}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="phone-pad"
        editable={disabled ? false : true}
      />
    </View>
  );
};

export default PhoneInputComponent;

const styles = StyleSheet.create({
  TextInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    height: 56,
    borderRadius: BorderRadius,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  TextInputIcon: {
    flex: 1,
    textAlign: 'center',
    fontSize: 23,
  },
});
