import React, {useRef, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BorderRadius, Color, Font} from '../globalStyle/Theme';

const TextField = ({
  placeholder,
  keyboardType,
  icon,
  isPassword,
  setHidePass,
  hidePass,
  IconFamily,
  value,
  color,
  alternate,
  multiline = false,
  height = 56,
  discount,
  removeCoupon,
  disabled = false,
  search,
  searchFunc,
  refer,
  loyaltyPoints,
  pointsDiscount,
  removePoints,
  onChanged = val => console.log('No Onchange Event', val),
}) => {
  const [focused, setFocused] = useState(false);

  if (isPassword) {
    return (
      <View
        style={[
          Style.TextInputContainer,
          {
            backgroundColor: focused ? 'rgba(246, 181, 29, 0.10)' : '#F9F9F9',
            borderWidth: focused ? 1 : 0,
            borderColor: Color.secondary,height: multiline ? 100 : height,
          },
        ]}>
        <MaterialCommunityIcons
          style={Style.TextInputIcon}
          name="lock"
          color={focused ? Color.secondary : '#212121'}
        />

        <TextInput
          style={{flex: 9, color: '#807F7E'}}
          placeholder={placeholder}
          placeholderTextColor="#828282"
          onChangeText={text => onChanged(text)}
          secureTextEntry={hidePass ? true : false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
        />

        <MaterialCommunityIcons
          style={Style.TextInputIcon}
          name={hidePass ? 'eye-off-outline' : 'eye-outline'}
          onPress={() => setHidePass(!hidePass)}
          color={focused ? Color.secondary : '#212121'}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        Style.TextInputContainer,
        {
          backgroundColor: focused ? 'rgba(246, 181, 29, 0.10)' : '#F9F9F9',
          borderWidth: focused ? 1 : 0,
          borderColor: Color.secondary,
          height: multiline ? 100 : height,
        },
      ]}>
      {alternate !== true && icon ? (
        IconFamily == 'ion' ? (
          <Ionicons
            style={Style.TextInputIcon}
            color={focused ? Color.secondary : '#212121'}
            name={icon}
          />
        ) : (
          <MaterialCommunityIcons
            style={Style.TextInputIcon}
            color={focused ? Color.secondary : '#212121'}
            name={icon}
          />
        )
      ) : null}
      {search && (
        <TouchableOpacity
          onPress={searchFunc}
          style={{
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            height: 56,
            width: 30,
          }}>
          <MaterialCommunityIcons
            size={23}
            color={focused ? Color.secondary : '#212121'}
            name={'arrow-left'}
          />
        </TouchableOpacity>
      )}

      <TextInput
        style={{
          flex: 9,
          fontSize: 14,
          fontFamily: Font.Urbanist_SemiBold,
          color: '#807F7E',
        }}
        placeholder={placeholder}
        placeholderTextColor="#828282"
        onChangeText={text => onChanged(text)}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType={keyboardType}
        editable={disabled ? false : true}
        multiline={multiline}
      />
      {loyaltyPoints ? (
        <Text style={{color: Color.primary, fontFamily: Font.Urbanist_Regular}}>
          {loyaltyPoints} Pt.
        </Text>
      ) : null}
      {alternate === true && icon ? (
        IconFamily == 'ion' ? (
          <Ionicons
            style={Style.TextInputIcon}
            color={color ? color : '#BDBDBD'}
            name={icon}
          />
        ) : (
          <MaterialCommunityIcons
            style={Style.TextInputIcon}
            color={color ? color : '#BDBDBD'}
            name={icon}
          />
        )
      ) : null}
      {discount > 0 && (
        <TouchableOpacity
          onPress={removeCoupon}
          style={{
            // backgroundColor: 'red',
            height: '100%',
            width: 35,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            size={20}
            color={Color.secondary}
            name={'close-circle'}
          />
        </TouchableOpacity>
      )}
      {pointsDiscount > 0 && (
        <TouchableOpacity
          onPress={removePoints}
          style={{
            // backgroundColor: 'red',
            height: '100%',
            width: 35,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            size={20}
            color={Color.secondary}
            name={'close-circle'}
          />
        </TouchableOpacity>
      )}
      {search && (
        <MaterialCommunityIcons
          style={Style.TextInputIcon}
          color={focused ? Color.primary : '#212121'}
          name={'magnify'}
        />
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  TextInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.veryLightGray,

    borderRadius: BorderRadius,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  TextInputIcon: {
    flex: 1,
    textAlign: 'center',
    fontSize: 23,
  },
});

export default TextField;
