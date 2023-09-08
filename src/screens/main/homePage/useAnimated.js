import {useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const useAnimated = (catState, categories) => {
  /// Animated
  const progress = useSharedValue(0);
  const progress2 = useSharedValue(1);
  const progress3 = useSharedValue(235);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  }, []);
  const reanimatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: progress2.value,
    };
  }, []);
  const reanimatedStyle3 = useAnimatedStyle(() => {
    return {
      height: progress3.value,
    };
  }, []);
  useEffect(() => {
    if (catState) {
      progress.value = withSpring(1);
    } else {
      progress.value = withSpring(0);
    }
    if (catState) {
      progress2.value = withSpring(0);
    } else {
      progress2.value = withSpring(1);
    }
    if (catState) {
      progress3.value = withSpring((categories[0].length / 4) * 110);
    } else {
      progress3.value = withSpring(180);
    }
  }, [catState]);
  return [reanimatedStyle, reanimatedStyle2, reanimatedStyle3];
};
export default useAnimated;
