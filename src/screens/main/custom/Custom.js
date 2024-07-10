import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import AppBar from '../../../components/AppBar';
import {Color, GlobalStyle} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import styles from './CustomStyle';
import Button from '../../../components/Button';
import {useBackButton} from '../../../hooks';
import {addWishlist, removeWishlist} from '../../../apis/wishlist';
import Cart from '../../../components/Cart';
import CartAddons from '../../../components/CartAddons';
import ProVariationItem from '../../../components/ProVariationItem';

const Custom = ({route, navigation}) => {
  const [priceAmount, setPriceAmount] = useState(0);
  const [radioState, setRadioState] = useState('');
  const [radioItemPrice, setRadioItemPrice] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [required, setRequired] = useState(false);
  const [itemNote, setItemNote] = useState('');
  const dispatch = useDispatch();
  const {product, productId} = route.params;
  const wishlist = useSelector(state => state.wishlist);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (route.params.edit) {
      setQuantity(route.params.quantity);
      setSelectedAddons(route.params.selectedAddOns);
      setSelectedVariations(route.params.selectedVariations);

      setPriceAmount(route.params.totalPrice / route.params.quantity);
      setItemNote(route.params.note);
      // const check = route.params.selectedVariations.some(
      //   x => x.required === 'on',
      // );
      // setRequired(check);
    } else {
      setPriceAmount(product.price);
      const check = product?.variations?.some(x => x.required === 'on');
      setRequired(check);
    }
  }, []);

  const handleBarRightBtn = () => {
    if (wishlist?.addedItems?.some(e => e.id === product.id)) {
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
  };

  const addToBasket = () => {
    if (required) {
      showMessage({
        message: 'You need to select at least 1 required option',
        type: 'danger',
      });
      return;
    } else {
      const payload = {
        foodId: product.id,
        foodDetails: product,
        selectedAddOns: selectedAddons,
        selectedVariations: selectedVariations,
        totalPrice: priceAmount * quantity,
        quantity: quantity,
        note: itemNote,
      };

      if (route.params.edit) {
        dispatch({
          type: 'UPDATE_CART',
          payload: {
            ...payload,
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
            ...payload,
            itemCampaignId: route.params?.itemCampaign ? product.id : null,
          },
        });
      }
    }
    navigation.navigate('CheckOut');
  };

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  if (product) {
    return (
      <SafeAreaView style={GlobalStyle.Container}>
        <AppBar
          left={
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
              style={styles.barRightBtn}
              onPress={handleBarRightBtn}>
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
          <KeyboardAvoidingView behavior="padding">
            <View style={{marginVertical: 25}}>
              <Cart
                setPriceAmount={setPriceAmount}
                item={product}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </View>
            {product?.add_ons?.length > 0 && (
              <>
                <Text style={styles.textStyle}>Add Ons</Text>
                <View style={{marginVertical: 10}}>
                  {product?.add_ons?.map((item, index) => (
                    <CartAddons
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
            {product?.variations && (
              <>
                {product?.variations?.map((variation, index) => (
                  <>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.textStyle}>{variation.name}</Text>
                      <Text style={{color: Color.secondary, fontSize: 10}}>
                        {' '}
                        {variation.required === 'off'
                          ? '(Optional)'
                          : '(Required)'}
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
                        <ProVariationItem
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
            <Text
              style={{
                ...styles.textStyle,
                marginBottom: 10,
              }}>
              Note if any
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder="Order Notes..."
              placeholderTextColor={Color.lightGray}
              multiline
              value={itemNote}
              onChangeText={text => setItemNote(text)}
            />
          </KeyboardAvoidingView>
        </ScrollView>

        <View style={{...GlobalStyle.BottomButtonContainer}}>
          <Button
            text={`${route.params.edit ? 'Update' : 'Add to'} Basket - $${
              priceAmount * quantity
            }`}
            theme="primary"
            onPressFunc={addToBasket}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default Custom;
