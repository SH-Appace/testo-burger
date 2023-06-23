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
const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
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
      navigation.replace('Splash2');
    }, 1000);
    return () => clearTimeout(timer);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.light,
      }}>
      <Image
        source={require('../../../assets/images/pics/logo-01.png')}
        resizeMode="contain"
        style={{width: Window.width / 1.5}}
      />
      <View style={{position: 'absolute', bottom: 100, right: 0, left: 0}}>
        <SkypeIndicator size={65} color={Color.secondary} />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
