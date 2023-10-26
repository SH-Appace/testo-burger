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
import Settings from '../screens/main/settings/Settings';
import ViewProfile from '../screens/main/viewProfile/ViewProfile';
import About from '../screens/main/about/About';
import PrivacyPolicy from '../screens/main/privacyPolicy/PrivacyPolicy';
import TermsConditions from '../screens/main/termsConditions/TermsConditions';

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
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
    </Stack.Navigator>
  );
};
export default ProfileStack;
