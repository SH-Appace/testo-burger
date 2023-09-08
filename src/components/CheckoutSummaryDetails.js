import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../globalStyle/Theme';
import Icon from '../core/Icon';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {FAB} from 'react-native-paper';

const CheckoutSummaryDetails = ({
  visible,
  setVisible,
  setPopupData,
  setRefresh,
  refresh,
  onShowPopup,
  setAddonsPrice,
  setVariationsPrice,
  setCartItemIndex,
  setCartItemQuantity,
  setCartItemAmount,
}) => {
  const {cart} = useSelector(state => ({...state}));

  return (
    <View style={styles.container}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={styles.headingBox}>Order Summary</Text>
      </View>
      <View style={GlobalStyle.TopBorderStyle} />
      {cart.addedItems.length > 0 ? (
        cart.addedItems.map((item, index) => (
          <>
            <SummaryDetails
              item={item}
              visible={visible}
              setVisible={setVisible}
              setPopupData={setPopupData}
              index={index}
              setRefresh={setRefresh}
              refresh={refresh}
              onShowPopup={onShowPopup}
              setAddonsPrice={setAddonsPrice}
              setVariationsPrice={setVariationsPrice}
              setCartItemIndex={setCartItemIndex}
              setCartItemAmount={setCartItemAmount}
              setCartItemQuantity={setCartItemQuantity}
            />
            {index + 1 === cart.addedItems.length ? null : (
              <View style={GlobalStyle.TopBorderStyle} />
            )}
          </>
        ))
      ) : (
        <Text style={[styles.headingRow, {fontSize: 12}]}>
          Your basket is empty
        </Text>
      )}
    </View>
  );
};

export default CheckoutSummaryDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.light,
    padding: 15,
    marginTop: 20,
    borderRadius: BorderRadius,
    marginHorizontal: Window.fixPadding * 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingBox: {
    fontSize: 20,
    color: Color.tertiary,
    lineHeight: 24,
    fontFamily: Font.Urbanist_Bold,
  },
  headingRow: {
    fontSize: 16,
    color: Color.tertiary,
    lineHeight: 21.6,
    width: 150,
    fontFamily: Font.Urbanist_Bold,
  },
  image: {width: 80, height: 80, borderRadius: BorderRadius},
  fab: {
    position: 'absolute',
    margin: 10,
    left: -15,
    top: -15,
    backgroundColor: Color.primary,
    height: 24,
    width: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeadingRow: {
    fontSize: 16,
    color: Color.primary,
    lineHeight: 21.6,
    width: 150,
    fontFamily: Font.Urbanist_Medium,
  },
  viewMore: {color: Color.greyscale, fontSize: 12},
  quantity: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: Color.primary,
    fontFamily: Font.Urbanist_Bold,
    borderWidth: 1,
    borderColor: Color.primary,
    height: 32,
    lineHeight: 32,
    width: 32,
    borderRadius: 10,
    marginBottom: 15,
  },
});

const SummaryDetails = ({
  item,
  setVisible,
  setPopupData,
  index,
  onShowPopup,
  setAddonsPrice,
  setCartItemIndex,
  setCartItemAmount,
  setCartItemQuantity,
  setVariationsPrice,
}) => {
  let navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        setVisible(true), setPopupData(item);
      }}
      style={[styles.row, {justifyContent: 'space-between'}]}>
      <View style={styles.row}>
        <Image
          source={{uri: item.foodDetails.image}}
          style={styles.image}
          resizeMode="cover"
        />
        <FAB
          style={styles.fab}
          icon="close"
          customSize={40}
          onPress={() => {
            onShowPopup();
            item.selectedAddOns.map(x =>
              setAddonsPrice(prev => prev + x.price),
            );
            item.selectedVariations.map(x =>
              x.values.map(y =>
                setVariationsPrice(prev => prev + parseInt(y.optionPrice)),
              ),
            );
            setCartItemIndex(index);
            setCartItemAmount(item.foodDetails.price);
            setCartItemQuantity(item.quantity);
          }}
        />
        <View
          style={{
            justifyContent: 'space-around',
            marginLeft: 10,
          }}>
          <Text style={styles.headingRow}>{item.foodDetails.name}</Text>
          <Text style={styles.subHeadingRow}>
            ${item.totalPrice} <Text style={styles.viewMore}>- View More</Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.replace('Custom', {
              edit: true,
              productId: item.foodId,
              product: item.foodDetails,
              quantity: item.quantity,
              selectedAddOns: item.selectedAddOns,
              selectedVariations: item.selectedVariations,
              index: index,
              totalPrice: item.totalPrice,
            })
          }>
          <Icon
            iconFamily={'MaterialCommunityIcons'}
            name="pencil-minus"
            size={20}
            color={Color.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
