import AsyncStorage from '@react-native-async-storage/async-storage';

let userState;
let userData;

const setUser = async () => (userData = await AsyncStorage.getItem('auth'));
setUser();

if (userData) {
  const setData = async () => (userState = await AsyncStorage.getItem('auth'));
  setData();
} else {
  userState = {user:null};
}

export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return {...state, ...action.payload};
    case 'LOGOUT':
      return {user:null};
    case 'UPDATE_LOYALTY_POINTS':
      // Update the loyalty points in the user object
      return {
        ...state,
        user: {
          ...state.user,
          loyalty_point: action.payload,
        },
      };
    default:
      return state;
  }
};
