import React, { useState } from 'react';
import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color, Font, GlobalStyle } from '../globalStyle/Theme';

import { useDispatch, useSelector } from 'react-redux';
import BottomTabScreen from './BottomTab';
import {
  AddressSvg,
  FavouritesSvg,
  HelpSvg,
  LogoutSvg,
  OrderSvg,
  ProfileSvg,
  ReservationSvg,
  SettingsSvg,
  VoucherSvg,
} from '../assets/svgs/DrawerSvgs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import { StatusBar } from 'react-native';
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerType="slide"
      screenOptions={{
        swipeEdgeWidth: 0,
        headerShown: false,
        drawerActiveBackgroundColor: Colors.transparent,
        drawerInactiveBackgroundColor: Colors.transparent,
        drawerActiveTintColor: Colors.active,
        drawerInactiveTintColor: Colors.inactive,
        drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
        overlayColor: Colors.transparent,
        drawerStyle: {
          backgroundColor: Colors.bg,
          width: '65%',
        },
        sceneContainerStyle: {},
        headerTransparent: true,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="BottomTabScreen" component={BottomTabScreen} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
const Colors = {
  bg: '#009688',
  active: '#fff',
  inactive: '#eee',
  transparent: 'transparent',
};
const CustomDrawerContent = props => {
  const [activeButton, setActiveButton] = useState(0);
  const { auth } = useSelector(state => ({ ...state }));
  const IsOpen = useDrawerStatus() === 'open';
  const dispatch = useDispatch();

  return (
    <ImageBackground
      source={require('../assets/images/pics/backgroundBurger.png')}
      resizeMode="cover"
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={IsOpen ? '#961111' : '#F9F9F9'}
          barStyle={IsOpen ? 'light-content' : 'dark-content'}
          showHideTransition={'fade'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingTop: 70,
          }}>
          <Avatar.Image
            size={50}
            style={{ backgroundColor: '#F0F0F0' }}
            source={{ uri: auth.user?.image }}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: 10,
              justifyContent: 'center',
            }}>
              {
                !auth.user ? 
                <>
                  <Text
                    style={{
                      ...GlobalStyle.BasicTextStyle,
                      marginBottom: 5,
                      color: Color.light,
                    }}>
                    You're not login
                  </Text>
                  <Text
                  onPress={() => props.navigation.navigate('SignIn')}
                    style={[
                      GlobalStyle.Heading,
                      {
                        fontSize: 16,
                        color: Color.secondary,
                      },
                    ]}>
                    Go to Login
                  </Text>
                </>
                :
                <>
                  <Text
                    style={{
                      ...GlobalStyle.BasicTextStyle,
                      marginBottom: 5,
                      color: Color.light,
                    }}>
                    Deliver to
                  </Text>
                  <Text
                    style={[
                      GlobalStyle.Heading,
                      {
                        fontSize: auth.user?.default_address !== null ? 20 : 16,
                        color: Color.light,
                      },
                    ]}>
                    {auth.user?.default_address !== null
                      ? auth.user?.default_address.address_type
                      : 'Delivery address not available'}
                  </Text>
                </>

              } 

          </View>
        </View>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 25,
            paddingTop: 40,
          }}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
          data={sidebarData}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            if ((!auth.user && item.id == 8) || (!auth.user && item.id == 7) || (!auth.user && item.id == 1)) {
              return;
            }
            return (
              <TouchableOpacity
                onPress={async () => {
                  if (item.id === 8) {
                    await AsyncStorage.removeItem('credentials');
                    await AsyncStorage.removeItem('auth');
                    props.navigation.replace('SignIn');
                    dispatch({
                      type: 'LOGOUT',
                      payload: null,
                    });
                  } else if (item.id === 6) {
                    props.navigation.closeDrawer();
                    props.navigation.reset({
                      routes: [
                        {
                          name: 'BottomTabScreen',
                          state: {
                            routes: [
                              {
                                name: 'ProfileStack',
                                state: {
                                  routes: [
                                    {
                                      name: 'Faq',
                                      params: {
                                        fromBurger: true,
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    });
                  } else {
                    props.navigation.closeDrawer();
                    props.navigation.navigate(item.navLink, {
                      fromOTPcode: item.id === 7 && false,
                    });
                  }
                }}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.icon}
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Font.Urbanist_Medium,
                    color: Color.light,
                    marginLeft: 10,
                  }}>
                  {item.screen}
                </Text>
              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { flex: 1 },
});

const sidebarData = [
  {
    id: 1,
    screen: 'Vouchers & Offers',
    icon: <VoucherSvg />,
    navLink: 'SpecialOffer',
  },
  {
    id: 2,
    screen: 'Favorites',
    icon: <FavouritesSvg />,
    navLink: 'Wishlist',
  },
  {
    id: 3,
    screen: 'Order & Reordering',
    icon: <OrderSvg />,
    navLink: 'OrderStack',
  },
  {
    id: 4,
    screen: 'Profile',
    icon: <ProfileSvg />,
    navLink: 'EditProfile',
  },
  {
    id: 5,
    screen: 'Address',
    icon: <AddressSvg />,
    navLink: 'Delivery',
  },
  {
    id: 6,
    screen: 'Help Center',
    icon: <HelpSvg />,
    navLink: 'Faq',
  },
  {
    id: 7,
    screen: 'Reservations',
    icon: <ReservationSvg />,
    navLink: 'Reservation',
  },
  // {
  //   id: 7,
  //   screen: 'Settings',
  //   icon: <SettingsSvg />,
  // },
  {
    id: 8,
    screen: 'Log out',
    icon: <LogoutSvg />,
  },
];
