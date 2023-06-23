import React, { useEffect, useState } from 'react';
import {
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyle, Font, Window, Color } from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import TextField from '../../../components/TextFeild';
import styles from './HomePageStyle';
import { Data, OrderTypeData } from './HomePageDetails';
import {
  ChickenIcon,
  FriesIcon,
  MuffinIcon,
  SodaIcon,
} from '../../../assets/svgs/FoodItems';
import { categoriesnReq } from '../../../apis/categories';
import { useDispatch, useSelector } from 'react-redux';

const FoodCategory = ({ item, setState, state, setActiveCategory }) => {
  const handleClick = id => {
    setState(id);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setActiveCategory(item.name);

        handleClick(item.id);
      }}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 75,
          width: Window.width / 5.6,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          marginVertical: 10,
          marginHorizontal: 12,
          backgroundColor: state == item.id ? Color.primary : '#F6F4F4',
        }}>
        {item.id === 1 ? (
          <SodaIcon color={state == item.id ? Color.light : '#2A3B56'} />
        ) : item.id === 2 ? (
          <ChickenIcon color={state == item.id ? Color.light : '#2A3B56'} />
        ) : item.id === 3 ? (
          <MuffinIcon color={state == item.id ? Color.light : '#2A3B56'} />
        ) : item.id === 4 ? (
          <FriesIcon color={state == item.id ? Color.light : '#2A3B56'} />
        ) : item.id === 5 ? (
          <SodaIcon color={state == item.id ? Color.light : '#2A3B56'} />
        ) : item.id === 6 ? (
          <ChickenIcon color={state == item.id ? Color.light : '#2A3B56'} />
        ) : item.id === 7 ? (
          <MuffinIcon color={state == item.id ? Color.light : '#2A3B56'} />
        ) : item.id === 8 ? (
          <FriesIcon color={state == item.id ? Color.light : '#2A3B56'} />
        ) : null}
      </View>

      <Text
        style={{ ...GlobalStyle.Heading, fontSize: 14, color: Color.headingSm }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const Cart = ({ item }) => {
  let navigation = useNavigation();
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const decrementValue = name => {
    if (name == 'child') {
      setChildCount(childCount - 1);
    } else if (name == 'adult') {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
      }
    }
  };
  const incrementValue = name => {
    if (name == 'child') {
      setChildCount(childCount + 1);
    } else if (name == 'adult') {
      setAdultCount(adultCount + 1);
    }
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Custom', {
          productId: item.id,
          product: item,
        })
      }
      style={{
        backgroundColor: '#F6F4F4',
        borderRadius: 20,
        marginVertical: 10,
        height: Window.height / 7,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={styles.CartMainContainer}>
        <View>
          <Image
            style={styles.ImgStyle}
            source={{ uri: item.image }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.CartRightContainer}>
          <View style={{ width: Window.width / 2 }}>
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    iconFamily={'Ionicons'}
                    color={'#8A94A3'}
                    size={12}
                    name={'lock-closed-outline'}
                  />
                  <Text
                    style={{ ...styles.MiddleTextStyle }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.order_count} |
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    iconFamily={'Feather'}
                    color={'#8A94A3'}
                    size={12}
                    name={'thumbs-up'}
                  />
                  <Text
                    style={{ ...styles.MiddleTextStyle }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.rating_count}
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: Window.fixPadding * 1.5 }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => decrementValue('adult')}>
                    <Icon
                      iconFamily={'AntDesign'}
                      name={'minus'}
                      style={styles.MinusStyle}
                    />
                  </TouchableOpacity>
                  <Text style={styles.NumStyle}>{adultCount}</Text>
                  <TouchableOpacity
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 50,
                      backgroundColor: Color.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.LastTextStyle}>${item.price}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};




const Home = ({ navigation }) => {
  const [active, setActive] = useState(0);
  const [activeCategory, setActiveCategory] = useState('');

  const { categories, products, auth } = useSelector(state => ({ ...state }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.light }}>
      <StatusBar
        translucent
        backgroundColor={Color.light}
        barStyle={'dark-content'}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 25 }}>
        <View
          style={{
            paddingHorizontal: Window.fixPadding * 2,
            backgroundColor: Color.light,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../../assets/images/avatar/Ellipse.png')}
              />
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text
                  style={{ ...GlobalStyle.BasicTextStyle, marginVertical: 5 }}>
                  Deliver to
                </Text>
                <Text style={[GlobalStyle.Heading, { fontSize: 20 }]}>
                  {auth.user.default_address.address_type}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={[styles.TopIconStyle, { marginRight: 10 }]}>
                <Icon
                  iconFamily={'Ionicons'}
                  name={'notifications-outline'}
                  size={20}
                  color={Color.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.TopIconStyle}
                onPress={() => navigation.navigate('CheckOut')}>
                <Icon
                  iconFamily={'Feather'}
                  name={'shopping-bag'}
                  size={20}
                  color={Color.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <TextField
              icon="magnify"
              placeholder="What are you craving?"
              placeholderColor="#BDBDBD"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[GlobalStyle.Heading, { fontSize: 20 }]}>
              Special Offers
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SpecialOffer')}>
              <Text
                style={{
                  ...GlobalStyle.Heading,
                  color: Color.secondary,
                  fontSize: 16,
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>



          <View
            style={{
              width: '100%',
              borderRadius: 35,
              overflow: 'hidden',
              height: 180,
              marginVertical: 10,
              shadowColor: 'rgba(27, 172, 75, 0.25)',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              source={require('../../../assets/images/pics/banner.png')}
              resizeMode="cover"
            />
          </View>
        </View>

        <View>
          {categories && (
            <FlatList
              data={categories[0]}
              contentContainerStyle={{
                paddingHorizontal: Window.fixPadding * 2,
              }}
              renderItem={({ item, index }) => (
                <FoodCategory
                  item={item}
                  key={index}
                  state={active}
                  setState={setActive}
                  setActiveCategory={setActiveCategory}
                />
              )}
              horizontal={true}
              showsHorizontalScrollIndicator
              bounces={false}
              numColumns={1}
            />
          )}
        </View>

        <View style={[GlobalStyle.Container, { marginVertical: 20 }]}>
          {active !== 0 && (
            <TouchableOpacity
              onPress={() => {
                setActive(0);
                setActiveCategory('');
              }}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#EEEEEE',
                paddingVertical: 10,
                paddingHorizontal: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Font.Urbanist_Bold,
                  fontSize: 14,
                  color: Color.headingSm,
                }}>
                Category Selected: {activeCategory}
              </Text>
              <Icon
                iconFamily={'Entypo'}
                color={Color.headingSm}
                size={22}
                name={'cross'}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={GlobalStyle.Container}>
          {active !== 0
            ? products[0] &&
            products[0]
              .filter(x => x.category_id === active)
              .map((item, index) => <Cart item={item} key={index} />)
            : products[0] &&
            products[0].map((item, index) => (
              <Cart item={item} key={index} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
