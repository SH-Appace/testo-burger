import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {Color, Font, GlobalStyle} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {
  PrivacyPolicySvg,
  TermsSvg,
  WarningSvgBig,
} from '../../../assets/svgs/ProfileSvgs';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Switch} from 'react-native-paper';

const About = ({navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const dispatch = useDispatch();
  const {auth} = useSelector(state => ({...state}));

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('credentials');
    await AsyncStorage.removeItem('auth');
    navigation.replace('SignIn');
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <SafeAreaView
      style={[
        {...GlobalStyle.Container},
        {
          backgroundColor: Color.light,
        },
      ]}>
      <AppBar
        center={<Text style={GlobalStyle.AppCenterTextStyle}>About</Text>}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: 25}}
        showsVerticalScrollIndicator={false}>
        {Data.map((item, index) => (
          <ProfileData
            item={item}
            key={index}
            isSwitchOn={isSwitchOn}
            onToggleSwitch={onToggleSwitch}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({});

const ProfileData = ({item, isSwitchOn, onToggleSwitch}) => {
  let navigation = useNavigation();
  const {auth} = useSelector(state => ({...state}));

  return (
    <TouchableOpacity
      onPress={async () => {
        navigation.navigate(item.link, {
          fromOTPcode: item.id === 3 && false,
          fromProfile: item.id === 4 && false,
        });
      }}
      style={{
        flexDirection: 'row',
        paddingBottom: 23,
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
      {item.name === 'Notifications' ? (
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          color={Color.primary}
        />
      ) : (
        <Icon
          iconFamily={'Feather'}
          name={item.chevron}
          size={20}
          color={Color.primary}
        />
      )}
    </TouchableOpacity>
  );
};

const Data = [
  {
    id: 1,
    icon: <PrivacyPolicySvg />,
    name: 'Privacy Policy',
    chevron: 'chevron-right',
    link: 'PrivacyPolicy',
  },
  {
    id: 2,
    icon: <TermsSvg />,
    name: 'Terms & Conditions',
    chevron: 'chevron-right',
    link: 'TermsConditions',
  },
];
