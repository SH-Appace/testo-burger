import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';

export async function chatHistory(orderId, setData, setLoading, token) {
  try {
    const {data} = await axios.get(`customer/chat?order_id=${orderId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      // console.log('data', data);
      setData(data);
      setLoading(false);
    }
  } catch (err) {
    console.log('err', err.response.data);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
  }
}

export async function sendMessage(body, token) {
  try {
    const {data} = await axios.post('customer/chat/send-message', body, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      //   setLoading(data);
    }
  } catch (err) {
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
  }
}

export async function readMessage(orderId, token) {
  try {
    const {data} = await axios.get(`customer/chat/read-message/${orderId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      console.log('data', data);
      //  setData(data);
      //  setLoading(false);
    }
  } catch (err) {
    console.log('err', err.response.data);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
  }
}
