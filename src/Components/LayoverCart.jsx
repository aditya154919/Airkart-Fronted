import React from 'react'
import { useLocation } from 'react-router-dom';

const LayoverCart = () => {
  const location = useLocation();
  const { flight, item } = location.state || {};
  return (
    <div>
      
    </div>
  )
}

export default LayoverCart
