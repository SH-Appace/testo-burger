import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import AppBar from '../../../components/AppBar';
import {CompleteOrderSvg} from '../../../assets/svgs/OrderSvgs';
import Button from '../../../components/Button';
import {EmptyStar, FullStar} from '../../../assets/svgs/ReviewSvgs';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {postReview} from '../../../apis/review';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {useBackButton} from '../../../hooks';

const OrderReview = ({route, navigation}) => {
  const [rating, setRating] = useState(-1);
  const [loading, setLoading] = useState(false);

  const {item} = route.params;
  const {auth} = useSelector(state => ({...state}));
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar />

      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.greenBox}>
          <CompleteOrderSvg width={Window.width / 5.5} />
        </View>
        <Text style={styles.titleText}>
          How was the delivery of your order?
        </Text>
        <View style={styles.row}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Font.Urbanist_Medium,
              color: Color.secondary,
              textAlign: 'center',
              marginTop: 30,
            }}>
            #{item.id}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Font.Urbanist_Medium,
              color: Color.primary,
              textAlign: 'center',
              marginTop: 30,
            }}>
            ${item.order_amount}
          </Text>
        </View>
        {item.details.map((x, i) => (
          <View key={i} style={[styles.row, {marginTop: 10}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{uri: x.food_details.image}}
                resizeMode="contain"
                style={styles.foodImage}
              />
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Font.Urbanist_Medium,
                    color: Color.secondary,
                  }}>
                  {x.food_details.name}
                </Text>
                {x.add_ons.map((addon, index) => (
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Font.Urbanist_Medium,
                      color: Color.secondary,
                    }}>
                    {addon.name}
                  </Text>
                ))}
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Font.Urbanist_Medium,
                  color: Color.secondary,
                  textAlign: 'right',
                }}>
                {x.quantity > 1 ? `x${x.quantity}` : ''} ${x.food_details.price}
              </Text>
              {x.add_ons.map((addon, index) => (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Font.Urbanist_Medium,
                    color: Color.secondary,
                    textAlign: 'right',
                  }}>
                  {x.quantity > 1 ? `x${x.quantity}` : ''} ${addon.price}
                </Text>
              ))}
            </View>
          </View>
        ))}
        <Text
          style={{
            fontSize: 18,
            fontFamily: Font.Urbanist_Medium,
            color: '#616161',
            textAlign: 'center',
            marginTop: 50,
          }}>
          Enjoyed your food? Rate the food, your feedback matters.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
          }}>
          {stars.map((star, indexStar) => {
            if (indexStar === 0) {
              return (
                <TouchableOpacity
                  style={styles.starBtn}
                  onPress={() => setRating(indexStar)}>
                  {rating >= 0 && indexStar === 0 ? (
                    <FullStar />
                  ) : (
                    <EmptyStar />
                  )}
                </TouchableOpacity>
              );
            } else if (indexStar === 1) {
              return (
                <TouchableOpacity
                  style={styles.starBtn}
                  onPress={() => setRating(indexStar)}>
                  {rating >= 1 && indexStar === 1 ? (
                    <FullStar />
                  ) : (
                    <EmptyStar />
                  )}
                </TouchableOpacity>
              );
            } else if (indexStar === 2) {
              return (
                <TouchableOpacity
                  style={styles.starBtn}
                  onPress={() => setRating(indexStar)}>
                  {rating >= 2 && indexStar === 2 ? (
                    <FullStar />
                  ) : (
                    <EmptyStar />
                  )}
                </TouchableOpacity>
              );
            } else if (indexStar === 3) {
              return (
                <TouchableOpacity
                  style={styles.starBtn}
                  onPress={() => setRating(indexStar)}>
                  {rating >= 3 && indexStar === 3 ? (
                    <FullStar />
                  ) : (
                    <EmptyStar />
                  )}
                </TouchableOpacity>
              );
            } else if (indexStar === 4) {
              return (
                <TouchableOpacity
                  style={styles.starBtn}
                  onPress={() => setRating(indexStar)}>
                  {rating >= 4 && indexStar === 4 ? (
                    <FullStar />
                  ) : (
                    <EmptyStar />
                  )}
                </TouchableOpacity>
              );
            }
          })}
        </View>
        {rating !== -1 && (
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: '#EEEEEE',
              paddingTop: 30,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Font.Urbanist_Medium,
                color: Color.secondary,
                textAlign: 'center',
              }}>
              {rating === 0
                ? 'Very Poor'
                : rating === 1
                ? 'Poor'
                : rating === 2
                ? 'Average'
                : rating === 3
                ? 'Good'
                : rating === 4
                ? 'Very Good'
                : null}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={{bottom: 0, flexDirection: 'row', paddingVertical: 25}}>
        <View style={{flex: 1, marginRight: 5}}>
          <Button
            text="Cancel"
            icon="mail"
            isIcon={false}
            theme="alternate"
            onPressFunc={() => navigation.goBack()}
          />
        </View>
        <View style={{flex: 1, marginLeft: 5}}>
          <Button
            text="Submit"
            icon="mail"
            isIcon={false}
            theme="primary"
            onPressFunc={() => {
              if (rating === -1) {
                showMessage({
                  message: 'Please select a rating!',
                  type: 'danger',
                });
                return;
              }
              postReview(
                {
                  order_id: item.id,
                  rating: rating + 1,
                },
                auth.token,
                navigation,
                setLoading,
              );
            }}
          />
        </View>
      </View>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#000000AA',
          }}>
          <SkypeIndicator size={50} color={Color.grey} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderReview;

const styles = StyleSheet.create({
  greenBox: {
    height: Window.width / 3,
    width: Window.width / 3,
    borderRadius: Window.width / 12,
    marginRight: 15,
    backgroundColor: '#859B5D',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 32,
    fontFamily: Font.Urbanist_Bold,
    color: Color.secondary,
    textAlign: 'center',
    marginTop: 30,
  },
  foodImage: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#F6F4F4',
    marginRight: 10,
  },
  starBtn: {
    marginHorizontal: 15,
  },
});

const stars = [1, 2, 3, 4, 5];
