// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Search } from "lucide-react";
// import { assets } from '../assets/assests';
// const Headers = () => {

//   return (
//     <div>
//         <motion.div className="content-container p-8"  initial={{opacity:0.2,y:100}}
//     transition={{duration:1}}
//     whileInView={{opacity:1,y:0}}
//     viewport={{once:true}}>
//         <p className='font-bold  text-5xl flex  justify-center mb-12'>Capture Your Moments through our lens</p>
//         {/* <h2 className="text-3xl font-bold mb-10 text-center ">Welcome to SnapCircle</h2> */}
//         <motion.h2
//   className="text-3xl font-bold mb-10 text-center text-slate-700"
//   initial={{ textShadow: "0px 0px 5px #ffffff" }}
//   animate={{
//     textShadow: [
//       "0px 0px 5px #ffffff",
//       "0px 0px 15px #ffa500", 
//       "0px 0px 25px #00ff00", 
//       "0px 0px 15px #ffa500", 
     
//     ],
//   }}
//   transition={{
//     duration: 3,
//     repeat: Infinity,
//     repeatType: "loop",
//   }}
// >
//   Welcome to SnapCircle
// </motion.h2>

//         {/* searchbar */}

//     <div className='flex'>
//     <div className="flex flex-col justify-center items-center w-full h-52 px-4 py-6 bg-gray-100 mb-14 lg:mt-16">
//         <p className='text-center font-semibold text-xl mb-5'>Explore talented photographers and book your next session easily with our platform.</p>
//         <div className="relative w-full max-w-xl">
//         <Search
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
//           size={20}
//         />
//         <input
//           type="text"
//           placeholder="Search your perfect photographer nearby your location"
//           className="w-full pl-12 pr-4 py-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
//         />
//       </div>
//     </div>
//      <img className='lg:flex hidden' src={assets.photographer}/>
//     </div>

       
       
//         <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="feature-card bg-gray-100 p-4 rounded-md shadow-md hover:scale-110 hover:bg-slate-200">
//             <h3 className="font-semibold text-xl">Browse Photographers</h3>
//             <p>Discover top photographers based on your needs and location.</p>
//           </div>
//           <div className="feature-card bg-gray-100 p-4 rounded-md shadow-md hover:scale-110 hover:bg-slate-200">
//             <h3 className="font-semibold text-xl">Book Appointments</h3>
//             <p>Easy-to-use booking system to schedule shoots with your chosen photographer.</p>
//           </div>
//           <div className="feature-card bg-gray-100 p-4 rounded-md shadow-md hover:scale-110 hover:bg-slate-200">
//             <h3 className="font-semibold text-xl">Community</h3>
//             <p>Join a community of creatives and share photography tips, ideas, and experiences.</p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default Headers

import { motion } from 'framer-motion';
import { Search } from "lucide-react";
import { assets } from '../assets/assests';
import {useNavigate} from 'react-router-dom'
const Headers = () => {
  const navigate=useNavigate();
  return (
    <div>
        <motion.div className="content-container p-8"  initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
        <p className='font-bold  text-5xl flex  justify-center mb-12'>Capture Your Moments through our lens</p>
        {/* <h2 className="text-3xl font-bold mb-10 text-center ">Welcome to SnapCircle</h2> */}
        <motion.h2
  className="text-3xl font-bold mb-10 text-center text-slate-700"
  initial={{ textShadow: "0px 0px 5px #ffffff" }}
  animate={{
    textShadow: [
      "0px 0px 5px #ffffff",
      "0px 0px 15px #ffa500", 
      "0px 0px 25px #00ff00", 
      "0px 0px 15px #ffa500", 
     
    ],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    repeatType: "loop",
  }}
>
  Welcome to SnapCircle
</motion.h2>

<button
  className="mt-4 mx-auto block px-6 py-3  bg-teal-500 hover:bg-teal-600 mb-5 text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400"
  onClick={() =>{ 
    navigate('/photographers')
    
    }}
>
  Go to Photographers Page
</button>

        {/* searchbar */}

    <div className='flex'>
    <div className="flex flex-col justify-center items-center w-full h-52 px-4 py-6 bg-gray-100 mb-14 lg:mt-16">
        <p className='text-center font-semibold text-xl mb-5'>Explore talented photographers and book your next session easily with our platform.</p>
        <div className="relative w-full max-w-xl">
        <Search
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
          size={20}
        />
        <input
          type="text"
          placeholder="Search your perfect photographer nearby your location"
          className="w-full pl-12 pr-4 py-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
        />
      </div>
    </div>
     <img className='lg:flex hidden' src={assets.photographer}/>
    </div>

       
       
        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="feature-card bg-gray-100 p-4 rounded-md shadow-md hover:scale-110 hover:bg-slate-200">
            <h3 className="font-semibold text-xl">Browse Photographers</h3>
            <p>Discover top photographers based on your needs and location.</p>
          </div>
          <div className="feature-card bg-gray-100 p-4 rounded-md shadow-md hover:scale-110 hover:bg-slate-200">
            <h3 className="font-semibold text-xl">Book Appointments</h3>
            <p>Easy-to-use booking system to schedule shoots with your chosen photographer.</p>
          </div>
          <div className="feature-card bg-gray-100 p-4 rounded-md shadow-md hover:scale-110 hover:bg-slate-200">
            <h3 className="font-semibold text-xl">Community</h3>
            <p>Join a community of creatives and share photography tips, ideas, and experiences.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Headers;
