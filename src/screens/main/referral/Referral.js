import {
  Clipboard,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {BorderRadius, Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import Button from '../../../components/Button';
import {useSelector} from 'react-redux';
import {ReferaFriendSvg} from '../../../assets/svgs/ReferralsSvgs';
import Icon from '../../../core/Icon';
import Share from 'react-native-share';
import {useBackButton} from '../../../hooks';
import {StatusBar} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Referral = ({route, navigation}) => {
  const {auth} = useSelector(state => ({
    ...state,
  }));
  const insets = useSafeAreaInsets();

  const url = auth.user.ref_code;
  const title = 'Testo Burger';
  const message = 'Use the referral url to sign up now and get discounts';
  const options = {
    title,
    url,
    message,
  };
  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
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
  return (
    <View style={{flex: 1,}}>
      
      <StatusBar
        animated={true}
        backgroundColor={'#961111'}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <ImageBackground
        source={require('../../../assets/images/pics/backgroundBurger.png')}
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
                Refer a Friend
              </Text>
            }
          />
        </View>
        <View
          style={{
            flex: 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
          }}>
          <ReferaFriendSvg
            width={Window.width / 1.5}
            height={Window.height / 1.5}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: Window.fixPadding * 2,
            paddingTop: 25,
            paddingBottom: 25,
            backgroundColor: Color.light,
            borderTopLeftRadius: BorderRadius,
            borderTopRightRadius: BorderRadius,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              color: Color.darkGray,
              fontSize: 20,
              fontFamily: Font.Urbanist_Bold,
              marginBottom: 10,
              alignSelf: 'center',
            }}>
            Tap To Copy Link
          </Text>
          <View
            style={{
              // flex: 1,
              borderColor: Color.primary,
              borderRadius: BorderRadius,
              borderWidth: 2,
              borderStyle: 'dashed',
              paddingHorizontal: 10,
              paddingVertical: 10,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ScrollView
              horizontal
              style={{flex: 1}}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                // width: '100%',
                // alignSelf: 'center',
              }}>
              <Text
                onPress={() => {
                  Clipboard.setString(auth.user.ref_code);
                }}
                numberOfLines={1}
                style={{
                  color: Color.secondary,
                  fontSize: 16,
                  fontFamily: Font.Urbanist_Medium,
                }}>
                {auth.user.ref_code}
              </Text>
            </ScrollView>
          </View>
          <Text
            style={{
              color: Color.mostDarkGray,
              fontSize: 16,
              fontFamily: Font.Urbanist_Regular,
              marginVertical: 10,
              alignSelf: 'center',
            }}>
            Or
          </Text>
          <Button
            text={'Invite Friends'}
            icon="share-social"
            isIcon={true}
            theme="primary"
            onPressFunc={async () => await share()}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Referral;

const styles = StyleSheet.create({});
