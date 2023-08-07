import {StyleSheet} from 'react-native';
import {GlobalStyle, Font, Color, Window} from '../../../globalStyle/Theme';

const styles = StyleSheet.create({
  Heading: {
    fontSize: 18,
    color: Color.tertiary,
    fontFamily: Font.Urbanist_Bold,
    lineHeight: 21.6,
  },
  TextStyle: {
    lineHeight: 19.6,
    fontSize: 14,
    color: Color.greyscale,
    fontFamily: Font.Urbanist_Medium,
  },
});
export default styles;
