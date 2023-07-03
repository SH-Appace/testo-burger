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
import styles from './MenuStyles';
import {ManuIcon} from '../../../assets/svgs/SocialIconsSvgs';
import {useBackButton} from '../../../hooks';
const Menu = ({navigation, route}) => {
  const [active, setActive] = useState(0);
  const [activeCategory, setActiveCategory] = useState('');
  const {categories, products, auth} = useSelector(state => ({...state}));
  useEffect(() => {
    if (route.params) {
      setActive(route.params.activeId);
      setActiveCategory(route.params.activeCat);
    }
  }, []);
  const RenderItemCategories = ({
    item,
    setState,
    state,
    setActiveCategory,
    activeCategory,
  }) => (
    <View
      style={{
        width: Window.width / 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          if (state === item.id) {
            setActiveCategory('');
            setState(0);
          } else {
            setActiveCategory(item.name);
            setState(item.id);
          }
        }}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          width: Window.width / 5,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: 70,
            height: 75,
            borderRadius: 20,
            backgroundColor: Color.light,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: state === item.id ? 2 : 0,
            borderColor: state === item.id ? Color.primary : 'transparent',
          }}>
          <Image
            style={{height: 30, width: 30}}
            source={{uri: item.icon}}
            resizeMode="contain"
          />
        </View>
        <Text
          numberOfLines={1}
          style={{
            ...GlobalStyle.Heading,
            fontSize: 14,
            marginTop: 12,
            width: Window.width / 5,
            textAlign: 'center',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={{backgroundColor: '#F9F9F9', flex: 1}}>
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
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
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

export default Menu;

const Cart = ({item}) => {
  let navigation = useNavigation();
  const [reRenderHeart, setReRenderHeart] = useState(false);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'BottomTabScreen',
              state: {
                routes: [
                  {
                    name: 'HomeStack',
                    state: {
                      routes: [
                        {
                          name: 'Custom',
                          params: {
                            edit: false,
                            productId: item.id,
                            product: item,
                            fromMenu: true,
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
      }
      style={{
        backgroundColor: Color.light,
        borderRadius: 20,
        marginVertical: 10,
        height: Window.height / 6,
        flexDirection: 'row',
        overflow: 'hidden',
      }}>
      <View style={{flex: 0.4}}>
        <Image
          style={styles.ImgStyle}
          // source={{uri: item.image}}
          source={require('../../../assets/images/pics/foodBg.png')}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 0.6, justifyContent: 'center'}}>
        <View style={{marginHorizontal: 15}}>
          <Text style={styles.TopTextStyle}>{item.name}</Text>
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
