import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../view/Home/Home'
import Teams from '../view/Teams/Teams'
import WorkFlows from '../view/WorkFlows/WorkFlows'
import Projects from '../view/Projects/Projects'
import ProjectDetails from '../view/Projects/ProjectDetails'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/teams' element={<Teams />} />
      <Route path='/workflows' element={<WorkFlows />} />
      <Route exact path='/projects' element={<Projects />}>
        <Route path='details/:id' element={<ProjectDetails />} />
      </Route>
    </Routes>
  )
}

export default Routers