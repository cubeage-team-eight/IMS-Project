import React from 'react'
import Hero from '../../components/home/Hero.jsx'
import Objective from '../../components/home/Objective.jsx'
import TechStack from '../../components/home/TechStack.jsx'
import User from '../../components/home/User.jsx'

function Home() {
  return (
    <>
      <Hero /> 
      <User />
      <Objective />
      <TechStack />
    </>
  )
}

export default Home

