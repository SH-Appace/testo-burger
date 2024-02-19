import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {Color} from '../globalStyle/Theme';
import {navigationRef} from '../utils/NavigationService';

const RootStack = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Color.primary,
    },
  };
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  );
};
export default RootStack;
