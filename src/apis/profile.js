import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

export async function updateProfile(
  body,
  navigation,
  setLoading,
  fromOTPcode,
  token,
  dispatch,
) {
  setLoading(true);
  try {
    const {data} = await axios.post('customer/update-profile', body, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data) {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: data.data,
      });
      if (fromOTPcode) {
        navigation.replace('SetLocation', {
          fromProfile: true,
          edit: false,
        });
      } else {
        navigation.goBack();
      }
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    console.log('error', err);
  }
}
export async function updateLocation(
  body,
  navigation,
  setLoading,
  token,
  dispatch,
) {
  setLoading(true);
  try {
    const {data} = await axios.post('customer/update-user-location', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: data.data,
      });
      // if (fromProfile) {
      //   navigation.replace('CreatePin');
      // } else {
      //   navigation.goBack();
      // }
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    console.log('error', err.response.data);
  }
}
export async function updateAddress(
  body,
  setLoading,
  token,
  dispatch,
  navigateionFunc,
) {
  setLoading(true);
  try {
    const {data} = await axios.post('customer/update-address', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: data.data,
      });
      navigateionFunc();
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    console.log('error', err.response.data);
  }
}
export async function updateFCMToken(body, token) {
  try {
    const {data} = await axios.put('customer/cm-firebase-token', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log('error', err);
  }
}
export async function forgotPassword(body, setLoading, navigation) {
  try {
    setLoading(true);
    const {data} = await axios.post('auth/forgot-password', body);
    if (data) {
      const confirmation = await auth().signInWithPhoneNumber(body.phone);
      if (confirmation) {
        navigation.replace('OtpCode', {
          data: data,
          confirm: confirmation,
          fromForgotPassword: true,
        });
      }
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    // console.log('error', err.response.data.errors[0].message);
  }
}
export async function resetPassword(body, setLoading, navigation) {
  try {
    setLoading(true);
    const {data} = await axios.put('auth/reset-password', body);
    if (data) {
      setLoading(false);
      showMessage({
        message: 'Password updated successfully!',
        type: 'success',
      });
      navigation.replace('SignIn');
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    // console.log('error', err.response.data.errors[0].message);
  }
}
