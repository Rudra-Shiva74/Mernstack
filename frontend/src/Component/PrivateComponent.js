import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from './Auth';
export default function PrivateComponent() {
    return isLoggedIn() ? < Outlet /> : <Navigate to='/signup' />
}
