import {StyleSheet, Dimensions, Platform} from 'react-native';
import {GlobalStyle, Color, Window, Font} from '../../../globalStyle/Theme';

const stylesForOtp = StyleSheet.create({
  TopTextContainer: {justifyContent: 'center'},

  CodeFieldStyle: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cell: {
    width: Window.width / 5,
    height: 60,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: Color.grayishBlue,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Color.veryLightGray,
    color: '#212121',

    // paddingVertical: 15,
  },
  focusCell: {
    borderColor: Color.primary,
    backgroundColor: 'rgba(239, 127, 1, 0.08)',
  },
  textStyle: {
    lineHeight: 25.2,
    fontSize: 18,
    color: '#212121',
    fontFamily: Font.Urbanist_Medium,
    textAlign: 'center',
  },
});

export default stylesForOtp;
