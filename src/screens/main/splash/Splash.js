import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Window} from '../../../globalStyle/Theme';
import {SkypeIndicator} from 'react-native-indicators';
import {useDispatch} from 'react-redux';
import {
  categoriesAllProductsReq,
  categoriesReq,
} from '../../../apis/categories';
import {getBanner} from '../../../apis/banner';
import {getBranches} from '../../../apis/branches';
import {WhiteLogo} from '../../../assets/svgs/LogoSvg';
import {StatusBar} from 'react-native';
import {openedFromNotification} from '../../../utils/NavigationService';
import {
  NotificationListener,
  requestUserPermission,
} from '../../../utils/pushnotification_helper';
const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // NavigationService.navigate('NotificationDetails');
    requestUserPermission();
    NotificationListener();
    Promise.all([
      categoriesReq(dispatch),
      categoriesAllProductsReq(dispatch),
      getBanner(dispatch),
      getBranches(dispatch),
      checkUser(),
    ]);
  }, []);

  const checkUser = async () => {
    const timer = setTimeout(async () => {
      if (!openedFromNotification) {
        navigation.replace('Splash2');
      }
    }, 1000);
    return () => clearTimeout(timer);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.primary,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={Color.primary}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <WhiteLogo width={Window.width / 1.25} height={Window.width / 1.25} />

      <View style={{position: 'absolute', bottom: 100, right: 0, left: 0}}>
        <SkypeIndicator size={65} color={Color.secondary} />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
