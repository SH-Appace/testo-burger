import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../globalStyle/Theme';
import Icon from '../core/Icon';

const CheckoutDeliverTo = () => {
  const {auth} = useSelector(state => ({...state}));
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.headingBox}>Deliver to</Text>
      <View style={GlobalStyle.TopBorderStyle} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Delivery', {
            openPopupParam: false,
            placeName: '',
            coords: {},
            fromProfile: false,
          })
        }
        style={[styles.row, {justifyContent: 'space-between'}]}>
        {auth.user?.default_address ? (
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Icon
                iconFamily={'Ionicons'}
                color={Color.light}
                name="ios-location-sharp"
                size={20}
              />
            </View>
            <View style={{marginLeft: 15}}>
              <View style={styles.row}>
                <Text style={styles.headingRow}>
                  {auth.user?.default_address.address_type}
                </Text>
                <Text style={styles.defaultText}>Default</Text>
              </View>
              <Text style={styles.address}>
                {auth.user?.default_address.address}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={[styles.headingRow, {fontSize: 12}]}>
            Add New Delivery Address
          </Text>
        )}
        <Icon
          iconFamily={'Entypo'}
          name="chevron-small-right"
          size={25}
          color={Color.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutDeliverTo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.light,
    padding: 15,
    marginTop: 20,
    borderRadius: BorderRadius,
    marginHorizontal: Window.fixPadding * 2,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  headingBox: {
    fontSize: 20,
    color: Color.tertiary,
    lineHeight: 24,
    fontFamily: Font.Urbanist_Bold,
  },
  headingRow: {
    fontSize: 18,
    color: Color.tertiary,
    lineHeight: 21.6,
    width: 150,
    fontFamily: Font.Urbanist_Bold,
  },
  iconCircle: {
    backgroundColor: Color.primary,
    padding: 15,
    borderRadius: 50,
  },
  defaultText: {
    lineHeight: 12,
    fontSize: 10,
    backgroundColor: Color.primary,
    color: Color.light,
    padding: 8,
    marginLeft: 10,
    fontFamily: Font.Urbanist_SemiBold,
    borderRadius: BorderRadius,
  },
  address: {
    marginTop: 10,
    fontSize: 14,
    color: Color.greyscale,
    fontFamily: Font.Urbanist_Medium,
    width: Window.width / 1.8,
  },
});
