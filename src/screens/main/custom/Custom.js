import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../../../globalStyle/Theme';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../../core/Icon';
import styles from './CustomStyle';
import {Checkbox, TouchableRipple,RadioButton} from 'react-native-paper';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {useBackButton} from '../../../hooks';
import {addWishlist, removeWishlist} from '../../../apis/wishlist';

const Cart = ({item, quantity, setQuantity}) => {
  const decrementValue = name => {
    if (quantity === 1) return;
    setQuantity(prevVal => prevVal - 1);
  };
  const incrementValue = name => {
    if (quantity === 10) return;
    setQuantity(prevVal => prevVal + 1);
  };

  return (
    <View
      style={{
        padding: 10,
        borderColor: '#E7E7E7',
        // borderWidth: 1,
        borderRadius: BorderRadius,
        backgroundColor: Color.light,
      }}>
      <View style={styles.cartContainer}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={styles.ImgStyle}
            // source={{uri: item.image}}
            source={require('../../../assets/images/pics/foodBg.png')}
            resizeMode="cover"
          />
        </View>
        <View style={{flex: 1, paddingLeft: 15}}>
          <Text style={styles.TopTextStyle}>{item.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Icon
                  iconFamily={'Ionicons'}
                  color={'#8A94A3'}
                  size={12}
                  name={'lock-closed-outline'}
                />
                <Text
                  style={{...styles.MiddleTextStyle}}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.order_count}
                  {'  '}|{'  '}
                </Text>
                <Icon
                  iconFamily={'Feather'}
                  color={'#8A94A3'}
                  size={12}
                  name={'thumbs-up'}
                />
                <Text
                  style={{...styles.MiddleTextStyle}}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.rating_count}
                </Text>
              </View>
              <Text style={styles.LastTextStyle}> ${item.price} </Text>
            </View>
            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={styles.incrementDecrementBtn}
                onPress={() => decrementValue('adult')}>
                <Icon
                  iconFamily={'AntDesign'}
                  name={'minus'}
                  style={styles.MinusStyle}
                />
              </TouchableOpacity>
              <Text style={styles.NumStyle}>{quantity}</Text>
              <TouchableOpacity
                style={[
                  styles.incrementDecrementBtn,
                  {backgroundColor: Color.primary},
                ]}
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
      </View>
      <Text style={styles.MiddleTextStyle}>{item.description}</Text>
    </View>
  );
};

const AddOns = ({item, setPriceAmount, setSelectedAddons, selectedAddons}) => {
  const onPressFunction = (price, item) => {
    if (selectedAddons.some(e => e.id === item.id)) {
      setPriceAmount(prevValue => prevValue - price);

      setSelectedAddons(prevVal => [...prevVal.filter(x => x.id !== item.id)]);
    } else {
      setPriceAmount(prevValue => prevValue + price);

      setSelectedAddons(prevVal => [item, ...prevVal]);
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{...GlobalStyle.BasicTextStyle, color: '#8A94A3'}}>
          {item.name}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text style={GlobalStyle.BasicTextStyle}>${item.price}</Text>
          <TouchableRipple
            onPress={() => onPressFunction(item.price, item)}
            style={{
              height: 21,
              width: 21,
              borderRadius: 22,
              borderWidth: 2.2,
              borderColor: Color.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 6,
              backgroundColor: 'rgba(246, 244, 244, 1)',
              overflow: 'hidden',
            }}>
            <Checkbox.Android
              style={{
                transform: [{scaleX: 1}, {scaleY: 1}],
              }}
              color={Color.primary}
              uncheckedColor="#F6F4F4"
              // onPress={() => onPressFunction(item.price, item)}
              status={
                selectedAddons.some(e => e.id === item.id)
                  ? 'checked'
                  : 'unchecked'
              }
            />
          </TouchableRipple>
        </View>
      </View>
    </>
  );
};

