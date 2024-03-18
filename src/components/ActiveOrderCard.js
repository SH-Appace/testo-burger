import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BorderRadius, Color, Font, Window} from '../globalStyle/Theme';
import {BookSvg, ReferSvg} from '../assets/svgs/HomePage';
import {useNavigation} from '@react-navigation/native';
import Button from './Button';

const ActiveOrderCard = ({data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('OrderStack', {
          screen: 'Order',
        })
      }>
      <ImageBackground
        imageStyle={styles.img}
        style={styles.bg}
        source={require('../assets/images/pics/bookBg.png')}>
        <Text style={styles.title}>{data.order_count} active order</Text>
        <Text style={styles.subTitle}>{data.chat_count} unread message</Text>
        <View style={styles.svgContainer}>
          {/* <Button theme="secondary" /> */}
          <BookSvg width={Window.width / 2.35} height={Window.width / 2.2} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ActiveOrderCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius,
    marginHorizontal: Window.fixPadding * 2,
    height: 89,
    marginVertical: 15,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 22,
  },
  img: {
    resizeMode: 'cover',
    borderRadius: BorderRadius,
  },
  bg: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius,
    justifyContent: 'center',
  },
  svgContainer: {
    width: Window.width / 2.2,
    height: Window.width / 2.2,
    position: 'absolute',
    right: -20,
    top: -40,
  },
  title: {
    fontSize: 22,
    fontFamily: Font.Urbanist_Bold,
    color: Color.light,
    marginLeft: 25,
  },
  subTitle: {
    fontSize: 17,
    fontFamily: Font.Urbanist_Regular,
    color: Color.light,
    marginLeft: 25,
  },
});
