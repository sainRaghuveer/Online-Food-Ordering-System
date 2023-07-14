import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Home'
import FoodOrder from '../pages/FoodOrder'
import Cart from '../pages/Cart'
import PrivateRoute from '../components/PrivateRoute'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path='/order' element={
          <PrivateRoute>
            <FoodOrder />
          </PrivateRoute>
        }></Route>
        <Route path='/cart' element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }></Route>
      </Routes>
    </div>
  )
}

export default AllRoutes