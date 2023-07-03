import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import AppBar from '../../../components/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import Icon from '../../../core/Icon';
import {useNavigation} from '@react-navigation/native';
import styles from './WishlistStyles';
import {addWishlist, removeWishlist} from '../../../apis/wishlist';
import {EmptyWishlistSvg} from '../../../assets/svgs/wishlistSvgs';
import {useBackButton} from '../../../hooks';

const Wishlist = ({navigation, route}) => {
  const {wishlist, auth} = useSelector(state => ({...state}));
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={{backgroundColor: '#F9F9F9', flex: 1}}>
      <View style={{marginHorizontal: Window.fixPadding * 2}}>
        <AppBar
          center={<Text style={GlobalStyle.AppCenterTextStyle}>Wishlist</Text>}
        />
      </View>

      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={GlobalStyle.Container}>
          {wishlist.addedItems.length > 0 ? (
            wishlist.addedItems.map((item, index) => (
              <Cart item={item} key={index} wishlist={wishlist} auth={auth} />
            ))
          ) : (
            <View style={{alignSelf: 'center'}}>
              <EmptyWishlistSvg
                width={Window.width / 1.25}
                height={Window.height / 1.35}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;

const Cart = ({item, wishlist, auth}) => {
  let navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Custom', {
          edit: false,
          productId: item.id,
          product: item,
          fromMenu: false,
        })
      }
      style={{
        backgroundColor: Color.light,
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 22,
        borderRadius: 20,
        marginVertical: 10,
        height: Window.height / 7,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <View>
        <Image
          style={styles.ImgStyle}
          source={{uri: item.image}}
          resizeMode="contain"
        />
      </View>
      <View style={{paddingLeft: 15}}>
        <Text style={styles.TopTextStyle}>{item.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              marginTop: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                iconFamily={'FontAwesome'}
                color={Color.orange}
                size={12}
                name={'star'}
              />
              <Text
                style={{...styles.MiddleTextStyle}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.order_count}
              </Text>
              <Text
                style={{...styles.MiddleTextStyle}}
                numberOfLines={1}
                ellipsizeMode="tail">
                ({item.rating_count})
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: Window.width / 1.7,
            overflow: 'hidden',
          }}>
          <Text style={{...styles.Heading, color: Color.primary}}>
            ${item.price}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (wishlist.addedItems.some(e => e.id === item.id)) {
                dispatch({
                  type: 'REMOVE_SINGLE_FROM_WISHLIST',
                  payload: item.id,
                });
                removeWishlist(item.id, auth.token);
              } else {
                dispatch({
                  type: 'ADD_SINGLE_TO_WISHLIST',
                  payload: item,
                });
                addWishlist(
                  {
                    food_id: item.id,
                  },
                  auth.token,
                );
              }
            }}>
            <Icon
              iconFamily={'AntDesign'}
              style={styles.heartIcon}
              color={
                wishlist.addedItems.some(e => e.id === item.id)
                  ? Color.black
                  : Color.light
              }
              name={
                wishlist.addedItems.some(e => e.id === item.id)
                  ? 'heart'
                  : 'hearto'
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
