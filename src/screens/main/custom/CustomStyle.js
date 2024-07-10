import {StyleSheet} from 'react-native';
import {Font, Color} from '../../../globalStyle/Theme';

const styles = StyleSheet.create({
  barRightBtn: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: Color.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0.5,
    marginTop: 15,
  },
  CartRightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: Color.primary,
    borderRadius: 50,
  },
  textStyle: {
    color: '#2A3B56',
    fontSize: 14,
    fontFamily: Font.Urbanist_Black,
  },
  textArea: {
    backgroundColor: Color.light,
    height: 90,
    borderRadius: 16,
    paddingHorizontal: 10,
    color: Color.secondary,
    fontFamily: Font.Urbanist_Light,
  },
});

export default styles;