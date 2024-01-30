import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export async function loyaltyDiscount(
  body,
  token,
  setLoading,
  setLoyaltyDiscount,
  setOpenInput,
) {
  setLoading(true);
  try {
    const {data} = await axios.post(
      `customer/loyalty-point/calculate-discount`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (data) {
      console.log('data', data);
      setLoading(false);
      setLoyaltyDiscount(data.discount);
      setOpenInput('');
    }
  } catch (err) {
    console.log(err.response.data);
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    console.log('error', err);
  }
}
