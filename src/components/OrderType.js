import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BorderRadius, Color, Font, Window} from '../globalStyle/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {DeliverySvgs, PickupSvgs} from '../assets/svgs/HomePage';

const OrderType = ({activeBg, setActiveBg, setBranchId, setSelectedBranch}) => {
  const {cart} = useSelector(state => ({...state}));

  return (
    <FlatList
      data={OrderTypeData}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: Window.fixPadding * 2,
      }}
      initialNumToRender={5}
      scrollEnabled={false}
      renderItem={({item}) => (
        <Box
          setActiveBg={setActiveBg}
          activeBg={activeBg}
          cart={cart}
          item={item}
          setBranchId={setBranchId}
          setSelectedBranch={setSelectedBranch}
        />
      )}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
    />
  );
};

export default OrderType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 75,
    borderRadius: BorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  boxtitle: {
    fontSize: 15,
    fontFamily: Font.Urbanist_Bold,
  },
  subtitle: {
    paddingTop: 0.5,
    fontSize: 11,
    fontFamily: Font.Urbanist_Medium,
  },
});
const Box = ({item, cart, setBranchId, setSelectedBranch}) => {
  const dispatch = useDispatch();

  const updateOrderType = type => {
    dispatch({
      type: 'UPDATE_ORDER_TYPE',
      payload: type,
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (item.id === 2 && setBranchId && setSelectedBranch) {
          setBranchId('');
          setSelectedBranch({});
        }
        updateOrderType(item.value);
      }}
      style={[
        styles.container,
        {
          backgroundColor:
            cart.orderType === item.value ? Color.secondary : Color.light,
          marginRight: item.id === 1 ? 10 : 0,
          marginLeft: item.id === 2 ? 10 : 0,
        },
      ]}>
      {item.id === 1 ? (
        <PickupSvgs
          color={cart.orderType === item.value ? Color.light : Color.headingSm}
        />
      ) : item.id === 2 ? (
        <DeliverySvgs
          color={cart.orderType === item.value ? Color.light : Color.headingSm}
        />
      ) : null}
      <View style={{marginLeft: 8, width: 85}}>
        <Text
          style={[
            styles.boxtitle,
            {
              color:
                cart.orderType === item.value ? Color.light : Color.headingSm,
            },
          ]}>
          {item.name}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            styles.subtitle,
            {
              color:
                cart.orderType === item.value
                  ? Color.tertiary
                  : Color.greyscale,
            },
          ]}>
          {item.discount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const OrderTypeData = [
  {
    name: 'Pick up',
    value: 'take_away',
    discount: 'Enjoy up to 50% Off',
    id: 1,
  },
  {
    name: 'Delivery',
    value: 'delivery',
    discount: 'Enjoy up to 50% Off',
    id: 2,
  },
];
