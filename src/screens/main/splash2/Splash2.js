import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, Font, Window} from '../../../globalStyle/Theme';

import {
  categoriesAllProductsReq,
  categoriesReq,
} from '../../../apis/categories';
import {useDispatch} from 'react-redux';
import {SplashReq, signinReq} from '../../../apis/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'react-native';
import {
  ArrowDown,
  ArrowUp,
  RedLogo,
  SplashBg,
  SplashLeftBg,
  SplashRightBg,
  SplashText,
} from '../../../assets/svgs/LogoSvg';
import {
  NotificationListener,
  requestUserPermission,
} from '../../../utils/pushnotification_helper';

const Splash2 = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  var navigateTo = 'BottomTabScreen';
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    Promise.all([SplashReq(dispatch), checkUser()]);
    return () => setLoading(false);
  }, []);

  const checkUser = async () => {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    const timer = setTimeout(async () => {
      await AsyncStorage.getItem('credentials').then(async res => {
        if (res) {
          signinReq(
            {
              phone: JSON.parse(res).phone,
              password: JSON.parse(res).password,
              fcm_token: fcmtoken,
            },
            navigation,
            setLoading,
            dispatch,
            true,
          );
        } else {
          try {
            // navigation.replace('OnBoarding');
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
    <View
      source={require('../../../assets/images/pics/background.png')}
      resizeMode="cover"
      style={{
        flex: 1,
        backgroundColor: Color.light,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar
        animated={true}
        backgroundColor={Color.light}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <View style={styles.leftBgContainer}>
        <SplashLeftBg />
      </View>
      <View style={styles.rightBgContainer}>
        <SplashRightBg />
      </View>
      <View style={styles.topBgContainer}>
        <RedLogo width={Window.width / 2} height={Window.width / 1.5} />
      </View>
      <Image
        source={require('../../../assets/images/pics/burgerBackground.png')}
        resizeMode="contain"
        style={{
          width: Window.width / 1,
          height: Window.height,
          zIndex: 99,
          position: 'absolute',
          // top: 0,
          left: 5,
          right: 0,
          bottom: -100,
        }}
      />

      <View style={styles.arrrowUp}>
        <ArrowUp />
      </View>
      <View style={styles.arrrowDown}>
        <ArrowDown />
      </View>
      <View style={styles.centerBgContainer}>
        <SplashBg width={Window.width / 1} height={Window.height / 1} />
      </View>
      <View style={styles.bottomBgContainer}>
        <SplashText width={Window.width / 1.2} height={Window.height / 3.5} />
      </View>
    </View>
  );
};

export default Splash2;

const styles = StyleSheet.create({
  leftBgContainer: {
    position: 'absolute',
    top: 25,
    // bottom: 0,
    left: 0,
  },
  rightBgContainer: {
    position: 'absolute',
    bottom: 50,
    // top: 0,
    right: 0,
    zIndex: -2,
  },
  centerBgContainer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  topBgContainer: {
    position: 'absolute',
    // bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  bottomBgContainer: {
    position: 'absolute',
    bottom: 0,
    // top: 50,
    right: 0,
    left: 25,
    alignItems: 'center',
  },
  arrrowUp: {
    position: 'absolute',
    // alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    top: -200,
    right: 0,
    // left: 0,
    zIndex: -1,
  },
  arrrowDown: {
    position: 'absolute',
    // alignItems: 'center',
    justifyContent: 'center',
    bottom: 200,
    // top: 0,
    // right: 0,
    left: 0,
    zIndex: -1,
  },
});
