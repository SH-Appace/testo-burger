import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {EmptyOrderSvg} from '../assets/svgs/OrderSvgs';
import {Color, Font, Window} from '../globalStyle/Theme';

export default function EmptyDataComp({text}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%',
      }}>
      <EmptyOrderSvg width={Window.width / 1.5} height={Window.height / 3} />
      <Text
        style={{
          color: Color.tertiary,
          fontFamily: Font.Urbanist_Bold,
          fontSize: 22,
          marginTop: 22,
        }}>
        Empty
      </Text>
      <Text
        style={{
          color: Color.tertiary,
          fontFamily: Font.Urbanist_Regular,
          fontSize: 16,
          textAlign: 'center',
          marginTop: 12,
        }}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
