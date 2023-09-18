import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import {Font, Color, Window, GlobalStyle} from '../../../globalStyle/Theme';
import deviceInfoModule from 'react-native-device-info';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Button from '../../../components/Button';
import {
  Onboard1,
  Onboard2,
  Onboard3,
} from '../../../assets/svgs/OnboardingSvgs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SplashLeftBg, SplashRightBg} from '../../../assets/svgs/LogoSvg';

let hasNotch = deviceInfoModule.hasNotch();

const OnBoarding = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();

  const progress = useSharedValue(0);
  const progressIndicator = useSharedValue(8);
  const progressIndicator1 = useSharedValue(8);
  const progressIndicator2 = useSharedValue(8);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  }, []);
  const reanimatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      width: progressIndicator.value,
    };
  }, []);
  const reanimatedIndicator1Style = useAnimatedStyle(() => {
    return {
      width: progressIndicator1.value,
    };
  }, []);
  const reanimatedIndicator2Style = useAnimatedStyle(() => {
    return {
      width: progressIndicator2.value,
    };
  }, []);

  useEffect(() => {
    if (currentSlideIndex > 0) {
      progress.value = withSpring(1);
    } else {
      progress.value = withSpring(0);
    }
    if (currentSlideIndex === 0) {
      progressIndicator.value = withSpring(27);
    } else {
      progressIndicator.value = withSpring(8);
    }
    if (currentSlideIndex === 1) {
      progressIndicator1.value = withSpring(27);
    } else {
      progressIndicator1.value = withSpring(8);
    }
    if (currentSlideIndex === 2) {
      progressIndicator2.value = withSpring(27);
    } else {
      progressIndicator2.value = withSpring(8);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlideIndex]);

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / Window.width);
    setCurrentSlideIndex(currentIndex);
  };
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (currentSlideIndex === 2) {
      navigation.replace('SignIn');
      return;
    }
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * Window.width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const goLastSlide = () => {
    const offset = 2 * Window.width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(2);
  };
  const goToPrevSlide = () => {
    const nextSlideIndex = currentSlideIndex - 1;
    if (currentSlideIndex === 0) {
      return;
    }
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * Window.width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <>
      <View style={styles.leftBgContainer}>
        <SplashLeftBg />
      </View>
      <View style={styles.rightBgContainer}>
        <SplashRightBg />
      </View>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        contentContainerStyle={{
          alignItems: 'center',
          backgroundColor: Color.light,
        }}
        horizontal
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={Window.width}
        onScrollEndDrag={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        renderItem={({item}) => <Slide item={item} />}
      />

      <Indicators
        currentSlideIndex={currentSlideIndex}
        goToNextSlide={goToNextSlide}
        goToPrevSlide={goToPrevSlide}
        navigation={navigation}
        reanimatedStyle={reanimatedStyle}
        reanimatedIndicatorStyle={reanimatedIndicatorStyle}
        reanimatedIndicator1Style={reanimatedIndicator1Style}
        reanimatedIndicator2Style={reanimatedIndicator2Style}
      />
    </>
  );
};
export default OnBoarding;
const Slide = ({item}) => {
  return (
    <View
      style={{
        // backgroundColor: 'red',
        alignItems: 'center',
        // justifyContent: 'flex-start',
        // paddingTop: Window.height / 155,
        width: Window.width,
        height: Window.height,
      }}>
      {item.background}

      <View
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: hasNotch ? 170 : 160,
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <Text
          style={{
            ...GlobalStyle.BasicHeading,
            marginBottom: 10,
            color: Color.tertiary,
            fontFamily: Font.Urbanist_Bold,
            fontSize: 30,
            textAlign:'center'
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            ...GlobalStyle.BasicTextStyle,
            textAlign: 'center',
            fontSize: 16,
          }}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};
const Indicators = ({
  currentSlideIndex,
  goToPrevSlide,
  goToNextSlide,
  reanimatedStyle,
  reanimatedIndicatorStyle,
  reanimatedIndicator1Style,
  reanimatedIndicator2Style,
  navigation,
}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: hasNotch ? 50 : 40,
        left: 0,
        right: 0,
      }}>
      {/* Indicator container */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 25,
        }}>
        {/* Render indicator */}
        {slides.map((_, index) => {
          return (
            <Animated.View
              key={index}
              style={[
                styles.indicator,
                index === 0 && reanimatedIndicatorStyle,
                index === 1 && reanimatedIndicator1Style,
                index === 2 && reanimatedIndicator2Style,
                currentSlideIndex == index && {
                  backgroundColor: Color.primary,
                },
              ]}
            />
          );
        })}
      </View>
      <Button
        text={currentSlideIndex === 2 ? 'Get Started' : 'Next'}
        icon="mail"
        isIcon={false}
        theme="primary"
        navLink="GetStarted"
        onPressFunc={
          currentSlideIndex === 2
            ? async () => {
                await AsyncStorage.setItem('onBoardCompleted', 'Done');
                navigation.replace('SignIn');
              }
            : goToNextSlide
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    // height: Window.height,
    width: Window.width / 1.5,
  },
  title: {
    fontFamily: Font.Manrope_bold,
    alignSelf: 'center',
    // textAlign: 'center',
    fontSize: 24,
    color: Color.light,
    letterSpacing: 1.75,
  },
  subTitle: {
    fontFamily: Font.Manrope_regular,
    fontSize: 16,
    color: '#BDBDBD',
    marginTop: 0,
    marginBottom: 65,
    textAlign: 'center',
  },
  indicator: {
    height: 8,
    width: 8,
    // opacity: 0.5,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  fab: {
    height: 55,
    width: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.secondary,
    shadowColor: Color.secondary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  leftBgContainer: {
    position: 'absolute',
    top: 25,
    // bottom: 0,
    left: 0,
    zIndex: 99,
  },
  rightBgContainer: {
    position: 'absolute',
    // bottom: 50,
    top: 100,
    right: 0,
    zIndex: 99,
  },
});
const slides = [
  {
    id: 1,
    title: 'Welcome to Testo Burger!',
    subtitle:
      "Explore a world of culinary delights, from gourmet burgers to your favorite fast food. Let's get started on your delicious journey!",
    background: (
      <Onboard1 width={Window.width / 1.5} height={Window.height / 1.35} />
    ),
  },
  {
    id: 2,
    title: 'Effortless Ordering',
    subtitle:
      'Ordering is a breeze. Customize your meal, add special instructions, and securely pay right from your smartphone.',
    background: (
      <Onboard2 width={Window.width / 1.5} height={Window.height / 1.35} />
    ),
  },
  {
    id: 3,
    title: 'Lightning-Fast Delivery',
    subtitle:
      'Track your order in real-time and know exactly when your delicious food will arrive at your doorstep.',
    background: (
      <Onboard3 width={Window.width / 1.5} height={Window.height / 1.35} />
    ),
  },
];
