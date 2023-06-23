import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getBranches(dispatch) {
  try {
    const {data} = await axios.get('branch');
    if (data) {
      dispatch({
        type: 'BRANCH',
        payload: [data],
      });
    }
  } catch (err) {
    // console.log('error', err);
  }
}
