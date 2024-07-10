import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, GlobalStyle} from '../globalStyle/Theme';
import {Checkbox, RadioButton, TouchableRipple} from 'react-native-paper';

export default function ProVariationItem({
  item,
  type,
  index,
  setRadioState,
  radioState,
  setPriceAmount,
  radioItemPrice,
  priceAmount,
  setRadioItemPrice,
  setSelectedVariations,
  selectedVariations,
  setRequired,
  variationObj,
}) {
  const isSelectedVariation = selectedVariations.some(x =>
    x.values.some(e => e.label === item.label),
  );

  const updatePriceAndVariations = (newPrice, newVariations) => {
    setPriceAmount(newPrice);
    setSelectedVariations(newVariations);
    setRequired(false); // Set required to false after a radio button is selected
  };

  const RadioClick = (optionPrice, item) => {
    let tempObj = {...variationObj};

    if (isSelectedVariation) {
      // Remove the selected variation and update the price
      const updatedVariations = selectedVariations.filter(
        x => x.name !== tempObj.name,
      );
      updatePriceAndVariations(
        prevVal => prevVal - optionPrice,
        updatedVariations,
      );
      setRadioState('');
      setRadioItemPrice('');
    } else {
      const existingVariation = selectedVariations.find(
        x => x.name === tempObj.name,
      );

      if (existingVariation) {
        // Update the existing variation with the new item
        const existingItemPrice = parseInt(
          existingVariation.values[0].optionPrice,
        );
        const priceDiff = Math.abs(item.optionPrice - existingItemPrice);
        const newPrice = prevValue =>
          item.optionPrice > existingItemPrice
            ? prevValue + priceDiff
            : prevValue - priceDiff;

        tempObj.values = [item];
        const updatedVariations = [
          tempObj,
          ...selectedVariations.filter(x => x.name !== tempObj.name),
        ];
        updatePriceAndVariations(newPrice, updatedVariations);
      } else {
        // Add the new variation
        tempObj.values = [item];
        const updatedVariations = [tempObj, ...selectedVariations];
        updatePriceAndVariations(
          prevValue => prevValue + optionPrice,
          updatedVariations,
        );
      }
    }
  };

  const onPressFunction = (price, item) => {
    let tempObj = {...variationObj};

    const checkIfSelectedVariationHasOBJ = selectedVariations.some(x =>
      x.values.some(e => e.label === item.label),
    );
    if (checkIfSelectedVariationHasOBJ) {
      const checkIfVariationOBJExist = selectedVariations.map(x => {
        if (x.name === tempObj.name) return x;
      });
      const currentObj = checkIfVariationOBJExist.filter(Boolean);

      //returning only the values from selected obj
      if (currentObj[0]?.values?.length > 1) {
        const newValues = currentObj[0].values.filter(
          x => x.label !== item.label,
        );
        currentObj[0].values = newValues;
        const replaceValues = selectedVariations.map(x => {
          if (x.name === tempObj.name) {
            x = currentObj[0];
          }
          return x;
        });

        setSelectedVariations(replaceValues);
        setPriceAmount(prevValue => prevValue - item.optionPrice);
      } else {
        setPriceAmount(prevValue => prevValue - item.optionPrice);
        const filtered = selectedVariations.filter(
          x => x.name !== tempObj.name,
        );
        setSelectedVariations(filtered);

        setRequired(true);
      }

      ////////////////////
    } else {
      //PERFECT

      const checkIfVariationOBJExist = selectedVariations?.some(
        x => x.name === tempObj.name,
      );
      if (checkIfVariationOBJExist) {
        const filtered = selectedVariations.filter(
          x => x.name === tempObj.name,
        );
        const newValues = [item, ...filtered[0].values];
        tempObj.values = newValues;
        setPriceAmount(prevValue => prevValue + price);
        setSelectedVariations(prevVal => [
          tempObj,
          ...prevVal.filter(x => x.name !== tempObj.name),
        ]);
      } else {
        tempObj.values = [item];
        setPriceAmount(prevValue => prevValue + price);
        setSelectedVariations(prevVal => [tempObj, ...prevVal]);
        setRequired(false);
      }
    }
  };
  return (
    <View style={styles.wrap}>
      <Text style={{...GlobalStyle.BasicTextStyle, color: '#8A94A3'}}>
        {item.label}
      </Text>

      <View style={styles.btnCont}>
        <Text style={GlobalStyle.BasicTextStyle}>${item.optionPrice}</Text>
        {type ? (
          <View style={styles.radioCont}>
            <RadioButton.Android
              uncheckedColor={Color.primary}
              color={Color.primary}
              value={index}
              name="meal"
              style={{marginLeft: -10}}
              status={
                selectedVariations?.some(x =>
                  x?.values?.some(e => e.label === item.label),
                )
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => RadioClick(parseInt(item.optionPrice), item)}
            />
          </View>
        ) : (
          <TouchableRipple
            onPress={() => onPressFunction(parseInt(item.optionPrice), item)}
            style={styles.btnStyle}>
            <Checkbox.Android
              color={Color.primary}
              uncheckedColor="#F6F4F4"
              status={
                selectedVariations?.some(x =>
                  x?.values?.some(e => e.label === item.label),
                )
                  ? 'checked'
                  : 'unchecked'
              }
            />
          </TouchableRipple>
        )}
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
  radioCont: {
    width: 24,
    height: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    overflow: 'hidden',
    transform: [{scaleX: 1.1}, {scaleY: 1.1}],
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
