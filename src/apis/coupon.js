import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export async function couponGet(token, setLoading, setCouponData) {
  setLoading(true);
  try {
    const {data} = await axios.get('coupon/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      console.log(data);
      setCouponData(data);
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    // showMessage({
    //   message: err.response.data.errors[0].message,
    //   type: 'danger',
    // });
    // console.log('error', err);
  }
}
export async function couponApply(
  body,
  token,
  setLoading,

  dispatch,
  showModal = () => {},
) {
  setLoading(true);
  try {
    const {data} = await axios.get(`coupon/apply?code=${body.code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      dispatch({
        type: 'ADD_COUPON',
        payload: {
          code: body.code,
          discount: data.discount,
        },
      });
      showModal();
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    console.log('error', err.response.data);
  }
}
