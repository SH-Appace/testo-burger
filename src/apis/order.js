import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';

export async function completeOrderReq(token) {
  try {
    const {data} = await axios.get(
      'customer/order/delivered-orders?limit=10&offset=0',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (data) {
      return data.orders;
    }
  } catch (err) {}
}

export async function activeOrderReq(token) {
  try {
    const {data} = await axios.get(
      'customer/order/running-orders?limit=10&offset=0',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (data) {
      return data.orders;
    }
  } catch (err) {}
}

export async function cancelOrderReq(token) {
  try {
    const {data} = await axios.get(
      'customer/order/cancelled-orders?limit=10&offset=0',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (data) {
      return data.orders;
    }
  } catch (err) {
    console.log('error', err.response.data);
  }
}

export async function placeOrder(
  body,
  token,
  setLoading,
  dispatch,
  navigation,
  setCoupon,
) {
  console.log('body', body);
  setLoading(true);
  try {
    const {data} = await axios.post('customer/order/place', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      // console.log('data', data);
      // return;
      dispatch({
        type: 'UPDATE_LOYALTY_POINTS',
        payload: data.user.loyalty_point,
      });
      dispatch({
        type: 'CLEAR_CART',
        payload: [],
      });
      setCoupon('');
      navigation.replace('RecommendedFoods', {
        points: data.loyalty_points,
      });
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    // showMessage({
    //   message: err.response.data.errors[0].message,
    //   type: 'danger',
    // });
    console.log('error', err);
  }
}

export async function cancelAOrder(
  body,
  token,
  setLoading,
  showModal,
  dispatch,
  navigation,
) {
  setLoading(true);
  try {
    const {data} = await axios.put('customer/order/cancel', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      setLoading(false);
      showModal();
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
