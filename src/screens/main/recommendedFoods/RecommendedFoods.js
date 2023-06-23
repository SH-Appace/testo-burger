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
import {useSelector} from 'react-redux';
import {HorizontalFlatList} from '@idiosync/horizontal-flatlist';
import {useState} from 'react';
import Icon from '../../../core/Icon';
import {useNavigation} from '@react-navigation/native';
import styles from './RecommendedFoodsStyles';
import {ManuIcon} from '../../../assets/svgs/SocialIconsSvgs';
import {getRecommendedProductsReq} from '../../../apis/categories';
import Button from '../../../components/Button';
import {useBackButton} from '../../../hooks';

const RecommendedFoods = ({navigation, route}) => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);
  const {categories, products, auth} = useSelector(state => ({...state}));
  useEffect(() => {
    getRecommendedProductsReq(auth.token, setData);
  }, []);

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={{backgroundColor: Color.light, flex: 1}}>
      <View style={{marginHorizontal: Window.fixPadding * 2}}>
        <AppBar
          center={
            <Text style={GlobalStyle.AppCenterTextStyle}>Order Placed</Text>
          }
        />
      </View>

      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={GlobalStyle.Container}>
          <View style={styles.BoxContainerStyle}>
            <Text
              style={{
                color: Color.primary,
                fontFamily: Font.Urbanist_Bold,
                fontSize: 24,
              }}>
              Order completed
            </Text>
            {route.params.points !== null && (
              <Text
                style={{
                  color: Color.secondary,
                  fontFamily: Font.Urbanist_Medium,
                  fontSize: 14,
                  marginTop: 5,
                }}>
                {route.params.points} Points Rewarded
              </Text>
            )}
            <View style={GlobalStyle.TopBorderStyle} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Image
                style={{alignSelf: 'center', width: 80, height: 80}}
                source={require('../../../assets/images/pics/SmileEmoji.png')}
              />
              <Text
                style={{
                  color: Color.secondary,
                  fontFamily: Font.Urbanist_Regular,
                  fontSize: 16,
                  marginRight: 15,
                  textAlign: 'center',
                }}>
                Enjoy your meal!{'\n'} See you in the next order :)
              </Text>
            </View>
            <Button
              text={'View Orders'}
              icon="mail"
              isIcon={false}
              theme="primary"
              onPressFunc={() =>
                navigation.reset({
                  index: 0,

                  routes: [
                    {
                      name: 'BottomTabScreen',
                      state: {
                        routes: [{name: 'OrderStack'}],
                      },
                    },
                  ],
                })
              }
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              color: Color.secondary,
              fontFamily: Font.Urbanist_Bold,
              marginBottom: 10,
              marginTop: 25,
            }}>
            Recommended Foods
          </Text>
          {data.map((item, index) => (
            <Cart item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecommendedFoods;

const Cart = ({item}) => {
  let navigation = useNavigation();
  const [reRenderHeart, setReRenderHeart] = useState(false);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Custom', {
          edit: false,
          productId: item.id,
          product: item,
          fromMenu: true,
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
              item.isFav = !item.isFav;
              setReRenderHeart(!reRenderHeart);
            }}>
            <Icon
              iconFamily={'AntDesign'}
              style={styles.heartIcon}
              color={item.isFav ? Color.black : Color.light}
              name={item.isFav ? 'heart' : 'hearto'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
