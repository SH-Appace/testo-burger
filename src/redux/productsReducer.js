import AsyncStorage from '@react-native-async-storage/async-storage';

let userState;
let userData;

const setUser = async () => (userData = await AsyncStorage.getItem('products'));
setUser();

if (userData) {
  const setData = async () =>
    (userState = await AsyncStorage.getItem('products'));
  setData();
} else {
  userState = null;
}

export const productsReducer = (state = userState, action) => {
  switch (action.type) {
    case 'PRODUCTS':
      return {...state, ...action.payload};

    default:
      return state;
  }
};
