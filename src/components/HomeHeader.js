import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from '../core/Icon';
import {useNavigation} from '@react-navigation/native';
import {ManuIcon} from '../assets/svgs/SocialIconsSvgs';
import {Color} from '../globalStyle/Theme';
import {useSelector} from 'react-redux';

const HomeHeader = () => {
  const {wishlist, cart} = useSelector(state => ({
    ...state,
  }));
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.row,
        {
          justifyContent: 'space-between',
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <ManuIcon />
      </TouchableOpacity>
      <View
        style={[
          styles.row,
          {
            justifyContent: 'flex-end',
          },
        ]}>
        <TouchableOpacity
          style={[styles.iconButton, {marginRight: 10}]}
          onPress={() => navigation.navigate('Wishlist')}>
          <Icon
            iconFamily={'Ionicons'}
            name={'heart-outline'}
            size={20}
            color={Color.tertiary}
          />
          {wishlist.addedItems.length > 0 && <View style={styles.alertDot} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, {marginRight: 10}]}
          onPress={() => navigation.navigate('QRCode')}>
          <Icon
            iconFamily={'Ionicons'}
            name={'scan'}
            size={20}
            color={Color.tertiary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, {marginRight: 10}]}
          onPress={() => navigation.navigate('Notification')}>
          <Icon
            iconFamily={'Ionicons'}
            name={'notifications-outline'}
            size={20}
            color={Color.tertiary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate('CheckOut', {
              reorder: false,
            })
          }>
          <Icon
            iconFamily={'Feather'}
            name={'shopping-bag'}
            size={20}
            color={Color.tertiary}
          />
          {cart.addedItems.length > 0 && <View style={styles.alertDot} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  iconButton: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.light,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  alertDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#F75555',
    position: 'absolute',
    right: 22,
    top: 12,
  },
});
