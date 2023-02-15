import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {   
    let auth = localStorage.getItem('data')

    if(!auth){
       return <Navigate to="/" />
    }

  return (
   <>{children}</>
  )
}

export default ProtectedRoute;