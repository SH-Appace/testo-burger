import React, {useState} from 'react';
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
} from 'react-native';
import Button from '../../../components/Button';
import TextField from '../../../components/TextFeild';
import {GlobalStyle, Color, Window, Font} from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signupReq} from '../../../apis/auth';
import {showMessage} from 'react-native-flash-message';
import PhoneInputComponent from '../../../components/PhoneInput';
import {SkypeIndicator} from 'react-native-indicators';

const SignUp = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState({
    code: '',
    phone: '',
  });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  console.log("🚀 ~ SignUp ~ phone:", phone)

  const handleSubmit = () => {
    Keyboard.dismiss();

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (phone.phone === '') {
      showMessage({
        message: 'Please enter phone number',
        type: 'danger',
      });
      return;
    }
    if (name === '') {
      showMessage({
        message: 'Please enter name',
        type: 'danger',
      });
      return;
    }
    if (!email.match(mailformat)) {
      showMessage({
        message: 'Please enter valid email',
        type: 'danger',
      });
      return;
    }

    signupReq(
      {
        name: name,
        phone: phone.code + phone.phone,
        email: email,
        password: password,
      },
      navigation,
      setLoading,
    );
  };
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
  return (
    <SafeAreaView style={{...GlobalStyle.Container}}>
      <StatusBar
        translucent
        backgroundColor={Color.light}
        barStyle={'dark-content'}
      />
      <AppBar />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: 25}}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.ImgContainer}>
          <Image
            source={require('../../../assets/images/pics/Frame5.png')}
            //   style={{width: Window.width / 1.5, height: Window.width / 4}}
            resizeMode="contain"
          />
        </View>

        <View style={styles.HeadingContainer}>
          <Text style={GlobalStyle.Heading}>Create New Account</Text>
        </View>
        {/* <CountryCodeInput phone={phone} setPhone={setPhone} /> */}
        <PhoneInputComponent
          setLoading={setLoading}
          placeholder="XXXXXXXXXX"
          onChanged={setPhone}
          value={phone}
          setRefresh={setRefresh}
          refresh={refresh}
        />

        <TextField
          value={email}
          placeholder="Email addresse"
          onChanged={setEmail}
          icon="email"
          keyboardType="email-address"
        />
        <TextField
          placeholder="Your Name"
          onChanged={setName}
          icon="account"
          value={name}
        />
        <TextField
          placeholder="Password"
          icon="lock"
          isPassword={true}
          setHidePass={setHidePass}
          hidePass={hidePass}
          onChanged={setPassword}
          value={password}
        />

        <View style={{marginTop: 20}}>
          <Button
            text={refresh ? 'Provide Location Permissions' : 'Sign up'}
            onPressFunc={
              refresh ? () => permissionStatus() : () => handleSubmit()
            }
            icon="mail"
            isIcon={false}
            theme="primary"
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={GlobalStyle.borderStyle}></View>
          <Text
            style={{
              fontFamily: Font.Urbanist_SemiBold,
              fontSize: 18,
              marginHorizontal: 8,
              marginVertical: 10,
              color: Color.mostDarkGray,
            }}>
            or continue with
          </Text>
          <View style={GlobalStyle.borderStyle}></View>
        </View>
        <View
          style={{
            ...GlobalStyle.BottomButtonContainer,
            backgroundColor: Color.light,
          }}>
          <View style={styles.BottonContainer}>
            <Text style={styles.TextStyle}>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.SecondTextStyle}> Login</Text>
            </TouchableOpacity>
          </View>
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

export default SignUp;
