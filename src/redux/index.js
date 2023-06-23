import {combineReducers} from 'redux';
import {categoriesReducer} from './categoriesReducer.js';
import {authReducer} from './authReducer.js';
import {productsReducer} from './productsReducer.js';
import {cartReducer} from './cartReducer.js';
import {bannerReducer} from './bannerReducer.js';
import {wishlistReducer} from './wishlistReducer.js';
import {branchReducer} from './branchReducer.js';

export const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
  banners: bannerReducer,
  wishlist: wishlistReducer,
  branch: branchReducer,
});
