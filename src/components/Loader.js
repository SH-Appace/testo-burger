import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SkypeIndicator} from 'react-native-indicators';
import {Color} from '../globalStyle/Theme';

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000AA',
      }}>
      <SkypeIndicator size={50} color={Color.secondary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
