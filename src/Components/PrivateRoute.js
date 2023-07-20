import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate,Outlet } from 'react-router-dom';
import { auth } from '../firebase';
function PrivateRoute() {
    const [user, loading, error] = useAuthState(auth)

    if(loading)
    {
        return <p>Loading...</p>

    }
    else if(!user || error)
    {
        return <Navigate to="/" replace />
    }
    else{
        return <Outlet></Outlet>
    }
  
}

export default PrivateRoute
