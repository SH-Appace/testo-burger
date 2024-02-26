import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Order from '../screens/main/order/Order';
import CancelOrder from '../screens/main/cancelOrder/CancelOrder';
import OrderReview from '../screens/main/orderReview/OrderReview';
import Chat from '../screens/main/order/Chat';

const OrderStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}
      initialRouteName="Order">
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="CancelOrder" component={CancelOrder} />
      <Stack.Screen name="OrderReview" component={OrderReview} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};
export default OrderStack;
