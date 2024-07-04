import {StyleSheet} from 'react-native';
import {GlobalStyle, Font, Color, Window} from '../../../globalStyle/Theme';

const styles = StyleSheet.create({
  Heading: {
    fontSize: 18,
    color: Color.tertiary,
    fontFamily: Font.Urbanist_Medium,
  },
  BasicHeading: {
    fontSize: 18,
    color: Color.tertiary,
    fontFamily: Font.Urbanist_SemiBold,
    marginLeft: 7,
  },
});
export default styles;
