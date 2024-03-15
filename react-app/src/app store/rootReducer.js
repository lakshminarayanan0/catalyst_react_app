import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import productsSlice from './slices/productSlice';
import orderSlice from './slices/orderSlice';
import cartSlice from './slices/cartSlice';


const rootReducer = combineReducers({
  user: userSlice,
  products:productsSlice,
  orders:orderSlice,
  cart:cartSlice
  
});

export default rootReducer;
