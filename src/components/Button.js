import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color, Font, Window} from '../globalStyle/Theme';
import {SkypeIndicator} from 'react-native-indicators';

const Button = props => {
  let navigation = useNavigation();

  const activeThemeBg = () => {
    switch (props.theme) {
      case 'primary':
        return Color.primary;
      case 'secondary':
        return Color.secondary;
      case 'alternate':
        return Color.lightOrange;
      case 'orange':
        return Color.orange;
      default:
        return Color.primary;
    }
  };

  const activeThemeTextColor = () => {
    switch (props.theme) {
      case 'secondary':
        return Color.light;
      case 'primary':
        return Color.light;

      default:
        return Color.primary;
    }
  };
  return (
    <TouchableOpacity
      style={{
        ...Style.BtnContainer,
        backgroundColor: activeThemeBg(),
        elevation: props.theme === 'alternate' ? 0 : 9,
      }}
      onPress={
        props.onPressFunc
          ? props.onPressFunc
          : () => navigation.navigate(props.navLink)
      }>
      {props.loading ? (
        <SkypeIndicator size={25} color={Color.tertiary} />
      ) : (
        <>
          {props.isIcon !== false ? (
            <Ionicons
              style={{...Style.IconStyle, color: activeThemeTextColor()}}
              name={props.icon}></Ionicons>
          ) : null}
          <Text style={{...Style.btnTextStyle, color: activeThemeTextColor()}}>
            {props.text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  BtnContainer: {
    backgroundColor: Color.secondary,
    alignItems: 'center',
    paddingVertical: 17,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: Color.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  btnTextStyle: {
    fontSize: Window.width < 375 ? 15 : 16,
    textAlign: 'center',
    fontFamily: Font.Urbanist_Bold,
  },
  IconStyle: {
    color: Color.primary,
    textAlign: 'center',
    fontSize: 20,
    position: 'absolute',
    left: Window.fixPadding * 2,
  },
});
export default Button;
