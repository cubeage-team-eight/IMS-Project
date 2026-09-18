import React from 'react'
import Hero from '../../components/home/Hero.jsx'
import Objective from '../../components/home/Objective.jsx'
import User from '../../components/home/User.jsx'
import Module from '../../components/home/Module.jsx'
import ProjectWorkflow from '../../components/home/ProjectWorkflow.jsx'
import TechStack from '../../components/home/TechStack.jsx'
import Footer from '../../components/home/Footer.jsx'
import LandingNavbar from '../../components/home/LandingNavbar.jsx'

function Home() {
  return (
    <>
      {/* Single fixed navbar for the entire landing page */}
      <LandingNavbar />
      <Hero /> 
      <Objective />
      <User />
      <Module />
      <ProjectWorkflow/>
      <TechStack />
      <Footer />
    </>
  )
}

export default Home


