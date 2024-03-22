import React from 'react'
import Header from './Header'
import Footer from './Footer'
import homeSecImg from '../assets/home_sec_img.webp'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  const goToDress = () => {
    navigate("/dress");
  }

  return (
    <>
      <Header />

      <div className="home_section bg-slate-800 h-[81vh] flex flex-col justify-evenly items-center 
      lg:flex-row">
            <div className="left_sec md:p-9">
                <h1 className='text-3xl text-[#abacba] mt-2 '>Get Your Favourite</h1>
                <h1 className='text-3xl text-[#abacba] mt-2'>Design Ready</h1> 
                <div className="btn my-10">
                  
                <Button variant='outlined' size='large' fullWidth color='secondary' onClick={goToDress}>Design</Button>
                  </div>  
            </div>

            <div className="right_sec md:p-9 lg:ml-10"> 
                <img className='h-[14rem] rounded-[50px]' src={homeSecImg} alt="home_sec_img" />
            </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
