import React, {useState} from 'react';
import {Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../../components/AppBar';
import {GlobalStyle, Font,  Color} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import Data from './ProfileDetails';
import {useSelector} from 'react-redux';
import {ManuIcon} from '../../../assets/svgs/SocialIconsSvgs';
import {useBackButton} from '../../../hooks';

const ProfileData = ({item, onShowPopup}) => {
  let navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(item.link, {
          fromOTPcode: item.id === 3 && false,
          fromProfile: item.id === 4 && false,
        })
      }
      style={{
        flexDirection: 'row',
        paddingBottom: 23,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item.icon}

        <Text
          style={{
            fontSize: 18,
            fontFamily: Font.Urbanist_SemiBold,
            lineHeight: 25.2,
            color: Color.secondary,
            marginLeft: 15,
          }}>
          {item.name}
        </Text>
      </View>
      <View>
        <Icon
          iconFamily={'Feather'}
          name={item.chevron}
          size={20}
          color={Color.secondary}
        />
      </View>
    </TouchableOpacity>
  );
};

const Profile = ({navigation}) => {
  const {auth} = useSelector(state => ({...state}));
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
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
        center={<Text style={GlobalStyle.AppCenterTextStyle}>Profile</Text>}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                style={{width: 80, height: 80, borderRadius: 80}}
                resizeMode="cover"
                source={{
                  uri: auth.user.image
                    ? auth.user.image
                    : 'https://demoappprojects.com/food-ordering/storage/profile/avatar.png',
                }}
              />
            </View>
            <View style={{flexDirection: 'column', marginLeft: 15}}>
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 24,
                  fontFamily: Font.Urbanist_Bold,
                  color: Color.secondary,
                  marginBottom: 12,
                }}>
                {auth.user.name}
              </Text>
              <Text
                style={{
                  color: Color.darkGray,
                  fontSize: 16,
                  fontFamily: Font.Urbanist_Medium,
                }}>
                {auth.user.phone}
              </Text>
            </View>
          </View>
        </View>
        <View style={GlobalStyle.TopBorderStyle}></View>
        <View style={{flexDirection: 'column'}}>
          {Data.map((item, index) => (
            <ProfileData item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
