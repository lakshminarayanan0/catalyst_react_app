import React from 'react';
import Homepage from './HomePage';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import BottomNavBar from './BottomNavBar';

function AdminPage() 
{
  return (
    <>
      
        <Routes>
          <Route path="/app/" element={<Homepage/>} />
          <Route path="/app/user-profile" element={<UserProfile/>} />
          <Route path="*" element={<Navigate to="/app/" replace />} />
        </Routes>
        <BottomNavBar />
     
    </>
  );
}

export default AdminPage;
