import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';

export async function addWishlist(body, token) {
  try {
    const {data} = await axios.post('customer/wish-list/add', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      return;
    }
  } catch (err) {
    console.log('error', err.response.data);
  }
}
export async function removeWishlist(body, token) {
  try {
    const {data} = await axios.delete(
      `customer/wish-list/remove?food_id=${body}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (data) {
      return;
    }
  } catch (err) {
    console.log('error', err.response.data);
  }
}
