import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Keyboard,
  Linking,
  Alert,
  Clipboard,
} from 'react-native';
import Button from '../../../components/Button';
import TextField from '../../../components/TextFeild';
import {GlobalStyle, Color, Window, Font} from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';
import {signinReq} from '../../../apis/auth';
import {useDispatch} from 'react-redux';
import PhoneInputComponent from '../../../components/PhoneInput';
import {SkypeIndicator} from 'react-native-indicators';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SignIn = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [phone, setPhone] = useState({
    code: '',
    phone: '',
  });
  const [password, setPassword] = useState('');
  const [referCode, setReferCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refer, setRefer] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (phone.phone === '') {
      showMessage({
        message: 'Please enter phone number',
        type: 'danger',
      });
      return;
    }
    if (password.length <= 5) {
      showMessage({
        message: 'Please enter a password with minimum 6 characters',
        type: 'danger',
      });
      return;
    }

    signinReq(
      {
        phone: phone.code + phone.phone,
        password: password,
        ref_code: referCode !== '' ? referCode : null,
      },
      navigation,
      setLoading,
      dispatch,
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const permissionStatus = () => {
    Alert.alert(
      'Geolocation Permission Required',
      'App needs access to your location to sign in. Please go to app settings and grant permission.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
      ],
    );
  };
  ///PASTE EVENT
  const handleOnPaste = content => {
    const url = content;
    const codeRegex = /[?&]code=([^&#]*)/.exec(url);
    const codeValue = codeRegex ? codeRegex[1] : null;
    setReferCode(codeValue);
  };

  const handleOnChangeText = async content => {
    // if (content === '') return;
    const copiedContent = await Clipboard.getString();

    if (copiedContent === '') return;
    const isPasted = content.includes(copiedContent);
    if (isPasted) {
      handleOnPaste(content);
    } else {
      setReferCode(content);
    }
  };
  return (
    <SafeAreaView style={{...GlobalStyle.Container}}>
      <StatusBar
        animated={true}
        backgroundColor={loading ? '#555555' : Color.light}
        barStyle={loading ? 'light-content' : 'dark-content'}
        showHideTransition={'fade'}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 100,
        }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.ImgContainer}>
          <Image
            source={require('../../../assets/images/pics/Frame5.png')}
            resizeMode="contain"
          />
        </View>

        <View style={styles.HeadingContainer}>
          <Text style={GlobalStyle.Heading}>Order with Phone</Text>
        </View>
        <View style={{marginTop: 20}}>
          <PhoneInputComponent
            setLoading={setLoading}
            placeholder="Enter your phone number..."
            onChanged={setPhone}
            value={phone}
            setRefresh={setRefresh}
            refresh={refresh}
          />
          <TextField
            placeholder="Enter your password..."
            icon="lock"
            isPassword={true}
            setHidePass={setHidePass}
            hidePass={hidePass}
            onChanged={setPassword}
          />

          <Text
            onPress={() => setRefer(!refer)}
            style={{
              fontFamily: Font.Urbanist_Medium,
              fontSize: 14,
              marginHorizontal: 8,
              marginVertical: 5,
              color: Color.primary,
            }}>
            Referral Code (Optional){' '}
            <AntDesign
              style={{
                // flex: 1,
                textAlign: 'center',
                fontSize: 12,
              }}
              color={Color.primary}
              name={'caretdown'}
            />
          </Text>

          {refer && (
            <TextField
              placeholder="Enter your referral code"
              icon="qrcode"
              onChanged={handleOnChangeText}
              value={referCode}
            />
          )}
        </View>
        {/* */}

        <View style={{...styles.CheckFortotContaienr, marginVertical: 20}} />

        <Button
          text={refresh ? 'Provide Location Permissions' : 'Next'}
          icon="mail"
          isIcon={false}
          theme="primary"
          onPressFunc={
            refresh ? () => permissionStatus() : () => handleSubmit()
          }
        />

        <View style={{flex: 1}} />
        <View
          style={{
            bottom: 5,
            backgroundColor: Color.light,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Font.Urbanist_Light,
              fontSize: 14,
              marginHorizontal: 8,
              marginVertical: 10,
              color: Color.mostDarkGray,
            }}>
            Need help signing in?{' '}
            <Text
              style={{color: Color.primary}}
              onPress={() => navigation.navigate('ForgotPassword')}>
              Click here
            </Text>
          </Text>
        </View>
      </ScrollView>
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

export default SignIn;
