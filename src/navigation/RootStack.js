import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { Color } from '../globalStyle/Theme';

const RootStack = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Color.primary,
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <StackNavigator />
    </NavigationContainer>
  );
};
export default RootStack;
