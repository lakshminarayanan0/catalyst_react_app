import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { fetchProducts } from '../../app store/slices/productSlice';
import ProductList from './ProductList';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';
import Cart from './Cart';
import {Route, Routes, Navigate } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';

function UserPage() 
{
  const dispatch = useDispatch();
  useEffect(() => 
  {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
        <Routes>
          <Route path="/app/" element={<ProductList />} />
          <Route path="/app/user-profile" element={<UserProfile/>} />
          <Route path="/app/order-history" element={<OrderHistory />} />
          <Route path="/app/cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/app/" replace />} />
        </Routes>
        <BottomNavBar />
    </div>
  );
}

export default UserPage;
