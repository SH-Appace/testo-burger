import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
export async function addNewAddress(
  body,
  token,
  setLoading,
  navigation,
  dispatch,
) {
  setLoading(true);
  try {
    const {data} = await axios.post('customer/address/add', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      console.log(data);
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: data,
      });
      navigation();
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    // console.log('error', err.response.data);
  }
}
export async function editAddress(body, token, id, setLoading, navigation) {
  setLoading(true);
  try {
    const {data} = await axios.put(`customer/address/update/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      navigation();

      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    // console.log('error', err.response.data);
  }
}
export async function getAddress(token, setLoading, setDeliveryData) {
  // setLoading(true);
  try {
    const {data} = await axios.get('customer/address/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      setDeliveryData(data.addresses);
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    // showMessage({
    //   message: err.response.data.errors[0].message,
    //   type: 'danger',
    // });
  }
}
export async function delAddress(
  token,
  setLoading,
  id,
  setRefreshData,
  refreshData,
) {
  setLoading(true);
  try {
    const {data} = await axios.delete(
      `customer/address/delete?address_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (data) {
      setRefreshData(!refreshData);
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
  }
}
