import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration: '2000'
});

const Landingscreen = () => {
  return (
    <div className='row landing justify-content-center'>
      <div className='col-md-9 my-auto text-center' style={{borderRight:'8px solid white'}}>

        <h2 data-aos='zoom-in' style={{color: 'white', fontSize:'120px', fontWeight:'bold'}}>Diva Hostel</h2>
        <h4 data-aos='zoom-out' style={{color: 'white', marginTop:'50px'}}>"Beautiful and Affordable rooms for guest"</h4>

        <Link to={'/home'}>
        <button className='btn landingBtn'>Get Started</button>
        </Link>
      </div>
      
    </div>
    
  )
}

export default Landingscreen
