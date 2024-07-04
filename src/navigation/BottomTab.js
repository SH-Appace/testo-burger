import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Color, Window} from '../globalStyle/Theme';
import {
  HomeIcon,
  HomeIconActive,
  MenuIcon,
  MenuIconActive,
  OrderIcon,
  OrderIconActive,
  ProfileIcon,
  ProfileIconActive,
} from '../assets/svgs/TabIcons';
import OrderStack from './OrderStack';
import ProfileStack from './ProfileStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Menu from '../screens/main/menu/Menu';
import HomeStack from './HomeStack';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import DrawerSceneWrapper from '../components/DrawerSceneWrapper';
import {useDrawerStatus} from '@react-navigation/drawer';
import {WarningSvg} from '../assets/svgs/ProfileSvgs';
import {useSelector} from 'react-redux';

let hasNotch = DeviceInfo.hasNotch();
const BottomTabScreen = ({navigation, style}) => {
  const Tab = createBottomTabNavigator();
  const isDrawerOpen = useDrawerStatus();
  const auth = useSelector(state => state.auth);
  // console.log(auth.user);
  useEffect(() => {
    // getBanner();
    if (isDrawerOpen === 'open') {
      navigation.getParent()?.setOptions({
        tabBarStyle: {display: 'none', bottom: -200, height: 0},
      });
    } else {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          height: hasNotch ? 75 : 70,
          backgroundColor: '#fff',
        },
      });
    }
  }, [isDrawerOpen]);
  return (
    <ImageBackground
      source={require('../assets/images/pics/backgroundBurger.png')}
      resizeMode="cover"
      style={{flex: 1}}>
      <Animated.View style={[styles.stack, style]}>
        <DrawerSceneWrapper>
          <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={({route}) => ({
              tabBarShowLabel: true,
              tabBarHideOnKeyboard: true,
              headerShown: false,
              tabBarActiveTintColor: Color.primary,
            })}>
            <Tab.Screen
              name="HomeStack"
              component={HomeStack}
              options={({route}) => {
                const focusedRouteName = getFocusedRouteNameFromRoute(route);
                if (hiddenTabrBarScreens.includes(focusedRouteName)) {
                  return {
                    tabBarStyle: tabBarHiddenStyles,
                  };
                }
                return {
                  tabBarStyle: tabBarStyles,
                  tabBarLabel: 'Home',
                  tabBarLabelStyle: tabBarLabelStyles,
                  tabBarItemStyle: tabBarItemStyles,
                  tabBarIcon: ({focused}) =>
                    focused ? <HomeIconActive /> : <HomeIcon />,
                };
              }}
            />
            <Tab.Screen
              name="Menu"
              component={Menu}
              options={({route}) => {
                const focusedRouteName = getFocusedRouteNameFromRoute(route);
                if (hiddenTabrBarScreens.includes(focusedRouteName)) {
                  return {
                    tabBarStyle: tabBarHiddenStyles,
                  };
                }
                return {
                  tabBarStyle: tabBarStyles,
                  tabBarLabel: 'Menu',
                  tabBarLabelStyle: tabBarLabelStyles,
                  tabBarItemStyle: tabBarItemStyles,
                  tabBarIcon: ({focused}) =>
                    focused ? <MenuIconActive /> : <MenuIcon />,
                };
              }}
            />
            <Tab.Screen
              name="OrderStack"
              component={OrderStack}
              options={({route}) => {
                const focusedRouteName = getFocusedRouteNameFromRoute(route);
                if (hiddenTabrBarScreens.includes(focusedRouteName)) {
                  return {
                    tabBarStyle: tabBarHiddenStyles,
                  };
                }
                return {
                  tabBarStyle: tabBarStyles,
                  tabBarLabel: 'Order',
                  tabBarLabelStyle: tabBarLabelStyles,
                  tabBarItemStyle: tabBarItemStyles,
                  tabBarIcon: ({focused}) =>
                    focused ? <OrderIconActive /> : <OrderIcon />,
                };
              }}
            />

            <Tab.Screen
              name="ProfileStack"
              component={ProfileStack}
              options={({route}) => {
                const focusedRouteName = getFocusedRouteNameFromRoute(route);
                if (hiddenTabrBarScreens.includes(focusedRouteName)) {
                  return {
                    tabBarStyle: tabBarHiddenStyles,
                  };
                }
                return {
                  tabBarStyle: tabBarStyles,
                  tabBarLabel: 'Profile',
                  tabBarLabelStyle: tabBarLabelStyles,
                  tabBarItemStyle: tabBarItemStyles,
                  tabBarIcon: ({focused}) =>
                    focused ? (
                      <>
                        <ProfileIconActive />
                        {auth.user?.name === null && (
                          <View
                            style={{
                              position: 'absolute',
                              right: Window.width / 15,
                              top: 5,
                            }}>
                            <WarningSvg />
                          </View>
                        )}
                      </>
                    ) : (
                      <>
                        <ProfileIcon />
                        {auth.user?.name === null && (
                          <View
                            style={{
                              position: 'absolute',
                              right: Window.width / 15,
                              top: 5,
                            }}>
                            <WarningSvg />
                          </View>
                        )}
                      </>
                    ),
                };
              }}
            />
          </Tab.Navigator>
        </DrawerSceneWrapper>
      </Animated.View>
    </ImageBackground>
  );
};
export default BottomTabScreen;

const tabBarLabelStyles = {
  // marginBottom: hasNotch ? -10 : 5
};
const tabBarItemStyles = {
  // paddingBottom: hasNotch ? 0 : 10,
  // marginTop: hasNotch ? 10 : 5,
};
const tabBarStyles = {
  display: 'flex',
  // height: hasNotch ? 80 : 75,
  backgroundColor: '#fff',
};
const tabBarHiddenStyles = {
  display: 'none',
  bottom: -200,
  height: 0,
};

const hiddenTabrBarScreens = [
  'CheckOut',
  'Delivery',
  'Payment',
  'SetLocation',
  'Custom',
  'SpecialOffer',
  'Faq',
  'Notification',
  'EditProfile',
  'Payment',
  'CancelOrder',
  'SearchType',
  'QRCode',
  'Referral',
  'Wishlist',
  'RecommendedFoods',
  'OrderReview',
  'Loyalty',
  'BookATable',
  'Reservation',
  'Settings',
  'PrivacyPolicy',
  'TermsConditions',
  'About',
  'Chat',
];
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: 'hidden',
  },
});
