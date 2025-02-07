import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Lock, Mail, X } from 'lucide-react';
import { assets } from '../assets/asset';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div 
      className='fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/30'
    >
      <motion.form  
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative bg-white p-10 rounded-xl text-slate-500'
      >
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Login</h1>
        <p className='text-sm'>Welcome back! Please Login to continue</p>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <Mail />
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            className='outline-none text-sm' 
            type='email' 
            placeholder='Email id' 
            required
          />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <Lock />
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            className='outline-none text-sm' 
            type='password' 
            placeholder='Password' 
            required
          />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>
        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
          Login
        </button>

        <X 
          className='absolute top-5 right-5 cursor-pointer' 
          onClick={() => { navigate("/"); }} 
        />
      </motion.form>
    </div>
  );
};

export default Login;
