import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {BorderRadius} from '../globalStyle/Theme';

const HomeBanners = ({banners}) => {
  return (
    <Swiper
      autoplay
      style={{height: 180}}
      activeDot={<View style={styles.activeDot} />}
      dot={<View style={styles.dot} />}>
      {banners[0].map((x, i) => (
        <Image
          source={{uri: x.image}}
          style={styles.image}
          resizeMethod={'resize'}
          resizeMode={'cover'}
        />
      ))}
    </Swiper>
  );
};

export default HomeBanners;

const styles = StyleSheet.create({
  image: {
    height: 180,
    borderRadius: BorderRadius,
    width: '90%',
    alignSelf: 'center',
  },
  dot: {
    width: 16,
    height: 4,
    borderRadius: 100,
    marginHorizontal: 5,
    backgroundColor: '#E0E0E0',
    opacity: 0.7,
  },
  activeDot: {
    width: 16,
    height: 4,
    borderRadius: 100,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
  },
});
