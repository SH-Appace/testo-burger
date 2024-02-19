import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {Platform} from 'react-native';

export async function signupReq(
  body,
  navigation,
  setLoading,
  dispatch,
  navigateTo,
) {
  setLoading(true);
  try {
    const {data} = await axios.post('auth/sign-up', body);
    if (data) {
      navigation.replace('SignIn');
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    // console.log('error', err.response.data.errors[0]);
  }
}

export async function verifyPhoneReq(
  body,
  setLoading,
  dispatch,
  dataUser,
  credentials,
  navigationFunc,
) {
  setLoading(true);
  try {
    const {data} = await axios.post('auth/verify-phone', body);
    if (data) {
      await AsyncStorage.setItem('credentials', JSON.stringify(credentials));
      await AsyncStorage.setItem('auth', JSON.stringify(dataUser));
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: dataUser,
      });
      navigationFunc();
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    // console.log('error', err.response.data.errors[0]);
  }
}

export async function signinReq(
  body,
  navigation,
  setLoading,
  dispatch,
  isSplashError,
) {
  setLoading(true);
  try {
    const {data} = await axios.post('auth/continue-with-phone', body);
    if (data) {
      await AsyncStorage.setItem('credentials', JSON.stringify(body));
      await AsyncStorage.setItem('auth', JSON.stringify(data));
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: data,
      });
      try {
        const response = await axios.get('customer/wish-list', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        if (response.data) {
          dispatch({
            type: 'ADD_TO_WISHLIST',
            payload: response.data.food,
          });
          if (data.user.is_phone_verified === 1) {
            if (data.user.is_first_login === 0) {
              navigation.replace('DrawerNavigator');
            } else {
              navigation.replace('EditProfile', {
                fromOTPcode: true,
              });
            }
          } else {
            const confirmation = await auth().signInWithPhoneNumber(body.phone);
            if (confirmation) {
              navigation.replace('OtpCode', {
                isFirstLogin: data.user.is_first_login,
                data: data,
                confirm: confirmation,
                credentials: body,
              });
            }
          }
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.log('error', err.response.data);
      }
    }
  } catch (err) {
    setLoading(false);

    if (isSplashError) {
      navigation.replace('SignIn');
    } else {
      showMessage({
        message: err.response.data.errors[0].message,
        type: 'danger',
      });
    }
    console.log('error sign in', err.response.data);
  }
}

export async function deleteAccount(setLoading, func, token, setModalVisible) {
  try {
    setLoading(true);
    const {data} = await axios.delete('customer/remove-account', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      func();
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    setModalVisible(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    console.log(err.response.data.errors[0].message);
  }
}

export async function SplashReq(dispatch) {
  try {
    const {data} = await axios.get('splash-screen');
    if (data) {
      dispatch({
        type: 'CATEGORIES',
        payload: [data.categories],
      });
      dispatch({
        type: 'PRODUCTS',
        payload: [data.popular_products],
      });
      dispatch({
        type: 'BANNERS',
        payload: [data.campaigns],
      });
      dispatch({
        type: 'BRANCH',
        payload: [data.branches],
      });
    }
  } catch (err) {
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
  }
}

export async function StoreDeviceToken(token) {
  try {
    const {data} = await axios.post('add-device-token', {
      device_token: token,
      platform: Platform.OS,
    });
    if (data.status) {
      console.log('Token Added Success');
    }
  } catch (err) {
    console.log('error', err.response.data);
  }
}
