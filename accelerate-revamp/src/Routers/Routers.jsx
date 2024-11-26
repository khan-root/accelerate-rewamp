import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../view/Home/Home'
import Teams from '../view/Teams/Teams'
import WorkFlows from '../view/WorkFlows/WorkFlows'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/workflows' element={<WorkFlows />} />
    </Routes>
  )
}

export default Routers