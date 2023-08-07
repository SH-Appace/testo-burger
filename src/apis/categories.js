import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function categoriesReq(dispatch, navigateTo) {
  try {
    const {data} = await axios.get('categories');
    if (data) {
      dispatch({
        type: 'CATEGORIES',
        payload: [data],
      });
    }
  } catch (err) {
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
  }
}

export async function categoriesAllProductsReq(dispatch, navigateTo) {
  try {
    const {data} = await axios.get('products/popular');
    if (data) {
      dispatch({
        type: 'PRODUCTS',
        payload: [data],
      });
    }
  } catch (err) {
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
  }
}
export async function getRecommendedProductsReq(token, setData) {
  try {
    const {data} = await axios.get('customer/suggested-foods', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      setData(data);
    }
  } catch (err) {
    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
  }
}

export async function getSingleCategoryProducts(catId, setData, setLoading) {
  try {
    setLoading(true);
    const {data} = await axios.get(`categories/products/${catId}/all`);
    if (data) {
      setData(data);
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
}
