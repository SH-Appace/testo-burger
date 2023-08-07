import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color, Font, Window, BorderRadius} from '../globalStyle/Theme';
import {SkypeIndicator} from 'react-native-indicators';
import {View} from 'react-native';

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
      disabled={props.disabled ? true : false}
      style={{
        ...Style.BtnContainer,
        backgroundColor:
          props.theme === 'secondary' ? Color.light : activeThemeBg(),
        borderColor:
          props.theme === 'secondary' ? Color.secondary : activeThemeBg(),
        elevation: props.theme === 'secondary' ? 0 : 9,
        shadowColor: props.disabled ? '#DBDBDB' : activeThemeBg(),
        borderWidth: props.disabled ? 0 : 1,
      }}
      onPress={
        props.onPressFunc
          ? props.onPressFunc
          : () => navigation.navigate(props.navLink)
      }>
      <View
        style={{
          height: '100%',
          width: '100%',
          // borderRadius: 50,
          paddingVertical: 17,
          // justifyContent: 'center',
          backgroundColor: props.disabled ? '#DBDBDB' : 'transparent',
        }}>
        {props.loading ? (
          <SkypeIndicator size={25} color={Color.tertiary} />
        ) : (
          <>
            {props.isIcon !== false ? (
              <Ionicons
                style={{...Style.IconStyle, color: activeThemeTextColor()}}
                name={props.icon}></Ionicons>
            ) : null}
            <Text
              style={{
                ...Style.btnTextStyle,
                color:
                  props.theme === 'secondary'
                    ? Color.secondary
                    : activeThemeTextColor(),
              }}>
              {props.text}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  BtnContainer: {
    backgroundColor: Color.secondary,
    alignItems: 'center',

    borderRadius: BorderRadius,
    flexDirection: 'row',
    justifyContent: 'center',

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    overflow: 'hidden',
    elevation: 9,
  },
  btnTextStyle: {
    fontSize: Window.width < 375 ? 15 : 16,
    textAlign: 'center',
    fontFamily: Font.Urbanist_Bold,
  },
  IconStyle: {
    color: Color.primary,
    // textAlign: 'center',
    fontSize: 20,
    position: 'absolute',
    paddingVertical: 17,
    left: Window.fixPadding * 2,
  },
});
export default Button;
