import React from 'react';
import {StyleSheet} from 'react-native';
import {GlobalStyle, Window, Font, Color} from '../../globalStyle/Theme';
const styles = StyleSheet.create({
  ImgContainer: {
    alignItems: 'center',
    // height: Window.height / 5.5,
  },

  HeadingContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },

  CheckFortotContaienr: {
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    color: '#000',
    margin: 5,
    padding: 0,
    width: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  BottonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  TextStyle: {
    color: '#828282',
    fontFamily: Font.Urbanist_Medium,
    fontSize: 14,
  },
  SecondTextStyle: {
    color: Color.secondary,
    fontFamily: Font.Urbanist_Medium,
    fontSize: 14,
  },
});

export default styles;
