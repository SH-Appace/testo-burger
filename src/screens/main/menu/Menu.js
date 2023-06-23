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
  const RenderItemCategories = ({item, setState, state, setActiveCategory}) => (
    <View
      style={{
        width: Window.width / 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          setActiveCategory(item.name);
          setState(item.id);
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
            backgroundColor: '#F6F4F4',
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
    <SafeAreaView style={{backgroundColor: Color.light, flex: 1}}>
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
      <View style={{height: 150}}>
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
                item={item}
              />
            )}
          />
        )}
      </View>
      <View
        style={{
          marginHorizontal: Window.fixPadding * 2,
          marginBottom: 10,
        }}>
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

      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
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
