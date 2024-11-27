import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../view/Home/Home'
import Teams from '../view/Teams/Teams'
import WorkFlows from '../view/WorkFlows/WorkFlows'
import Projects from '../view/Projects/Projects'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/workflows' element={<WorkFlows />} />
        <Route path='/projects' element={<Projects />} />
    </Routes>
  )
}

export default Routers