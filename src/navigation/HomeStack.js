import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/main/homePage/HomePage';
import SpecialOffer from '../screens/main/specialOffer/SpecialOffer';
import Custom from '../screens/main/custom/Custom';
import CheckOut from '../screens/main/checkOut/CheckOut';
import Delivery from '../screens/main/delivery/Delivery';
import Payment from '../screens/main/payment/Payment';
import SetLocation from '../screens/main/setLocation/SetLocation';
import Notification from '../screens/main/notifications/Notification';
import SearchType from '../screens/main/searchType/SearchType';
import Animated from 'react-native-reanimated';
import {ImageBackground, StyleSheet, View} from 'react-native';
import DrawerSceneWrapper from '../components/DrawerSceneWrapper';
import QRCode from '../screens/main/QRCode/QRCode';
import Wishlist from '../screens/main/wishlist/Wishlist';
import RecommendedFoods from '../screens/main/recommendedFoods/RecommendedFoods';
import PaymentScreen from '../screens/main/paymentScreen/PaymentScreen';
import BookATable from '../screens/main/bookATable/BookATable';

const HomeStack = ({style}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="QRCode" component={QRCode} />
      <Stack.Screen name="SpecialOffer" component={SpecialOffer} />
      <Stack.Screen name="Custom" component={Custom} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="RecommendedFoods" component={RecommendedFoods} />
      <Stack.Screen name="Delivery" component={Delivery} />
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="SearchType" component={SearchType} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="BookATable" component={BookATable} />
    </Stack.Navigator>
  );
};
export default HomeStack;
