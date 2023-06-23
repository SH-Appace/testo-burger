import AsyncStorage from '@react-native-async-storage/async-storage';

let userState;
let userData;

const setUser = async () => (userData = await AsyncStorage.getItem('branch'));
setUser();

if (userData) {
  const setData = async () =>
    (userState = await AsyncStorage.getItem('branch'));
  setData();
} else {
  userState = null;
}

export const branchReducer = (state = userState, action) => {
  switch (action.type) {
    case 'BRANCH':
      return {...state, ...action.payload};

    default:
      return state;
  }
};
