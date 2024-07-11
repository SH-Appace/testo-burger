import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Menu from '../screens/main/menu/Menu';
import CheckOut from '../screens/main/checkOut/CheckOut';
import Custom from '../screens/main/custom/Custom';
import RecommendedFoods from '../screens/main/recommendedFoods/RecommendedFoods';

const MenuStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}
      initialRouteName="Menu">
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Custom" component={Custom} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="RecommendedFoods" component={RecommendedFoods} />
    </Stack.Navigator>
  );
};
export default MenuStack;