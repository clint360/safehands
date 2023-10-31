import React from 'react'
import { scrollTo } from '../LandingPage'
import Link from 'next/link'

function Home() {
  return (
    <section id="home">
    <div className="content">
      <h1>Welcome to Safe Hands</h1>
      <p>
        We believe every child deserves a safe and nurturing environment.
      </p>
      <p className="tagline">
        Together, let's create a safe world for every child.
      </p>
      <div className="buttons">
        <button className="button-24" onClick={()=>{scrollTo('report')}}>REPORT ABUSE CASE</button>
        <Link href={'/auth/login'}><button className="button-23">VIEW REPORT STATUS</button></Link>
      </div>
    </div>  
      <hr />
  </section>

  )
}

export default Home