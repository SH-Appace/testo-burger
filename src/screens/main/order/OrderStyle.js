import {StyleSheet} from 'react-native';
import {
  GlobalStyle,
  Font,
  Color,
  Window,
  BorderRadius,
} from '../../../globalStyle/Theme';

const styles = StyleSheet.create({
  Heading: {
    lineHeight: 21,
    fontSize: 18,
    color: Color.secondary,
    fontFamily: Font.Urbanist_Medium,
  },
  RecommendedImg: {
    width: 120,
    height: 120,
    marginRight: Window.fixPadding * 1.6,
    borderRadius: 24,
    overflow: 'hidden',
  },
  BasicHeading: {
    fontSize: 20,
    // lineHeight: 24,
    color: Color.tertiary,
    fontFamily: Font.Urbanist_Bold,
  },
  BottomText: {
    fontSize: 20,
    lineHeight: 24,
    color: Color.secondary,
    fontFamily: Font.Urbanist_Bold,
  },
  BottomMoreText: {
    fontSize: 14,
    lineHeight: 19.6,
    color: Color.greyscale,
    fontFamily: Font.Urbanist_Medium,
  },
  priceStyle: {
    color: Color.primary,
    fontSize: 20,
    fontFamily: Font.Urbanist_Bold,
    lineHeight: 24,
  },
  heartIcon: {
    fontSize: 20,
    lineHeight: 24,
    color: Color.primary,
    borderRadius: 50,
  },
  lineStyle: {
    color: Color.greyscale,
  },
  conditionstyle: {
    color: Color.pink,
    fontSize: 10,
    lineHeight: 12,
    fontFamily: Font.Urbanist_SemiBold,
  },
  selectButtomStyle: {
    borderColor: Color.secondary,
    borderWidth: 2,
    borderRadius: BorderRadius,
    flex: 1,
    alignItems: 'center',
    height: 37,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  buttonTextStlye: {
    fontSize: 14,
    fontFamily: Font.Urbanist_SemiBold,
    color: Color.primary,
    lineHeight: 19.6,
  },
  ////
  orderBox: {
    // borderWidth: 1,
    // borderColor: Color.light,
    borderRadius: BorderRadius,
    backgroundColor: Color.light,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 14,

    margin: 1,
  },
  statusBox: {
    borderRadius: 6,
    backgroundColor: Color.primary,
    marginHorizontal: 10,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
export default styles;
