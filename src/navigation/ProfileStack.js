import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/main/profile/Profile';
import EditProfile from '../screens/main/editProfile/EditProfile';
import SpecialOffer from '../screens/main/specialOffer/SpecialOffer';
import Payment from '../screens/main/payment/Payment';
import Notification from '../screens/main/notifications/Notification';
import Faq from '../screens/main/faq/Faq';
import Referral from '../screens/main/referral/Referral';
import Loyalty from '../screens/main/loyalty/Loyalty';

const ProfileStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}
      initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SpecialOffer" component={SpecialOffer} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Referral" component={Referral} />
      <Stack.Screen name="Loyalty" component={Loyalty} />
    </Stack.Navigator>
  );
};
export default ProfileStack;
