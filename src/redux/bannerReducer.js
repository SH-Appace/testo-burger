import AsyncStorage from '@react-native-async-storage/async-storage';

let userState;
let userData;

const setUser = async () => (userData = await AsyncStorage.getItem('banners'));
setUser();

if (userData) {
  const setData = async () =>
    (userState = await AsyncStorage.getItem('banners'));
  setData();
} else {
  userState = null;
}

export const bannerReducer = (state = userState, action) => {
  switch (action.type) {
    case 'BANNERS':
      return {...state, ...action.payload};

    default:
      return state;
  }
};
