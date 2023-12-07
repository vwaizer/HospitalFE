import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute ( {children} ) {
  const { authenticated } = useAuth();
  return authenticated ? children : <Navigate to={`/login`} />; // push user back to login page if not logged in
};