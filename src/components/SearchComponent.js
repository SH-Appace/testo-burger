import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Font, GlobalStyle, Window} from '../globalStyle/Theme';
import {useState} from 'react';
import TextField from './TextFeild';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from '../core/Icon';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useRef} from 'react';
import {NoResultsSvg, SearchScreenSvg} from '../assets/svgs/SearchSvg';
import {SkypeIndicator} from 'react-native-indicators';

const SearchComponent = ({open, setOpen}) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);
  const progress = useSharedValue(0);
  const right = useSharedValue(1000);
  const left = useSharedValue(-100);
  const isFocused = useIsFocused();
  const {products} = useSelector(state => ({
    ...state,
  }));

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      right: right.value,
      left: left.value,
    };
  }, []);
  useEffect(() => {
    if (open) {
      progress.value = withSpring(1);
      right.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      left.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      const timer = setTimeout(async () => {
        setLoading(false);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      progress.value = withSpring(0);
      right.value = withTiming(500, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      left.value = withTiming(-100, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      // const timer = setTimeout(async () => {
      setLoading(true);
      // }, 200);
      // return () => clearTimeout(timer);
    }
  }, [open]);
  return (
    <Animated.View
      style={[
        reanimatedStyle,
        {
          position: 'absolute',
          top: 0,
          bottom: 0,
          paddingTop: 50,
          backgroundColor: Color.light,
        },
      ]}>
      <View style={{paddingHorizontal: 20}}>
        <TextField
          autoFocus={true}
          placeholder="What are you craving?"
          placeholderColor="#BDBDBD"
          search={true}
          searchFunc={() => {
            setSearchText('');
            setOpen(false);
          }}
          value={searchText}
          onChanged={setSearchText}
        />
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={GlobalStyle.Container}>
          {searchText !== '' ? (
            products[0].filter(x =>
              x.name.toLowerCase().includes(searchText.toLowerCase()),
            ).length > 0 ? (
              products[0]
                .filter(x =>
                  x.name.toLowerCase().includes(searchText.toLowerCase()),
                )
                .map((item, index) => (
                  <Cart
                    item={item}
                    key={index}
                    setOpen={setOpen}
                    setSearchText={setSearchText}
                  />
                ))
            ) : (
              <View style={{alignItems: 'center'}}>
                <NoResultsSvg
                  width={Window.width / 1.5}
                  height={Window.height / 1.8}
                />
              </View>
            )
          ) : (
            !loading && (
              <SearchScreenSvg
                width={Window.width / 1.1}
                height={Window.height / 1.5}
              />
            )
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};
{
  /* products[0] &&
        products[0].filter(x =>
          x.name.toLowerCase().includes(searchText.toLowerCase()),
        ).length > 0 ? ( */
}

{
  /* ) : (
          <View style={{alignItems: 'center'}}>
            <NoResultsSvg
              width={Window.width / 1.5}
              height={Window.height / 1.8}
            />
          </View>
        ) */
}
export default SearchComponent;

const styles = StyleSheet.create({
  ImgStyle: {
    width: Window.height / 9,
    borderRadius: 20,
    height: Window.height / 9,
  },
  TopTextStyle: {
    color: Color.headingSm,
    fontSize: 16,
    fontFamily: Font.Urbanist_Black,
  },
  MiddleTextStyle: {
    color: Color.greyscale,
    fontSize: 14,
    fontFamily: Font.Urbanist_Medium,
    paddingHorizontal: 2,
  },
  heartIcon: {
    fontSize: 18,
    color: Color.lightRed,
    borderRadius: 50,
  },
  Heading: {
    fontSize: 20,
    color: Color.secondary,
    fontFamily: Font.Urbanist_Bold,
  },
});

const Cart = ({item, setOpen, setSearchText}) => {
  let navigation = useNavigation();
  const [reRenderHeart, setReRenderHeart] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setSearchText('');
        setOpen(false);
        navigation.navigate('Custom', {
          edit: false,
          productId: item.id,
          product: item,
        });
      }}
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
