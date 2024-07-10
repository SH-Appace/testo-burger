import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getBanner(dispatch) {
  try {
    const {data} = await axios.get('campaigns/item');
    if (data) {
      dispatch({
        type: 'BANNERS',
        payload: [data],
      });
    }
  } catch (err) {
    // console.log('error', err);
  }
}
