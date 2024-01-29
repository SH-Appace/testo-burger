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

const BookATableCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('BookATable')}>
      <ImageBackground
        imageStyle={styles.img}
        style={styles.bg}
        source={require('../assets/images/pics/bookBg.png')}>
        <Text style={styles.title}>Book a table</Text>
        <Text style={styles.subTitle}>want to reserve a table?</Text>
        <View style={styles.svgContainer}>
          <BookSvg width={Window.width / 2.35} height={Window.width / 2.2} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default BookATableCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius,
    overflow: 'hidden',
    marginHorizontal: Window.fixPadding * 2,
    height: 113,
    marginVertical: 15,
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
    top: -30,
  },
  title: {
    fontSize: 24,
    fontFamily: Font.Urbanist_Black,
    color: Color.light,
    width: Window.width / 2.2,
    marginLeft: 25,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: Font.Urbanist_Regular,
    color: Color.light,
    marginLeft: 25,
  },
});
