import {
  View,
  Text,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer';

const DrawerSceneWrapper = ({children}) => {
  const progress = useDrawerProgress();
  const {width} = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      // {perspective: 1000},
      {scale: interpolate(progress.value, [0, 1], [1, 0.6], 'clamp')},
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, Platform.OS === 'android' ? width - 90 : -20],
          'clamp',
        ),
      },
      {
        rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg`,
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 28], 'clamp'),
    overflow: 'hidden',
  }));
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default DrawerSceneWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
