import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { resetCart } from './cartSlice';

const initialState = 
{
  orders: [],
  loading: false,
  error: null
};

const orderSlice = createSlice(
{
  name: 'orders',
  initialState,
  reducers: 
  {
    setLoading: state => 
    {
      state.loading = true;
    },
    fetchOrdersSuccess: (state, action) => 
    {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    placeOrderSuccess: (state, action) => 
    {
      state.orders.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    cancelOrderSuccess: (state, action) => 
    {
      state.orders = state.orders.map(order =>
      {
        return order.orderId === action.payload ? { ...order, status: 'canceled' } : order
      });
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const 
{
  setLoading,
  fetchOrdersSuccess,
  placeOrderSuccess,
  cancelOrderSuccess,
  setError
} = orderSlice.actions;

export const fetchOrders = () => dispatch => 
{
  dispatch(setLoading());
  axios
    .get('/server/fetch-orders/')
    .then(response => 
    {
      dispatch(fetchOrdersSuccess(response.data.response));
    })
    .catch(error =>
    {
      dispatch(setError(error.message));
      console.error('Error fetching orders:', error);
      toast.error('Error fetching orders.');
    });
};

export const placeOrder = orderData => dispatch => 
{
  dispatch(setLoading());
  axios
    .post('/server/place-order/', orderData)
    .then(response => 
    {
      dispatch(placeOrderSuccess(response.data.response));
      toast.success('Order placed successfully.');
    })
    .then(()=>dispatch(resetCart()))
    .catch(error => 
    {
      dispatch(setError(error.message));
      console.error('Error placing order:', error);
      toast.error('Error placing order.');
    });
};

export const cancelOrder = orderId => dispatch => 
{
  dispatch(setLoading());
  axios
    .put(`/server/update-order-status/${orderId}`,{status:"canceled"})
    .then(() => 
    {
      dispatch(cancelOrderSuccess(orderId));
      toast.success('Order cancelled successfully.');
    })
    .catch(error => 
    {
      dispatch(setError(error.message));
      console.error('Error cancelling order:', error);
      toast.error('Error cancelling order.');
    });
};

export default orderSlice.reducer;
