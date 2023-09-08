import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../globalStyle/Theme';
import {RadioButton} from 'react-native-paper';
import Icon from '../core/Icon';

const CheckoutSelectWhen = ({
  setDeliveryTime,
  deliveryTime,
  deliveryTimeObject,
  setDeliveryTimeObject,
  setOpen,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={styles.headingBox}>Select When</Text>
      </View>
      <View style={GlobalStyle.TopBorderStyle} />
      {TimeData.map((item, index) => (
        <TimeDetails
          setDeliveryTime={setDeliveryTime}
          deliveryTime={deliveryTime}
          deliveryTimeObject={deliveryTimeObject}
          setDeliveryTimeObject={setDeliveryTimeObject}
          setOpen={setOpen}
          item={item}
          key={index}
        />
      ))}
    </View>
  );
};

export default CheckoutSelectWhen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.light,
    padding: 15,
    marginTop: 20,
    borderRadius: BorderRadius,
    marginHorizontal: Window.fixPadding * 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingRow: {
    lineHeight: 19.6,
    color: Color.tertiary,
    fontSize: 16,
    fontFamily: Font.Urbanist_Medium,
    marginHorizontal: 5,
  },
  subHeadingRow: {
    lineHeight: 19.6,
    color: Color.secondary,
    marginHorizontal: 5,
    fontSize: 14,
    fontFamily: Font.Urbanist_Medium,
  },
  headingBox: {
    fontSize: 20,
    color: Color.tertiary,
    lineHeight: 24,
    fontFamily: Font.Urbanist_Bold,
  },
});

const TimeDetails = ({
  item,
  setDeliveryTime,
  setOpen,
  deliveryTime,
  deliveryTimeObject,
  setDeliveryTimeObject,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (item.id === 1) {
          setDeliveryTime('');
          setDeliveryTimeObject(null);
          return;
        } else if (item.id === 2) {
          setOpen(true);
          return;
        }
      }}
      style={[
        styles.row,
        {
          justifyContent: 'space-between',
          margin: 1,
          marginVertical: 10,
        },
      ]}>
      {
        <View style={styles.row}>
          <Icon
            iconFamily={'MaterialCommunityIcons'}
            name={item.icon}
            size={25}
            color={Color.primary}
          />
          <View>
            <Text style={styles.headingRow}> {item.name} </Text>
            {deliveryTimeObject !== null && item.id === 2 && (
              <Text style={styles.subHeadingRow}>
                {' '}
                {deliveryTimeObject.toDateString() +
                  ', ' +
                  deliveryTimeObject.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}{' '}
              </Text>
            )}
          </View>
        </View>
      }
      <RadioButton.Android
        uncheckedColor={Color.primary}
        color={Color.primary}
        value="first"
        status={
          deliveryTime === '' && item.id === 1
            ? 'checked'
            : deliveryTime !== '' && item.id === 2
            ? 'checked'
            : 'unchecked'
        }
        onPress={() => {
          if (item.id === 1) {
            setDeliveryTime('');
            setDeliveryTimeObject(null);
            return;
          } else if (item.id === 2) {
            setOpen(true);
            return;
          }
        }}
      />
    </TouchableOpacity>
  );
};

const TimeData = [
  {
    id: 1,
    name: 'ASAP / Now',

    icon: 'truck-delivery-outline',
    chevron: 'chevron-small-right',
    navLink: 'Payment',
  },
  {
    id: 2,
    name: 'Later',
    icon: 'clock',
    chevron: 'chevron-small-right',
  },
];
