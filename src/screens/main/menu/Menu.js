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
import styles from './MenuStyles';
import {ManuIcon} from '../../../assets/svgs/SocialIconsSvgs';
import {useBackButton} from '../../../hooks';
import {NoFood} from '../../../assets/svgs/OrderSvgs';
import {getSingleCategoryProducts} from '../../../apis/categories';
import Loader from '../../../components/Loader';
import DeviceInfo from 'react-native-device-info';
const Menu = ({navigation, route}) => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let hasNotch = DeviceInfo.hasNotch();

  const {categories, products, auth} = useSelector(state => ({...state}));
  useEffect(() => {
    if (route.params) {
      setActive(route.params.activeId);
      getSingleCategoryProducts(route.params.activeId, setData, setLoading);
    } else {
      setActive(categories[0][0].id);
      getSingleCategoryProducts(categories[0][0].id, setData, setLoading);
    }
  }, []);
  // console.log(active);
  const RenderItemCategories = ({item, setState, state}) => (
    <TouchableOpacity
      onPress={() => {
        if (state === item.id) return;
        setState(item.id);
        getSingleCategoryProducts(item.id, setData, setLoading);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        paddingVertical: 5,
        width: Window.width / 4.5,
        borderRadius: BorderRadius,
        backgroundColor: Color.light,
        borderWidth: 1,
        borderColor: state === item.id ? Color.secondary : 'transparent',
      }}>
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
        right: 'maximum',
        left: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
      <View style={{marginHorizontal: Window.fixPadding * 2}}>
        <AppBar
          left={
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <ManuIcon />
            </TouchableOpacity>
          }
          center={<Text style={GlobalStyle.AppCenterTextStyle}>Menu</Text>}
        />
      </View>
      <View style={{height: 110}}>
        {categories && (
          <HorizontalFlatList
            initialNumToRender={2}
            data={categories[0]}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: 20,
            }}
            numRows={1}
            keyExtractor={(item, row, col) => item.id}
            renderItem={({item}) => (
              <RenderItemCategories
                state={active}
                setState={setActive}
                item={item}
              />
            )}
          />
        )}
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, paddingVertical: 15}}>
        <View style={[GlobalStyle.Container, {backgroundColor: '#F9F9F9'}]}>
          {active !== 0 ? (
            data.length > 0 ? (
              data.map((item, index) => <Cart item={item} key={index} />)
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <NoFood width={Window.width / 4} />
                <Text
                  style={{
                    color: 'grey',
                    textAlign: 'center',
                    fontFamily: Font.Urbanist_Bold,
                    fontSize: 16,
                    marginVertical: 15,
                  }}>
                  "Apologies, but it seems like there are no items available in
                  this food category at the moment. Please check back later or
                  explore other categories."
                </Text>
              </View>
            )
          ) : (
            products[0] &&
            products[0].map((item, index) => <Cart item={item} key={index} />)
          )}
        </View>
      </ScrollView>
      {loading && <Loader />}
    </SafeAreaView>
  );
};

export default Menu;

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
          source={{uri: item.image}}
          // source={require('../../../assets/images/pics/foodBg.png')}
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
//FAV ICON
{
  /* <TouchableOpacity
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
          </TouchableOpacity> */
}
