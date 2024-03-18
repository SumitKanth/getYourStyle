import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="h-[12vh] bg-black text-white flex justify-evenly items-center">
          <p className='text-[1rem]'>Made By Sumit © 2024</p>
          <p className='text-[1rem] cursor-pointer'><Link to='/admin-validate'>Admin Page</Link></p>
      </footer>
    </>
  )
}

export default Footer