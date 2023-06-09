'use client';
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {data: session} = useSession();
    const router = useRouter();
    if(session){
      router.push('/');
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); 

        if(password === '' || email === ''){
            toast.error('Please fill all fields');
            return;
        }
        
        try {
            const res = await signIn('credentials', {email, password, redirect: false});

            if(res.error === null){
                toast.success('Successfully logged in')
                const previousPage = sessionStorage.getItem('previousPage');
              if (previousPage === '/register') {
                router.push('/');
              } else {
                router.back();
              }
            } else {
                toast.error('An error occured while loggin in');
            }

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className="w-full h-screen bg-[#CCCCCC] flex flex-col">
    <article className='flex flex-col m-auto w-fit justify-center text-[#45c6a6]
      items-center gap-10 bg-[#FFFFFF] py-8 px-5 
      min-w-[360px] rounded-xl shadow-md'>
      <h2 className='font-extrabold text-3xl'>Log In</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input 
          type="email"
          placeholder='Email...'
          onChange={e => setEmail(e.target.value)}   
          className='rounded-2xl py-2 px-5 border border-[#ccc]
          hover:border-[#45c6a6] outline-none text-lg'   
        />
        <input 
          type="password"
          placeholder='Password'
          onChange={e => setPassword(e.target.value)} 
          className='rounded-2xl py-2 px-5 border border-[#ccc]
          hover:border-[#45c6a6] outline-none'   
        />
        <div className='flex justify-between items-center mt-9'>
          <Link href='/register' className='text-sm hover:text-gray-400'>
            Register
          </Link>
          <button className='bg-[#45c6a6] rounded-2xl py-2 px-8
           text-white font-bold text-sm border border-sky-500
           hover:text-[#45c6a6] hover:bg-white'
          >Log in</button>
        </div>
      </form>
    </article>
  </section>
  
  )
}

export default Login