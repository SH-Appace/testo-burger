import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

const AppBar = props => {
  let navigation = useNavigation();

  return (
    <View style={Style.topMainIcon}>
      {props.left ? (
        props.left
      ) : (
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Octicons
            style={{
              color: props.iconColor ? props.iconColor : '#000',
              fontSize: 25,
            }}
            name="arrow-left"
          />
        </TouchableOpacity>
      )}

      {props.center}
      {props.right}
    </View>
  );
};

const Style = StyleSheet.create({
  topMainIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
});

export default AppBar;
