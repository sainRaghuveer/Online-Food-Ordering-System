import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Home'
import FoodOrder from '../pages/FoodOrder'
import Cart from '../pages/Cart'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path='/order' element={<FoodOrder/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes