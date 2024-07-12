import AsyncStorage from '@react-native-async-storage/async-storage';
import format from 'pretty-format';

let initState;
let userData;

const setUser = async () => (userData = await AsyncStorage.getItem('cart'));
setUser();

if (userData) {
  const setData = async () => {
    initState = JSON.parse(userData);
  };
  setData();
} else {
  initState = {
    addedItems: [],
    total: 0,
    coupon: {
      code: '',
      discount: 0,
    },
    orderType: 'delivery',
  };
}

export const cartReducer = (state = initState, action) => {
  let currentState = {};
  switch (action.type) {
    case 'SETCART':
      currentState = action.payload;
      return currentState;
    case 'ADD_TO_CART':
      currentState = {
        ...state,
        addedItems: [...state.addedItems, action.payload],
        total: state.total + action.payload.totalPrice,
      };
      AsyncStorage.setItem('cart', JSON.stringify(currentState));
      return currentState;
    case 'UPDATE_CART':
      currentState = {
        ...state,
        addedItems: state.addedItems.map((x, i) => {
          if (i === action.payload.index) {
            return (x = action.payload.foodItem);
          }
          return x;
        }),

        total:
          action.payload.foodItem.totalPrice > action.payload.oldPrice
            ? state.total + action.payload.priceDifference
            : state.total - action.payload.priceDifference,
      };
      AsyncStorage.setItem('cart', JSON.stringify(currentState));
      return currentState;
    case 'CLEAR_CART':
      currentState = {
        ...state,
        addedItems: action.payload,
        total: 0,
      };
      AsyncStorage.setItem('cart', JSON.stringify(currentState));
      return currentState;
    case 'REMOVE_ITEM':
      currentState = {
        ...state,
        addedItems: state.addedItems.filter(
          (item, i) => i !== action.payload.index,
        ),
        total: state.total - action.payload.amount,
      };
      AsyncStorage.setItem('cart', JSON.stringify(currentState));
      return currentState;
    case 'ADD_COUPON':
      currentState = {
        ...state,
        coupon: action.payload,
      };
      AsyncStorage.setItem('cart', JSON.stringify(currentState));
      return currentState;
    case 'REMOVE_COUPON':
      currentState = {
        ...state,
        coupon: {
          code: '',
          discount: 0,
        },
      };
      AsyncStorage.setItem('cart', JSON.stringify(currentState));
      return currentState;
    case 'UPDATE_ORDER_TYPE':
      currentState = {
        ...state,
        orderType: action.payload,
      };
      AsyncStorage.setItem('cart', JSON.stringify(currentState));
      return currentState;
    default:
      return state;
  }
};
