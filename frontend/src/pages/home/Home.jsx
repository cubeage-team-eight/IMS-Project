import React from 'react'
import Hero from '../../components/home/Hero.jsx'
import Objective from '../../components/home/Objective.jsx'
import TechStack from '../../components/home/TechStack.jsx'
import User from '../../components/home/User.jsx'
import ProjectWorkflow from '../../components/home/ProjectWorkflow.jsx'
import SystemModules from '../../components/home/SystemModules.jsx'

function Home() {
  return (
    <>
      <Hero /> 
      <Objective />
      <User />
      <SystemModules />
      <ProjectWorkflow/>
      
      <TechStack />
    </>
  )
}

export default Home

