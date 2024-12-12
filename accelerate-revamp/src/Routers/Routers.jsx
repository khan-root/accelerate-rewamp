import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../view/Home/Home'
import Teams from '../view/Teams/Teams'
import WorkFlows from '../view/WorkFlows/WorkFlows'
import Projects from '../view/Projects/Projects'
import ProjectDetails from '../view/Projects/ProjectDetails'
import Mileston from '../view/Milestone/Mileston'
import Statistics from '../view/Statistics/Statistics'
import Backlog from '../view/Backlog/Backlog'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/teams' element={<Teams />} />
      <Route path='/workflows' element={<WorkFlows />} />
      <Route exact path='/projects' element={<Projects />}>
        <Route path='details/:id' element={<ProjectDetails />} />
      </Route>
      <Route path='/task/:id' element={<Mileston />} />
      <Route path='/statistics' element={<Statistics />} />
      <Route path='/backlog/:id' element={<Backlog />} />
    </Routes>
  )
}

export default Routers