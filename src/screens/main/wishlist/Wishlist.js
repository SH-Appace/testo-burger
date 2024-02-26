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
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../../../globalStyle/Theme';
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

const Cart = ({item}) => {
  let navigation = useNavigation();
  const [reRenderHeart, setReRenderHeart] = useState(false);
  return (
    <TouchableOpacity
      onPress={
        () =>
          navigation.navigate('BottomTabScreen', {
            screen: 'HomeStack',
            params: {
              screen: 'Custom',
              params: {
                edit: false,
                productId: item.id,
                product: item,
                fromMenu: true,
              },
            },
          })
        // navigation.reset({
        //   index: 0,
        //   routes: [
        //     {
        //       name: 'BottomTabScreen',
        //       state: {
        //         routes: [
        //           {
        //             name: 'HomeStack',
        //             state: {
        //               routes: [
        //                 {
        //                   name: 'Custom',
        //                   params: {
        //                     edit: false,
        //                     productId: item.id,
        //                     product: item,
        //                     fromMenu: true,
        //                   },
        //                 },
        //               ],
        //             },
        //           },
        //         ],
        //       },
        //     },
        //   ],
        // })
      }
      style={{
        backgroundColor: Color.light,
        borderRadius: BorderRadius,
        marginVertical: 10,
        height: Window.height / 6,
        flexDirection: 'row',
        overflow: 'hidden',
      }}>
      <View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={styles.ImgStyle}
          // source={{uri: item.image}}
          source={require('../../../assets/images/pics/foodBg.png')}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 0.6, justifyContent: 'center'}}>
        <View style={{marginHorizontal: 15}}>
          <Text style={styles.TopTextStyle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.DescTextStyle} numberOfLines={2}>
            {item.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...styles.Heading,
                color: Color.primary,
                marginRight: 10,
              }}>
              ${item.price}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                iconFamily={'FontAwesome'}
                color={Color.orange}
                size={12}
                name={parseInt(item.avg_rating) >= 1 ? 'star' : 'star-o'}
              />
              <Icon
                iconFamily={'FontAwesome'}
                color={Color.orange}
                size={12}
                name={parseInt(item.avg_rating) >= 2 ? 'star' : 'star-o'}
              />
              <Icon
                iconFamily={'FontAwesome'}
                color={Color.orange}
                size={12}
                name={parseInt(item.avg_rating) >= 3 ? 'star' : 'star-o'}
              />
              <Icon
                iconFamily={'FontAwesome'}
                color={Color.orange}
                size={12}
                name={parseInt(item.avg_rating) >= 4 ? 'star' : 'star-o'}
              />
              <Icon
                iconFamily={'FontAwesome'}
                color={Color.orange}
                size={12}
                name={parseInt(item.avg_rating) >= 5 ? 'star' : 'star-o'}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
