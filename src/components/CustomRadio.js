import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Color} from '../globalStyle/Theme';

export default function CustomRadio({status = false, onPress}) {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress}>
      <View
        style={{
          ...styles.innerCircle,
          backgroundColor: status ? Color.primary : 'transparent',
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
