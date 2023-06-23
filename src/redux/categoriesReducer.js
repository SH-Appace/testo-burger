import AsyncStorage from '@react-native-async-storage/async-storage';

let userState;
let userData;

const setUser = async () =>
  (userData = await AsyncStorage.getItem('categories'));
setUser();

if (userData) {
  const setData = async () =>
    (userState = await AsyncStorage.getItem('categories'));
  setData();
} else {
  userState = null;
}

export const categoriesReducer = (state = userState, action) => {
  switch (action.type) {
    case 'CATEGORIES':
      return {...state, ...action.payload};

    default:
      return state;
  }
};
