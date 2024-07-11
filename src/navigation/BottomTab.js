import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';
import DeviceInfo from 'react-native-device-info';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Color, Window} from '../globalStyle/Theme';
import DrawerSceneWrapper from '../components/DrawerSceneWrapper';
import {WarningSvg} from '../assets/svgs/ProfileSvgs';
import {hiddenTabrScreens, tabBarData} from './DATA';

let hasNotch = DeviceInfo.hasNotch();
const BottomTabScreen = ({navigation, style}) => {
  const Tab = createBottomTabNavigator();
  const isDrawerOpen = useDrawerStatus();
  const auth = useSelector(state => state.auth);
  const insets = useSafeAreaInsets();
  const hasBottomSpace = insets.bottom > 0;

  const tabBarLabelStyles = {
    marginBottom: hasBottomSpace ? -10 : 5,
  };
  const tabBarItemStyles = {
    paddingBottom: hasBottomSpace ? 0 : 10,
    marginTop: hasBottomSpace ? 10 : 5,
  };

  useEffect(() => {
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

  const handleOptions = (route, options) => {
    let barStyle;
    const focusedRouteName = getFocusedRouteNameFromRoute(route);

    if (hiddenTabrScreens.includes(focusedRouteName)) {
      barStyle = styles.tabBarHiddenStyles;
    } else {
      barStyle = styles.tabBarStyles;
    }

    return {
      tabBarStyle: barStyle,
      tabBarLabel: options.label,
      tabBarLabelStyle: tabBarLabelStyles,
      tabBarItemStyle: tabBarItemStyles,
      tabBarIcon: ({focused}) => (
        <>
          {focused ? options.active : options.inActive}
          {options.label == 'Profile' && auth.user?.name === null && (
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
  };

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
            {tabBarData?.map((item, index) => {
              return (
                <Tab.Screen
                  key={index}
                  name={item?.name}
                  component={item?.component}
                  options={({route}) => handleOptions(route, item?.options)}
                />
              );
            })}
          </Tab.Navigator>
        </DrawerSceneWrapper>
      </Animated.View>
    </ImageBackground>
  );
};
export default BottomTabScreen;

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
  tabBarStyles: {
    display: 'flex',
    height: 80,
    backgroundColor: '#fff',
  },
  tabBarHiddenStyles: {
    display: 'none',
    bottom: -200,
    height: 0,
  },
});
