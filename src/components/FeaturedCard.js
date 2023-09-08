import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {BorderRadius, Color, Font} from '../globalStyle/Theme';
import Icon from '../core/Icon';

const FeaturedCard = ({item, index}) => {
  let navigation = useNavigation();

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
      style={[
        styles.container,
        {
          marginLeft: index === 0 ? 0 : 12,
        },
      ]}>
      <Image
        style={styles.image}
        source={{uri: item.image}}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      <View
        style={[
          styles.row,
          {
            marginTop: 2.5,
            justifyContent: 'space-between',
          },
        ]}>
        <Text style={{...styles.Heading, color: Color.primary, fontSize: 18}}>
          ${item.price}
        </Text>
        <View style={styles.row}>
          <Icon
            iconFamily={'FontAwesome'}
            color={Color.primary}
            size={12}
            name={parseInt(item.avg_rating) >= 1 ? 'star' : 'star-o'}
          />
          <Icon
            iconFamily={'FontAwesome'}
            color={Color.primary}
            size={12}
            name={parseInt(item.avg_rating) >= 2 ? 'star' : 'star-o'}
          />
          <Icon
            iconFamily={'FontAwesome'}
            color={Color.primary}
            size={12}
            name={parseInt(item.avg_rating) >= 3 ? 'star' : 'star-o'}
          />
          <Icon
            iconFamily={'FontAwesome'}
            color={Color.primary}
            size={12}
            name={parseInt(item.avg_rating) >= 4 ? 'star' : 'star-o'}
          />
          <Icon
            iconFamily={'FontAwesome'}
            color={Color.primary}
            size={12}
            name={parseInt(item.avg_rating) >= 5 ? 'star' : 'star-o'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.light,
    borderRadius: BorderRadius,
    width: 160,
    height: 240,
    overflow: 'hidden',
    padding: 15,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  image: {
    height: 130,
    width: 130,
    borderRadius: BorderRadius,
  },
  description: {
    fontSize: 12,
    fontFamily: Font.Urbanist_Light,
    color: Color.greyscale,
    height: 30,
  },
  title: {
    color: Color.tertiary,
    lineHeight: 24,
    fontFamily: Font.Urbanist_Bold,
    fontSize: 18,
    width: '90%',
    marginTop: 2.5,
  },
});
