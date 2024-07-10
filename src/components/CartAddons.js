import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Checkbox, TouchableRipple, RadioButton} from 'react-native-paper';
import {Color, GlobalStyle} from '../globalStyle/Theme';

export default function CartAddons({
  item,
  setPriceAmount,
  setSelectedAddons,
  selectedAddons,
}) {
  const onPressFunction = (price, item) => {
    if (selectedAddons.some(e => e.id === item.id)) {
      setPriceAmount(prevValue => prevValue - price);

      setSelectedAddons(prevVal => [...prevVal.filter(x => x.id !== item.id)]);
    } else {
      setPriceAmount(prevValue => prevValue + price);

      setSelectedAddons(prevVal => [item, ...prevVal]);
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={{...GlobalStyle.BasicTextStyle, color: '#8A94A3'}}>
        {item.name}
      </Text>
      <View style={styles.btnCont}>
        <Text style={GlobalStyle.BasicTextStyle}>${item.price}</Text>
        <TouchableRipple
          onPress={() => onPressFunction(item.price, item)}
          style={styles.btnStyle}>
          <Checkbox.Android
            style={{
              transform: [{scaleX: 1}, {scaleY: 1}],
            }}
            color={Color.primary}
            uncheckedColor="#F6F4F4"
            status={
              selectedAddons?.some(e => e.id === item.id)
                ? 'checked'
                : 'unchecked'
            }
          />
        </TouchableRipple>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  btnStyle: {
    height: 21,
    width: 21,
    borderRadius: 22,
    borderWidth: 2.2,
    borderColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    backgroundColor: 'rgba(246, 244, 244, 1)',
    overflow: 'hidden',
  },
});
