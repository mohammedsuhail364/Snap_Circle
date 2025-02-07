import React from 'react';
import { assets } from '../assets/assests';

const Footer = () => {
  return (
    <div className='px-5 md:px-10'>
      <div className='flex flex-col lg:grid lg:grid-cols-[3fr_1fr_1fr] gap-8 lg:gap-14 my-10 mt-20 text-sm'>
        <div>
          <img className="mb-5 w-32 md:w-40" src={assets.logo_icon} alt="Logo" />
          <p className='text-gray-600 max-w-full md:max-w-[70%]'>
            SnapCircle is a vibrant platform connecting clients with skilled photographers through stunning portfolios, seamless appointment booking, and personalized profiles. SnapCircle brings your moments to life with ease and artistry!
          </p>
        </div>

        <div>
          <p className='text-lg md:text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>    
        </div>

        <div className='mb-12 lg:mb-24'>
          <p className='text-lg md:text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 8778354283</li>
            <li>snapcircle@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center'>
          Copyright 2025@ snapcircle. All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
