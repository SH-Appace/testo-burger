import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getNotifications(token, setData, setLoading) {
  try {
    setLoading(true);
    const {data} = await axios.get('customer/notifications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      console.log('data', data);
      setData(data);
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    console.log('error', err);
  }
}
