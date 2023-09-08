/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  ScrollView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GlobalStyle,
  Font,
  Window,
  Color,
  BorderRadius,
} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import styles from './HomePageStyle';
import {useSelector} from 'react-redux';
import {BookSvg, LoyaltySvg, ReferSvg} from '../../../assets/svgs/HomePage';
import {ManuIcon} from '../../../assets/svgs/SocialIconsSvgs';
import {HorizontalFlatList} from '@idiosync/horizontal-flatlist';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import SearchComponent from '../../../components/SearchComponent';
import Swiper from 'react-native-swiper';
import {updateFCMToken} from '../../../apis/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import OrderType from '../../../components/OrderType';
import FeaturedCard from '../../../components/FeaturedCard';
import SearchBar from '../../../components/SearchBar';

const Home = ({navigation}) => {
  const [activeBg, setActiveBg] = useState(1);
  const [catState, setCatState] = useState(false);
  const [bannerImg, setBannerImg] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  let hasNotch = DeviceInfo.hasNotch();

  const {categories, products, banners, auth, wishlist, cart} = useSelector(
    state => ({
      ...state,
    }),
  );
  const renderItemCategories = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.reset({
          routes: [
            {
              name: 'BottomTabScreen',
              state: {
                routes: [
                  {
                    name: 'Menu',
                    params: {
                      activeId: item.id,
                      activeCat: item.name,
                    },
                  },
                ],
              },
            },
          ],
        })
      }
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
          paddingVertical: 5,
          width: catState ? Window.width / 4 : Window.width / 4.5,
          borderRadius: BorderRadius,
          backgroundColor: Color.light,
        },
        catState && {
          flex: 1,
        },
      ]}>
      <Image
        style={{height: 50, width: 50}}
        source={{uri: item.icon}}
        resizeMode="contain"
      />
      <Text
        numberOfLines={1}
        style={{
          ...GlobalStyle.Heading,
          fontSize: 13,
          marginTop: 5,
          width: Window.width / 5,
          textAlign: 'center',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    banners[0].map(x => setBannerImg(prev => [x.image, ...prev]));
  }, []);
  /// Animated
  const progress = useSharedValue(0);
  const progress2 = useSharedValue(1);
  const progress3 = useSharedValue(235);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  }, []);
  const reanimatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: progress2.value,
    };
  }, []);
  const reanimatedStyle3 = useAnimatedStyle(() => {
    return {
      height: progress3.value,
    };
  }, []);

  useEffect(() => {
    if (catState) {
      progress.value = withSpring(1);
    } else {
      progress.value = withSpring(0);
    }
    if (catState) {
      progress2.value = withSpring(0);
    } else {
      progress2.value = withSpring(1);
    }
    if (catState) {
      progress3.value = withSpring((categories[0].length / 4) * 110);
    } else {
      progress3.value = withSpring(180);
    }
  }, [catState]);

  useEffect(async () => {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    updateFCMToken(
      {
        cm_firebase_token: fcmtoken,
      },
      auth.token,
    );
  }, []);

  // BackHandler
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#F9F9F9'}}
      edges={{
        top: 'maximum',
        right: 'maximum',
        left: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: 20}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: Window.fixPadding * 2,
          }}>
          <Header navigation={navigation} cart={cart} wishlist={wishlist} />
          <SearchBar setOpenSearch={setOpenSearch} />
        </View>
        <SectionRow
          title="Special Offers"
          altTitle="See All"
          onPress={() => navigation.navigate('SpecialOffer')}
        />
        <Swiper
          autoplay
          style={{height: 180}}
          activeDot={
            <View
              style={{
                width: 16,
                height: 4,
                borderRadius: 100,
                marginHorizontal: 5,
                backgroundColor: '#FFFFFF',
              }}
            />
          }
          dot={
            <View
              style={{
                width: 16,
                height: 4,
                borderRadius: 100,
                marginHorizontal: 5,
                backgroundColor: '#E0E0E0',
                opacity: 0.7,
              }}
            />
          }>
          {bannerImg.map(x => (
            <Image
              source={{uri: x}}
              style={{
                height: 180,
                borderRadius: BorderRadius,
                width: '90%',
                alignSelf: 'center',
              }}
              resizeMethod={'resize'}
              resizeMode={'cover'}
            />
          ))}
        </Swiper>

        <View style={[styles.headingRow]}>
          <Text style={styles.Heading}>Order Type</Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.primary,
              fontFamily: Font.Urbanist_Bold,
              lineHeight: 22,
            }}>
            Select any 1 Option
          </Text>
        </View>

        <OrderType setActiveBg={setActiveBg} activeBg={activeBg} />

        <View style={styles.headingRow}>
          <Text style={styles.Heading}>Discount Guaranteed! 👌</Text>
          <Text
            onPress={() => navigation.navigate('Menu')}
            style={{
              fontSize: 16,
              fontFamily: Font.Urbanist_Bold,
              color: Color.primary,
            }}>
            See All
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
          }}>
          {products[0] &&
            products[0].map((item, index) => (
              <FeaturedCard item={item} key={index} index={index} />
            ))}
        </ScrollView>
        <View style={styles.headingRow}>
          <Text style={styles.Heading}>Food Categories! 👌</Text>
          {catState ? (
            <TouchableOpacity onPress={() => setCatState(false)}>
              <Icon
                iconFamily={'AntDesign'}
                name="close"
                size={20}
                color={Color.secondary}
              />
            </TouchableOpacity>
          ) : (
            <Text
              onPress={() => {
                setCatState(true);
              }}
              style={{
                fontSize: 16,
                fontFamily: Font.Urbanist_Bold,
                color: Color.primary,
              }}>
              See All
            </Text>
          )}
        </View>
        {categories && (
          <Animated.View style={reanimatedStyle3}>
            <Animated.View style={[reanimatedStyle, {paddingHorizontal: 20}]}>
              <FlatList
                data={categories[0]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                initialNumToRender={4}
                renderItem={renderItemCategories}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                scrollEnabled={false}
              />
            </Animated.View>

            <Animated.View
              style={[reanimatedStyle2, {position: 'absolute', top: 0}]}>
              <HorizontalFlatList
                initialNumToRender={2}
                data={categories[0]}
                contentContainerStyle={{paddingHorizontal: 10}}
                numRows={2}
                keyExtractor={(item, row, col) => item.id}
                renderItem={renderItemCategories}
              />
            </Animated.View>
          </Animated.View>
        )}
        <ReferCard navigation={navigation} />
        <LoyaltyCard navigation={navigation} />
        <BookCard navigation={navigation} />
      </ScrollView>

      <SearchComponent open={openSearch} setOpen={setOpenSearch} />
    </SafeAreaView>
  );
};

