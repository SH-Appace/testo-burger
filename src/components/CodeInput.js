import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import {Color, Font, GlobalStyle, Window} from '../globalStyle/Theme';
import PhoneInput from 'react-native-phone-number-input';

const CountryCodeInput = ({phone, setPhone}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);

  return (
    <PhoneInput
      ref={phoneInput}
      defaultCode={'US'}
      cou
      onChangeText={text => {
        return;
      }}
      onChangeFormattedText={text => {
        setPhone(text);
      }}
      
      containerStyle={{
        backgroundColor: 'rgba(250, 250, 250, 1)',
        height: 56,
        marginVertical: 12,
        alignItems: 'center',
        width: '100%',
        borderRadius: 16,
      }}
      textContainerStyle={{
        borderRadius: 16,
        height: 56,
        paddingVertical: 0,
      }}
      textInputStyle={{
        fontSize: 14,
        fontFamily: Font.Urbanist_SemiBold,
        color: Color.black,
      }}
    />
  );
};
export default CountryCodeInput;
