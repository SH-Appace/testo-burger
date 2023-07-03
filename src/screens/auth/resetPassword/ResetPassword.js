import React, {useState} from 'react';
import {View, Text, Image, StatusBar, ScrollView, Keyboard} from 'react-native';
import Button from '../../../components/Button';
import {GlobalStyle, Color, Window, Font} from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';
import PhoneInputComponent from '../../../components/PhoneInput';
import {SkypeIndicator} from 'react-native-indicators';
import auth from '@react-native-firebase/auth';
import {forgotPassword, resetPassword} from '../../../apis/profile';
import TextField from '../../../components/TextFeild';

const ResetPassword = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (password.length <= 5) {
      showMessage({
        message: 'Please enter a password with minimum 6 characters',
        type: 'danger',
      });
      return;
    }
    resetPassword(
      {
        password: password,
        id: route.params.userId,
      },
      setLoading,
      navigation,
    );
  };
  return (
    <SafeAreaView style={{...GlobalStyle.Container}}>
      <AppBar l />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: 25}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.ImgContainer}>
          <Image
            source={require('../../../assets/images/pics/Frame5.png')}
            resizeMode="contain"
          />
        </View>

        <View style={styles.HeadingContainer}>
          <Text style={GlobalStyle.Heading}>Reset Password</Text>
        </View>
        <View style={{marginTop: 20}}>
          <TextField
            placeholder="Enter your new password..."
            icon="lock"
            isPassword={true}
            setHidePass={setHidePass}
            hidePass={hidePass}
            value={password}
            onChanged={setPassword}
          />
        </View>

        <View style={{...styles.CheckFortotContaienr, marginVertical: 20}} />

        <Button
          text={'Update'}
          icon="mail"
          isIcon={false}
          theme="primary"
          onPressFunc={() => handleSubmit()}
        />
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

export default ResetPassword;
