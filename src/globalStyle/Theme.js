import {Dimensions} from 'react-native';

const Color = {
  primary: '#EF7F01',
  secondary: '#212121',
  tertiary: '#831619',
  orange: '#FB9400',
  light: '#fff',
  greyscale: '#616161',
  grey: '#EEEEEE',
  lightGray: '#9E9E9E',
  pink: '#F75555',
  lightRed: '#FF4D67',
  black: '#000',
  veryLightGray: '#FAFAFA',
  red: '#ff0000',
  darkGray: '#424242',
  brightRed: '#EE4D2A',
  grayishBlue: '#F5F7FB',
  limeGreen: '#E8F7ED',
  mostDarkGray: '#757575',
  verylightRed: '#ff8a9b',
  headingSm: '#2A3B56',
  lightOrange: '#EF7F011A',
};

const Font = {
  Urbanist_Bold: 'Urbanist-Bold',
  Urbanist_Light: 'Urbanist-Light',
  Urbanist_Medium: 'Urbanist-Medium',
  Urbanist_SemiBold: 'Urbanist-SemiBold',
  Urbanist_Regular: 'Urbanist-Regular',
  Urbanist_Black: 'Urbanist-Black',
};

const Window = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  fixPadding: 10.0,
};

const GlobalStyle = {
  Container: {
    paddingHorizontal: Window.fixPadding * 2,
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  ImgContainer: {
    flex: 1,
    backgroundColor: Color.light,
    paddingHorizontal: Window.fixPadding * 2,
  },

  BasicHeading: {
    lineHeight: 57.6,
    fontSize: 48,
    alignItems: 'center',
    color: Color.secondary,
    fontFamily: Font.Urbanist_Medium,
  },
  Heading: {
    fontSize: 32,
    color: Color.secondary,
    fontFamily: Font.Urbanist_Bold,
  },

  BasicTextStyle: {
    lineHeight: 19.6,
    fontSize: 14,
    color: Color.secondary,
    fontFamily: Font.Urbanist_Regular,
  },
  AppCenterTextStyle: {
    color: Color.secondary,
    fontSize: 24,
    fontFamily: Font.Urbanist_Bold,
    left: 40,
    position: 'absolute',
  },
  AppRightIconStyle: {
    color: Color.secondary,
    fontWeight: '500',
  },
  TopBorderStyle: {
    with: Window.width,
    height: 1,
    marginVertical: 20,
    backgroundColor: Color.grey,
  },
  BottomButtonContainer: {
    width: '100%',
    paddingVertical: 20,
    alignSelf: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  borderStyle: {
    // borderWidth: 1,
    width: '40%',
    backgroundColor: Color.grey,
    height: 1.5,
  },
  InputTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'red',
    marginVertical: 5,
    fontFamily: Font.Urbanist_Regular,
  },
};

export {Color, Font, Window, GlobalStyle};