const LoyaltyCard = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: BorderRadius,
        marginHorizontal: Window.fixPadding * 2,
        height: 113,
        marginVertical: 15,
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 22,
      }}
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'BottomTabScreen',
              state: {
                routes: [
                  {
                    name: 'ProfileStack',
                    state: {
                      routes: [
                        {
                          name: 'Loyalty',
                          params: {
                            fromHome: true,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        })
      }>
      <ImageBackground
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: BorderRadius,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: BorderRadius,

          justifyContent: 'center',
        }}
        source={require('../../../assets/images/pics/loyaltyBg.jpg')}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: Font.Urbanist_Black,
            color: Color.light,
            width: Window.width / 2.2,
            marginLeft: 25,
          }}>
          Collect Points For Every Order
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Font.Urbanist_Regular,
            color: Color.light,
            marginLeft: 25,
          }}>
          earn points & get discounts
        </Text>
        <View
          style={{
            width: Window.width / 2.2,
            height: Window.width / 2.2,
            position: 'absolute',
            right: -40,
            top: -40,
          }}>
          <LoyaltySvg width={Window.width / 3} height={Window.width / 2} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const ReferCard = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: BorderRadius,
        // overflow: 'hidden',
        marginHorizontal: Window.fixPadding * 2,
        height: 113,
        marginVertical: 15,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 22,
      }}
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'BottomTabScreen',
              state: {
                routes: [
                  {
                    name: 'ProfileStack',
                    state: {
                      routes: [
                        {
                          name: 'Referral',
                          params: {
                            fromHome: true,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        })
      }>
      <ImageBackground
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: BorderRadius,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: BorderRadius,

          justifyContent: 'center',
        }}
        source={require('../../../assets/images/pics/referBg.jpg')}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: Font.Urbanist_Black,
            color: Color.light,
            marginLeft: 25,
          }}>
          Refer a Friend
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Font.Urbanist_Regular,
            color: Color.light,
            marginLeft: 25,
          }}>
          and both get a discount!
        </Text>
        <View
          style={{
            width: Window.width / 2.2,
            height: Window.width / 2.2,
            position: 'absolute',
            right: -20,
            top: -40,
          }}>
          <ReferSvg width={Window.width / 2.35} height={Window.width / 2.2} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const BookCard = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: BorderRadius,
        overflow: 'hidden',
        marginHorizontal: Window.fixPadding * 2,
        height: 113,
        marginVertical: 15,
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 22,
      }}
      onPress={() => navigation.navigate('BookATable')}>
      <ImageBackground
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: BorderRadius,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: BorderRadius,

          justifyContent: 'center',
        }}
        source={require('../../../assets/images/pics/bookBg.png')}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: Font.Urbanist_Black,
            color: Color.light,
            marginLeft: 25,
          }}>
          Book a Table
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Font.Urbanist_Regular,
            color: Color.light,
            marginLeft: 25,
          }}>
          earn point & get discount
        </Text>
        <View
          style={{
            width: Window.width / 2.2,
            height: Window.width / 2.2,
            position: 'absolute',
            right: -20,
            top: -30,
          }}>
          <BookSvg width={Window.width / 2.35} height={Window.width / 2.2} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const Header = ({navigation, cart, wishlist}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <ManuIcon />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <View>
          <TouchableOpacity
            style={[styles.TopIconStyle, {marginRight: 10}]}
            onPress={() => navigation.navigate('Wishlist')}>
            <Icon
              iconFamily={'Ionicons'}
              name={'heart-outline'}
              size={20}
              color={Color.tertiary}
            />
          </TouchableOpacity>
          {wishlist.addedItems.length > 0 && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#F75555',
                position: 'absolute',
                right: 22,
                top: 12,
              }}
            />
          )}
        </View>
        <TouchableOpacity
          style={[styles.TopIconStyle, {marginRight: 10}]}
          onPress={() => navigation.navigate('QRCode')}>
          <Icon
            iconFamily={'Ionicons'}
            name={'scan'}
            size={20}
            color={Color.tertiary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.TopIconStyle, {marginRight: 10}]}
          onPress={() => navigation.navigate('Notification')}>
          <Icon
            iconFamily={'Ionicons'}
            name={'notifications-outline'}
            size={20}
            color={Color.tertiary}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={styles.TopIconStyle}
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
          </TouchableOpacity>
          {cart.addedItems.length > 0 && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#F75555',
                position: 'absolute',
                right: 12,
                top: 12,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
const SectionRow = ({title, altTitle, onPress}) => {
  return (
    <View style={styles.headingRow}>
      <Text style={styles.Heading}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            ...GlobalStyle.Heading,
            color: Color.primary,
            fontSize: 16,
          }}>
          {altTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Home;
