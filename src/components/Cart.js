import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BorderRadius, Color, Font, Window} from '../globalStyle/Theme';
import Icon from '../core/Icon';

export default function Cart({item, quantity, setQuantity}) {
  const decrementValue = name => {
    if (quantity === 1) return;
    setQuantity(prevVal => prevVal - 1);
  };
  const incrementValue = name => {
    if (quantity === 10) return;
    setQuantity(prevVal => prevVal + 1);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.cartContainer}>
        <View style={styles.imgCont}>
          <Image
            style={styles.ImgStyle}
            source={{uri: item.image}}
            // source={require('../../../assets/images/pics/foodBg.png')}
            resizeMode="cover"
          />
        </View>
        <View style={{flex: 1, paddingLeft: 15}}>
          <Text style={styles.TopTextStyle}>{item.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <View style={styles.ratingRow}>
                <Icon
                  iconFamily={'Ionicons'}
                  color={'#8A94A3'}
                  size={12}
                  name={'lock-closed-outline'}
                />
                <Text
                  style={styles.MiddleTextStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.order_count}
                  {'  '}|{'  '}
                </Text>
                <Icon
                  iconFamily={'Feather'}
                  color={'#8A94A3'}
                  size={12}
                  name={'thumbs-up'}
                />
                <Text
                  style={styles.MiddleTextStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.rating_count}
                </Text>
              </View>
              <Text style={styles.LastTextStyle}> ${item.price} </Text>
            </View>
            <View style={styles.btnCont}>
              <TouchableOpacity
                style={styles.incrementDecrementBtn}
                onPress={() => decrementValue('adult')}>
                <Icon
                  iconFamily={'AntDesign'}
                  name={'minus'}
                  style={styles.MinusStyle}
                />
              </TouchableOpacity>
              <Text style={styles.NumStyle}>{quantity}</Text>
              <TouchableOpacity
                style={[
                  styles.incrementDecrementBtn,
                  {backgroundColor: Color.primary},
                ]}
                onPress={() => incrementValue('adult')}>
                <Icon
                  iconFamily={'Ionicons'}
                  name={'md-add'}
                  color={Color.light}
                  style={styles.AddStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.MiddleTextStyle}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
    borderColor: '#E7E7E7',
    // borderWidth: 1,
    borderRadius: BorderRadius,
    backgroundColor: Color.light,
  },
  cartContainer: {
    height: Window.height / 6.5,
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
    alignItems: 'center',
  },
  imgCont: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImgStyle: {
    width: Window.height / 8,
    height: Window.height / 8,
    backgroundColor: 'black',
    borderRadius: BorderRadius,
  },
  TopTextStyle: {
    color: Color.headingSm,
    fontSize: 16,
    fontFamily: Font.Urbanist_Black,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  MiddleTextStyle: {
    color: Color.greyscale,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.96,
    fontFamily: Font.Urbanist_Regular,
    paddingHorizontal: 2,
  },
  MinusStyle: {
    color: Color.headingSm,
    fontSize: 20,
    fontFamily: Font.Urbanist_Black,
  },
  LastTextStyle: {
    color: Color.primary,
    fontSize: 14,
    fontFamily: Font.Urbanist_Black,
  },
  btnCont: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  incrementDecrementBtn: {
    width: 35,
    height: 35,
    borderRadius: BorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.primary,
  },
  NumStyle: {
    color: Color.headingSm,
    fontSize: 16,
    fontFamily: Font.Urbanist_Black,
    marginHorizontal: 10,
    width: 20,
    textAlign: 'center',
  },
  AddStyle: {
    color: 'white',
    fontSize: 20,
    fontFamily: Font.Urbanist_Black,
  },
});
