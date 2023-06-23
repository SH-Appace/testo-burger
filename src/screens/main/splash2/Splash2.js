import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, Font, Window} from '../../../globalStyle/Theme';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {
  categoriesAllProductsReq,
  categoriesReq,
} from '../../../apis/categories';
import {useDispatch} from 'react-redux';
import {signinReq} from '../../../apis/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'react-native';

const Splash2 = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  var navigateTo = 'BottomTabScreen';
  useEffect(() => {
    checkUser();

    return () => setLoading(false);
  }, []);

  const checkUser = async () => {
    const timer = setTimeout(async () => {
      await AsyncStorage.getItem('credentials').then(async res => {
        if (res) {
          signinReq(
            {
              phone: JSON.parse(res).phone,
              password: JSON.parse(res).password,
            },
            navigation,
            setLoading,
            dispatch,
            true,
          );
        } else {
          try {
            const check = await AsyncStorage.getItem('onBoardCompleted');
            if (check !== null) {
              navigation.replace('SignIn');
            } else {
              navigation.replace('OnBoarding');
            }
          } catch (e) {
            console.log(e);
          }
        }
      });
    }, 1000);
    return () => clearTimeout(timer);
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/pics/background.png')}
      resizeMode="cover"
      style={{
        flex: 1,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={'#89200B'}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <ImageBackground
        source={require('../../../assets/images/pics/blackOverlay.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../assets/images/pics/burgerBackground.png')}
          resizeMode="contain"
          style={{width: Window.width / 1.25}}
        />
        <View style={{position: 'absolute', bottom: 50, right: 25, left: 25}}>
          <Text
            style={{
              textAlign: 'center',
              color: Color.primary,
              fontSize: Window.width < 375 ? 38 : 40,
              fontFamily: Font.Urbanist_Bold,
              marginBottom: 20,
            }}>
            Welcome to Testo Burger! 👋
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: Window.width < 375 ? 15 : 16,
              fontFamily: Font.Urbanist_Medium,
              color: Color.light,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

export default Splash2;

const styles = StyleSheet.create({});
