import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../../components/AppBar';
import {
  GlobalStyle,
  Font,
  Color,
  BorderRadius,
} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {Data, DataNotLogin} from './ProfileDetails';
import {useDispatch, useSelector} from 'react-redux';
import {ManuIcon} from '../../../assets/svgs/SocialIconsSvgs';
import {useBackButton} from '../../../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WarningSvgBig} from '../../../assets/svgs/ProfileSvgs';
import Button from '../../../components/Button';

const ProfileData = ({item, logoutHandler}) => {
  let navigation = useNavigation();
  const auth = useSelector(state => state.auth);

  return (
    <TouchableOpacity
      onPress={async () => {
        if (item.name === 'Logout') {
          logoutHandler();
        } else {
          navigation.navigate(item.link, {
            fromOTPcode: item.id === 3 && false,
            fromProfile: item.id === 4 && false,
          });
        }
      }}
      style={{
        flexDirection: 'row',
        paddingBottom: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item.icon}

        <Text
          style={[
            {
              fontSize: 18,
              fontFamily: Font.Urbanist_SemiBold,
              lineHeight: 25.2,
              color: Color.tertiary,
              marginLeft: 15,
              marginRight: item.name === 'Profile' ? 10 : 0,
            },
            item.name === 'Delete Account' && {color: Color.primary},
          ]}>
          {item.name}
        </Text>
        {item.name === 'Profile' && auth.user.name === null && (
          <WarningSvgBig />
        )}
      </View>
      <View>
        <Icon
          iconFamily={'Feather'}
          name={item.chevron}
          size={20}
          color={Color.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

const Profile = ({navigation}) => {
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  const logoutHandler = async () => {
    await AsyncStorage.removeItem('credentials');
    await AsyncStorage.removeItem('auth');
    navigation.replace('SignIn');
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar
        left={
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}>
            <ManuIcon />
          </TouchableOpacity>
        }
        center={<Text style={GlobalStyle.AppCenterTextStyle}>Menu</Text>}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: !auth.user ? 0 : 25}}
        showsVerticalScrollIndicator={false}>
        {!auth.user ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                color: Color.tertiary,
                fontFamily: Font.Urbanist_Bold,
                fontSize: 30,
                marginTop: 22,
              }}>
              Your are not login
            </Text>
            <Text
              style={{
                color: Color.tertiary,
                fontFamily: Font.Urbanist_Regular,
                fontSize: 16,
                textAlign: 'center',
                marginVertical: 12,
              }}>
              Please login to continue
            </Text>
            <Button text={'Go to login'} theme="primary" navLink="SignIn" />
          </View>
        ) : (
          <TopProfileView navigation={navigation} />
        )}
        <View style={GlobalStyle.TopBorderStyle} />

        {!auth.user
          ? DataNotLogin.map((item, index) => (
              <ProfileData
                item={item}
                key={index}
                logoutHandler={logoutHandler}
              />
            ))
          : Data.map((item, index) => (
              <ProfileData
                item={item}
                key={index}
                logoutHandler={logoutHandler}
              />
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {width: 80, height: 80, borderRadius: 80},
  name: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Font.Urbanist_Bold,
    color: Color.tertiary,
    marginTop: 5,
  },
  phone: {
    color: Color.darkGray,
    fontSize: 16,
    fontFamily: Font.Urbanist_Medium,
    letterSpacing: 0.5,
  },
  viewBtn: {
    backgroundColor: Color.primary,
    alignItems: 'center',
    padding: 2.5,
    paddingHorizontal: 10,
    borderRadius: BorderRadius,
    alignSelf: 'baseline',
  },
  viewText: {
    color: Color.light,
    fontSize: 12,
    fontFamily: Font.Urbanist_Regular,
  },
});

const TopProfileView = ({navigation}) => {
  const auth = useSelector(state => state.auth);

  return (
    <View style={styles.row}>
      <View>
        <Image
          style={styles.avatar}
          resizeMode="cover"
          source={{
            uri: auth.user.image
              ? auth.user.image
              : 'https://demoappprojects.com/food-ordering/storage/profile/avatar.png',
          }}
        />
      </View>
      <View style={{flexDirection: 'column', marginLeft: 15}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ViewProfile');
          }}
          style={styles.viewBtn}>
          <Text style={styles.viewText}>View Profile</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{auth.user.name}</Text>
        <Text style={styles.phone}>{auth.user.phone}</Text>
      </View>
    </View>
  );
};
