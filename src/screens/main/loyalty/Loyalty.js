import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppBar from '../../../components/AppBar';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {useSelector} from 'react-redux';
import {ReferSvg} from '../../../assets/svgs/ReferralsSvgs';
import Icon from '../../../core/Icon';
import {useBackButton} from '../../../hooks';
import {Switch} from 'react-native-paper';
import {StatusBar} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Loyalty = ({route, navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const insets = useSafeAreaInsets();

  const {auth} = useSelector(state => ({
    ...state,
  }));
  const url = auth.user.ref_code;
  const title = 'Testo Burger';
  const message = 'Use the referral url to sign up now and get discounts';
  const options = {
    title,
    url,
    message,
  };

  const onBackPress = () => {
    if (route.params.fromHome) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTabScreen',
          },
        ],
      });
    } else {
      navigation.goBack();
    }
    return true;
  };
  useBackButton(navigation, onBackPress);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={'#f6b41c'}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <ImageBackground
        source={require('../../../assets/images/pics/backgroundBurgerYellow.png')}
        resizeMode="cover"
        style={{flex: 1,paddingTop: insets.top}}>
        <View style={{paddingHorizontal: Window.fixPadding * 2}}>
          <AppBar
            left={
              <TouchableOpacity
                onPress={() =>
                  route.params.fromHome
                    ? navigation.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'BottomTabScreen',
                          },
                        ],
                      })
                    : navigation.goBack()
                }>
                <Icon
                  iconFamily={'Octicons'}
                  name="arrow-left"
                  size={25}
                  color={Color.light}
                />
              </TouchableOpacity>
            }
            iconColor={Color.light}
            center={
              <Text
                style={[GlobalStyle.AppCenterTextStyle, {color: Color.light}]}>
                Loyalty Points
              </Text>
            }
          />
        </View>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 140,
          }}>
          <ReferSvg width={Window.width / 1.2} />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: Window.fixPadding * 2,
            paddingTop: 50,
            paddingBottom: 25,
            backgroundColor: Color.light,
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              color: Color.tertiary,
              fontSize: 18,
              fontFamily: Font.Urbanist_Regular,
              alignSelf: 'center',
              marginBottom: 15,
            }}>
            Current Points
          </Text>
          <View
            style={{
              // height: 70,
              backgroundColor: Color.primary,
              borderRadius: 15,
              paddingHorizontal: 20,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: Color.light,
                fontSize: 24,
                fontFamily: Font.Urbanist_Bold,
              }}>
              {parseFloat(auth.user.loyalty_point)}
            </Text>
          </View>
          <Text
            style={{
              color: Color.tertiary,
              fontSize: 14,
              fontFamily: Font.Urbanist_Regular,
              marginVertical: 30,
            }}>
            Turn on the switch to start availing your collected loyalty points.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Color.tertiary,
                fontSize: 18,
                fontFamily: Font.Urbanist_Regular,
              }}>
              Use Points
            </Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color={Color.primary}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Text
              style={{
                color: Color.primary,
                fontSize: 12,
                fontFamily: Font.Urbanist_Regular,
                marginVertical: 0,
                textAlign: 'center',
              }}>
              Get loyalty points by placing more orders and enjoy the rewards!
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Loyalty;

const styles = StyleSheet.create({});
