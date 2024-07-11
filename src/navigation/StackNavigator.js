import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../screens/main/splash/Splash';
import Splash2 from '../screens/main/splash2/Splash2';
import OnBoarding from '../screens/main/onBoarding/Onboarding';
import GetStarted from '../screens/auth/getStarted/GetStarted';
import SignUp from '../screens/auth/signUp/SignUp';
import SignIn from '../screens/auth/signIn/SignIn';
import BottomTabScreen from './BottomTab';
import OtpCode from '../screens/main/otpCode.js/OtpCode';
import EditProfile from '../screens/main/editProfile/EditProfile';
import CreatePin from '../screens/main/createPin/createPin';
import SetLocation from '../screens/main/setLocation/SetLocation';
import Delivery from '../screens/main/delivery/Delivery';
import DrawerNavigator from './DrawerNavigator';
import ForgotPassword from '../screens/auth/forgotPassword/ForgotPassword';
import ResetPassword from '../screens/auth/resetPassword/ResetPassword';
import NotificationDetails from '../screens/main/notifications/NotificationDetails';
import Custom from '../screens/main/custom/Custom';
import CheckOut from '../screens/main/checkOut/CheckOut';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}
      initialRouteName="Splash2">
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
      <Stack.Screen name="Splash2" component={Splash2} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      {/* <Stack.Screen name="GetStarted" component={GetStarted} /> */}
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="OtpCode" component={OtpCode} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Delivery" component={Delivery} />
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
      />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