const VariationItem = ({
  item,
  type,
  index,
  setRadioState,
  radioState,
  setPriceAmount,
  radioItemPrice,
  priceAmount,
  setRadioItemPrice,
  setSelectedVariations,
  selectedVariations,
  setRequired,
  variationObj,
}) => {
  const RadioClick = (optionPrice, item) => {
    let tempObj = {...variationObj};
    const checkIfSelectedVariationHasOBJ = selectedVariations.some(x =>
      x.values.some(e => e.label === item.label),
    );
    if (checkIfSelectedVariationHasOBJ) {
      setPriceAmount(prevVal => prevVal - optionPrice);
      setRadioState('');
      setRadioItemPrice('');
      setSelectedVariations(prevVal => [
        ...prevVal.filter(x => x.name !== tempObj.name),
      ]);
    } else {
      const checkIfVariationOBJExist = selectedVariations.some(
        x => x.name === tempObj.name,
      );
      if (checkIfVariationOBJExist) {
        const filtered = selectedVariations.map(x => {
          x.name === tempObj.name;
          return x.values;
        });
        const newValues = [item];
        tempObj.values = newValues;
        const priceDiff = Math.abs(
          item.optionPrice - parseInt(filtered[0][0].optionPrice),
        );
        setPriceAmount(prevValue =>
          item.optionPrice > parseInt(filtered[0][0].optionPrice)
            ? prevValue + priceDiff
            : prevValue - priceDiff,
        );
        setSelectedVariations(prevVal => [
          tempObj,
          ...prevVal.filter(x => x.name !== tempObj.name),
        ]);
      } else {
        tempObj.values = [item];
        setPriceAmount(prevValue => prevValue + optionPrice);
        setSelectedVariations(prevVal => [tempObj, ...prevVal]);
      }
    }
  };
  const onPressFunction = (price, item) => {
    let tempObj = {...variationObj};

    const checkIfSelectedVariationHasOBJ = selectedVariations.some(x =>
      x.values.some(e => e.label === item.label),
    );
    if (checkIfSelectedVariationHasOBJ) {
      const checkIfVariationOBJExist = selectedVariations.map(x => {
        if (x.name === tempObj.name) return x;
      });
      const currentObj = checkIfVariationOBJExist.filter(Boolean);

      //returning only the values from selected obj
      if (currentObj[0].values.length > 1) {
        const newValues = currentObj[0].values.filter(
          x => x.label !== item.label,
        );
        currentObj[0].values = newValues;
        const replaceValues = selectedVariations.map(x => {
          if (x.name === tempObj.name) {
            x = currentObj[0];
          }
          return x;
        });

        setSelectedVariations(replaceValues);
        setPriceAmount(prevValue => prevValue - item.optionPrice);
      } else {
        setPriceAmount(prevValue => prevValue - item.optionPrice);
        const filtered = selectedVariations.filter(
          x => x.name !== tempObj.name,
        );
        setSelectedVariations(filtered);

        setRequired(true);
      }

      ////////////////////
    } else {
      //PERFECT

      const checkIfVariationOBJExist = selectedVariations.some(
        x => x.name === tempObj.name,
      );
      if (checkIfVariationOBJExist) {
        const filtered = selectedVariations.filter(
          x => x.name === tempObj.name,
        );
        const newValues = [item, ...filtered[0].values];
        tempObj.values = newValues;
        setPriceAmount(prevValue => prevValue + price);
        setSelectedVariations(prevVal => [
          tempObj,
          ...prevVal.filter(x => x.name !== tempObj.name),
        ]);
      } else {
        tempObj.values = [item];
        setPriceAmount(prevValue => prevValue + price);
        setSelectedVariations(prevVal => [tempObj, ...prevVal]);
        setRequired(false);
      }
    }
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{...GlobalStyle.BasicTextStyle, color: '#8A94A3'}}>
          {item.label}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text style={GlobalStyle.BasicTextStyle}>${item.optionPrice}</Text>
          {type ? (
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 6,
                overflow: 'hidden',
                transform: [{scaleX: 1.1}, {scaleY: 1.1},],
              }}>
              <RadioButton.Android
                uncheckedColor={Color.primary}
                color={Color.primary}
                value={index}
                name="meal"
                style={{marginLeft: -10}}
                // status={radioState === index ? 'checked' : 'unchecked'}
                status={
                  selectedVariations.some(x =>
                    x.values.some(e => e.label === item.label),
                  )
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => RadioClick(parseInt(item.optionPrice), item)}
              />
            </View>
          ) : (
            <TouchableRipple
              onPress={() => onPressFunction(parseInt(item.optionPrice), item)}
              style={{
                height: 21,
                width: 21,
                borderRadius: 22,
                borderWidth: 2.2,
                borderColor: Color.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 6,
                backgroundColor: 'rgba(246, 244, 244, 1)',
                overflow: 'hidden',
              }}>
              <Checkbox.Android
                style={{
                  transform: [{scaleX: 1}, {scaleY: 1}],
                }}
                color={Color.primary}
                uncheckedColor="#F6F4F4"
                // onPress={() => onPressFunction(item.price, item)}
                status={
                  selectedVariations.some(x =>
                    x.values.some(e => e.label === item.label),
                  )
                    ? 'checked'
                    : 'unchecked'
                }
              />
            </TouchableRipple>
          )}
          {/* <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 24,
                backgroundColor: selectedVariations.some(e =>
                  e.values.some(e => e.label === item.label),
                )
                  ? Color.light
                  : 'rgba(246, 244, 244, 1)',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 6,
                overflow: 'hidden',
              }}>
              <Checkbox.Item
                style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                color={Color.primary}
                uncheckedColor="#F6F4F4"
                onPress={() =>
                  onPressFunction(parseInt(item.optionPrice), item)
                }
                status={
                  selectedVariations.some(x =>
                    x.values.some(e => e.label === item.label),
                  )
                    ? 'checked'
                    : 'unchecked'
                }
              />
            </View> */}
        </View>
      </View>
    </>
  );
};

