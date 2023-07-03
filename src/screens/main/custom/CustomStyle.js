import {StyleSheet, Dimensions, Platform} from 'react-native';
import {GlobalStyle, Window, Font, Color} from '../../../globalStyle/Theme';

const styles = StyleSheet.create({
  ImgStyle: {
    width: Window.height / 8,
    height: Window.height / 8,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  CartRightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TopTextStyle: {
    color: Color.headingSm,
    fontSize: 16,
    fontFamily: Font.Urbanist_Black,
  },
  MiddleTextStyle: {
    color: Color.greyscale,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.96,
    fontFamily: Font.Urbanist_Regular,
    paddingHorizontal: 2,
  },
  MinusStyle: {
    color: Color.headingSm,
    fontSize: 20,
    fontFamily: Font.Urbanist_Black,
  },
  NumStyle: {
    color: Color.headingSm,
    fontSize: 16,
    fontFamily: Font.Urbanist_Black,
    marginHorizontal: 10,
    width: 20,
    textAlign: 'center',
  },
  AddStyle: {
    color: 'white',
    fontSize: 20,
    fontFamily: Font.Urbanist_Black,
  },
  LastTextStyle: {
    color: Color.primary,
    fontSize: 14,
    fontFamily: Font.Urbanist_Black,
  },

  TopIconStyle: {
    // padding: 15,
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heartIcon: {
    fontSize: 20,
    color: Color.lightRed,
    borderRadius: 50,
  },
  ///cart
  cartContainer: {
    borderRadius: 20,
    height: Window.height / 7,
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
    alignItems: 'center',
  },
  incrementDecrementBtn: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.light,
  },
});

export default styles;
