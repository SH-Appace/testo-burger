import AsyncStorage from '@react-native-async-storage/async-storage';

let initState;
let userData;

const setUser = async () => (userData = await AsyncStorage.getItem('cart'));
setUser();

if (userData) {
  const setData = async () => (initState = await AsyncStorage.getItem('cart'));
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
    loyaltyPoints: {
      enable: false,
      discount: 0,
    },
  };
}

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        addedItems: [...state.addedItems, action.payload],
        total: state.total + action.payload.totalPrice,
      };
    case 'UPDATE_CART':
      return {
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
    case 'CLEAR_CART':
      return {
        ...state,
        addedItems: action.payload,
        total: 0,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        addedItems: state.addedItems.filter(
          (item, i) => i !== action.payload.index,
        ),
        total: state.total - action.payload.amount,
      };
    case 'ADD_COUPON':
      return {
        ...state,
        coupon: action.payload,
      };
    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: {
          code: '',
          discount: 0,
        },
      };
    case 'ADD_LOYALTY':
      return {
        ...state,
        loyaltyPoints: action.payload,
      };
    case 'REMOVE_LOYALTY':
      return {
        ...state,
        loyaltyPoints: {
          enable: false,
          discount: 0,
        },
      };
    case 'UPDATE_ORDER_TYPE':
      return {
        ...state,
        orderType: action.payload,
      };
    default:
      return state;
  }
};
