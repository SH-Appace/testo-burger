import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GlobalStyle, Font, Color, Window} from '../../../globalStyle/Theme';
const styles = StyleSheet.create({
  TextStyle: {
    lineHeight: 19.6,
    fontSize: 14,
    color: Color.darkGray,
    fontFamily: Font.Urbanist_Medium,
  },
  DeliveryStyle: {
    fontSize: 20,
    color: Color.secondary,
    lineHeight: 24,
    fontFamily: Font.Urbanist_Bold,
  },
  TotalStyle: {
    lineHeight: 22.4,
    fontSize: 16,
    color: Color.secondary,
    fontFamily: Font.Urbanist_SemiBold,
  },
  Heading: {
    fontSize: 18,
    color: Color.secondary,
    lineHeight: 21.6,
    width: 150,
    fontFamily: Font.Urbanist_Bold,
  },
  OneStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: Color.primary,
    fontFamily: Font.Urbanist_Bold,
    borderWidth: 1,
    borderColor: Color.primary,
    height: 32,
    width: 32,
    borderRadius: 10,
  },
  BoxContainerStyle: {
    backgroundColor: Color.light,
    padding: 15,
    marginTop: 20,
    borderRadius: 24,
    marginHorizontal: Window.fixPadding * 2,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 22,
  },
  fab: {
    position: 'absolute',
    margin: 10,
    left: -15,
    top: -15,
    backgroundColor: Color.primary,
    height: 24,
    width: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
