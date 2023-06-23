import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';

export async function stripePost(body, token, setLoading) {
  console.log(body);
  try {
    setLoading(true);
    const {data} = await axios.post('customer/order/payment-sheet', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      setLoading(false);
      const {paymentIntent, ephemeralKey, customer, publishableKey} = data;

      return {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      };
    }
  } catch (err) {
    console.log('error', err.response.data);
  }
}
