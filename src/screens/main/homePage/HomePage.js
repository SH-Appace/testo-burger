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
import Animated from 'react-native-reanimated';
import SearchComponent from '../../../components/SearchComponent';
import {updateFCMToken} from '../../../apis/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import OrderType from '../../../components/OrderType';
import FeaturedCard from '../../../components/FeaturedCard';
import SearchBar from '../../../components/SearchBar';
import useAnimated from './useAnimated';
import HomeBanners from '../../../components/HomeBanners';
import HomeSectionRow from '../../../components/HomeSectionRow';
import HomeHeader from '../../../components/HomeHeader';
import ReferCard from '../../../components/ReferCard';
import LoyaltyCard from '../../../components/LoyaltyCard';
import BookATableCard from '../../../components/BookATableCard';
import ActiveOrderCard from '../../../components/ActiveOrderCard';
import {orderStatsReq} from '../../../apis/order';

const Home = ({navigation}) => {
  const [activeBg, setActiveBg] = useState(1);
  const [catState, setCatState] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [orderStats, setOrderStats] = useState({
    order_count: 0,
    chat_count: 0,
  });
  let hasNotch = DeviceInfo.hasNotch();

  const {categories, products, banners, auth, wishlist, cart} = useSelector(
    state => ({
      ...state,
    }),
  );
  /// Animated
  const [reanimatedStyle, reanimatedStyle2, reanimatedStyle3] = useAnimated(
    catState,
    categories,
  );
  const renderItemCategories = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MenuStack', {
          screen: 'Menu',
          params: {
            activeId: item.id,
            activeCat: item.name,
          },
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

  //Push notifications
  useEffect(() => {
    (async () => {
      let fcmtoken = await AsyncStorage.getItem('fcmtoken');
      orderStatsReq(auth.token, setOrderStats);
      updateFCMToken(
        {
          cm_firebase_token: fcmtoken,
        },
        auth.token,
      );
    })();
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
          <HomeHeader />
          <SearchBar setOpenSearch={setOpenSearch} />
        </View>

        {auth?.user && orderStats.order_count > 0 && (
          <ActiveOrderCard data={orderStats} />
        )}
        <HomeSectionRow
          title="Special Offers"
          altTitle="See All"
          onPress={() => navigation.navigate('SpecialOffer')}
        />
        <HomeBanners banners={banners} />
        <HomeSectionRow title="Order Type" altTitle="Select any 1 Option" />

        <OrderType setActiveBg={setActiveBg} activeBg={activeBg} />
        <HomeSectionRow
          title="Discount Guaranteed! 👌"
          altTitle="See All"
          onPress={() => navigation.navigate('MenuStack')}
        />

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
        <HomeSectionRow
          title="Food Categories! 👌"
          altTitle={
            catState ? (
              <Icon
                iconFamily={'AntDesign'}
                name="close"
                size={20}
                color={Color.secondary}
              />
            ) : (
              'See All'
            )
          }
          onPress={() => (catState ? setCatState(false) : setCatState(true))}
        />
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
        {auth?.user ? (
          <>
            <ReferCard />
            <LoyaltyCard />
            <BookATableCard />
          </>
        ) : (
          <View style={{marginBottom: 20}} />
        )}
      </ScrollView>
      <SearchComponent open={openSearch} setOpen={setOpenSearch} />
    </SafeAreaView>
  );
};

export default Home;
