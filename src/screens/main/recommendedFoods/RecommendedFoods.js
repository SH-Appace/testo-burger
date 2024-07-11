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
import {useSelector} from 'react-redux';
import {HorizontalFlatList} from '@idiosync/horizontal-flatlist';
import {useState} from 'react';
import Icon from '../../../core/Icon';
import {useNavigation} from '@react-navigation/native';
import styles from './RecommendedFoodsStyles';
import {getRecommendedProductsReq} from '../../../apis/categories';
import Button from '../../../components/Button';
import {useBackButton} from '../../../hooks';
import DeviceInfo from 'react-native-device-info';

const RecommendedFoods = ({navigation, route}) => {
  let hasNotch = DeviceInfo.hasNotch();

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
    <SafeAreaView
      style={{backgroundColor: '#F9F9F9', flex: 1}}
      edges={{
        top: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
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
                color: Color.tertiary,
                fontFamily: Font.Urbanist_Bold,
                fontSize: 24,
              }}>
              Order completed
            </Text>
            {route.params.points !== null && (
              <Text
                style={{
                  color: Color.primary,
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
              color: Color.tertiary,
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