const Custom = ({route, navigation}) => {
  const [priceAmount, setPriceAmount] = useState(0);
  const [radioState, setRadioState] = useState('');
  const [radioItemPrice, setRadioItemPrice] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [required, setRequired] = useState(false);
  const dispatch = useDispatch();
  const {product, productId} = route.params;
  const {wishlist, auth} = useSelector(state => ({...state}));

  useEffect(() => {
    if (route.params.edit) {
      setQuantity(route.params.quantity);
      setSelectedAddons(route.params.selectedAddOns);
      setSelectedVariations(route.params.selectedVariations);

      setPriceAmount(route.params.totalPrice / route.params.quantity);
      // const check = route.params.selectedVariations.some(
      //   x => x.required === 'on',
      // );
      // setRequired(check);
    } else {
      setPriceAmount(product.price);
      const check = product.variations.some(x => x.required === 'on');
      setRequired(check);
    }
  }, []);

  const onBackPress = () => {
    if (route.params.fromMenu) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTabScreen',
            state: {
              routes: [
                {
                  name: 'Menu',
                },
              ],
            },
          },
        ],
      });
    } else {
      navigation.goBack();
    }
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar
        left={
          <TouchableOpacity
            onPress={() =>
              route.params.fromMenu
                ? navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'BottomTabScreen',
                        state: {
                          routes: [
                            {
                              name: 'Menu',
                            },
                          ],
                        },
                      },
                    ],
                  })
                : navigation.goBack()
            }>
            <Icon
              iconFamily={'AntDesign'}
              name="close"
              size={20}
              color={Color.tertiary}
            />
          </TouchableOpacity>
        }
        center={
          <Text
            onPress={() => navigation.navigate('Cartt')}
            style={GlobalStyle.AppCenterTextStyle}>
            {product.name}
          </Text>
        }
        right={
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              backgroundColor: Color.light,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 0.5,
              marginTop: 15,
            }}
            onPress={() => {
              if (wishlist.addedItems.some(e => e.id === product.id)) {
                dispatch({
                  type: 'REMOVE_SINGLE_FROM_WISHLIST',
                  payload: product.id,
                });
                removeWishlist(product.id, auth.token);
              } else {
                dispatch({
                  type: 'ADD_SINGLE_TO_WISHLIST',
                  payload: product,
                });
                addWishlist(
                  {
                    food_id: product.id,
                  },
                  auth.token,
                );
              }
            }}>
            <Icon
              iconFamily={'AntDesign'}
              style={styles.heartIcon}
              color={
                wishlist.addedItems.some(e => e.id === product.id)
                  ? Color.black
                  : Color.light
              }
              name={
                wishlist.addedItems.some(e => e.id === product.id)
                  ? 'heart'
                  : 'hearto'
              }
            />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 25}}>
          <Cart
            setPriceAmount={setPriceAmount}
            item={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </View>
        {product.add_ons.length > 0 && (
          <>
              <Text style={{color: '#2A3B56', fontSize: 14, fontFamily:Font.Urbanist_Black}}>
                Add Ons
              </Text>
            <View style={{marginVertical: 10}}>
              {product.add_ons.map((item, index) => (
                <AddOns
                  setPriceAmount={setPriceAmount}
                  setSelectedAddons={setSelectedAddons}
                  selectedAddons={selectedAddons}
                  item={item}
                  key={index}
                />
              ))}
            </View>
          </>
        )}
        {product.variations && (
          <>
            {product.variations.map((variation, index) => (
              <>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#2A3B56',
                      fontSize: 14,
                      fontWeight: '800',
                    }}>
                    {variation.name}
                  </Text>
                  <Text style={{color: Color.secondary, fontSize: 10}}>
                    {' '}
                    {variation.required === 'off' ? '(Optional)' : '(Required)'}
                  </Text>
                </View>
                {variation.type === 'multi' && (
                  <Text style={{fontSize: 12, color: Color.primary}}>
                    You need to select minimum {variation.min} and maximum{' '}
                    {variation.max} options
                  </Text>
                )}

                <View style={{marginVertical: 10}}>
                  {variation.values.map((item, index) => (
                    <VariationItem
                      item={item}
                      key={index}
                      index={index}
                      type={variation.type === 'single' ? true : false}
                      radioState={radioState}
                      setRadioState={setRadioState}
                      setPriceAmount={setPriceAmount}
                      setRadioItemPrice={setRadioItemPrice}
                      radioItemPrice={radioItemPrice}
                      // priceAmount={priceAmount}
                      setSelectedVariations={setSelectedVariations}
                      selectedVariations={selectedVariations}
                      setRequired={setRequired}
                      variationObj={variation}
                    />
                  ))}
                </View>
              </>
            ))}
          </>
        )}
      </ScrollView>

      <View style={{...GlobalStyle.BottomButtonContainer}}>
        <Button
          text={`${route.params.edit ? 'Update' : 'Add to'} Basket - $${
            priceAmount * quantity
          }`}
          theme="primary"
          onPressFunc={async () => {
            if (required) {
              showMessage({
                message: 'You need to select at least 1 required option',
                type: 'danger',
              });
              return;
            } else {
              if (route.params.edit) {
                dispatch({
                  type: 'UPDATE_CART',
                  payload: {
                    foodItem: {
                      foodId: product.id,
                      foodDetails: product,
                      selectedAddOns: selectedAddons,
                      selectedVariations: selectedVariations,
                      totalPrice: priceAmount * quantity,
                      quantity: quantity,
                    },
                    index: route.params.index,
                    oldPrice: route.params.totalPrice,
                    priceDifference: Math.abs(
                      priceAmount * quantity - route.params.totalPrice,
                    ),
                  },
                });
              } else {
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: {
                    foodId: product.id,
                    foodDetails: product,
                    selectedAddOns: selectedAddons,
                    selectedVariations: selectedVariations,
                    totalPrice: priceAmount * quantity,
                    quantity: quantity,
                  },
                });
              }
            }
            navigation.replace('CheckOut');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Custom;
