import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';

import stylesForOtp from './CreatePinStyle';
const CELL_COUNT = 4;
const CreatePin = () => {
  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask(f => !f);
  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const [optText, setOtpText] = useState(false);

  return (
    <SafeAreaView style={{ ...GlobalStyle.Container }}>
      <StatusBar
        translucent
        backgroundColor={Color.light}
        barStyle={'dark-content'}
      />
      <AppBar
        center={
          <Text style={GlobalStyle.AppCenterTextStyle}>Create New PIN</Text>
        }
        right={<Text style={{ color: Color.black }}></Text>}
      />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={stylesForOtp.textStyle}>
          Add a PIN number to make your account more secure.
        </Text>
        <View style={{ marginVertical: 60 }}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            onChanged={setOtpText}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[stylesForOtp.cell, isFocused && stylesForOtp.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
      </View>

      <View style={GlobalStyle.BottomButtonContainer}>
        <Button
          text="Verify"
          icon="mail"
          isIcon={false}
          theme="primary"
          navLink="BottomTabScreen"
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePin;
