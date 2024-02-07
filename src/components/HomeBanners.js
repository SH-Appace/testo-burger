import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {BorderRadius} from '../globalStyle/Theme';
import {useNavigation} from '@react-navigation/native';

const HomeBanners = ({banners}) => {
  const navigation = useNavigation();
  return (
    <Swiper
      autoplay
      style={{height: 180}}
      activeDot={<View style={styles.activeDot} />}
      dot={<View style={styles.dot} />}>
      {banners[0].map((x, i) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Custom', {
              edit: false,
              productId: x.id,
              product: x,
              fromMenu: false,
              itemCampaign: true,
            })
          }>
          <Image
            source={{uri: x.image}}
            style={styles.image}
            resizeMethod={'resize'}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
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
