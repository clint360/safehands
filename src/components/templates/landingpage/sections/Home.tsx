import React from 'react'
import { scrollTo } from '../LandingPage'
import Link from 'next/link'

function Home({ webData }: any) {
  return (
    <section id="home">
    <div className="content">
      <h1 dangerouslySetInnerHTML={{ __html: webData?.heroTitle }} />
      <p dangerouslySetInnerHTML={{ __html: webData?.heroTagline }} />
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