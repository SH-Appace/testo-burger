import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';

export async function postReview(body, token, navigation, setLoading) {
  try {
    setLoading(true);
    const {data} = await axios.post('customer/order/review', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      setLoading(false);
      showMessage({
        message: 'Review submitted successfully!',
        type: 'success',
      });
      navigation.goBack();
      return;
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    console.log('error', err.response.data.errors[0].message);
  }
}
