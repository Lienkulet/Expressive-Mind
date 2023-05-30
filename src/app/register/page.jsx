'use client'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Register = async() => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password === '' || email === '' || username === ''){
            toast.error('Please fill all fields');
            return;
        }
        try{
            const res = await fetch('/api/register', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ username, email, password })
            })  
            
            if(res.ok){
                toast.success("Successfully registered");

                setTimeout(() => {
                    signIn();
                }, 1500);
                return;
            } else{
                toast.error("Something went wrong");
                return;
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <section className="w-full h-screen bg-[#CCCCCC] flex flex-col ">
            <div className='flex flex-col m-auto w-fit justify-center text-[#55B1DF]
                                    items-center gap-5 bg-[#FFFFFF] py-4 px-1
                                    min-w-[330px] rounded-2xl shadow-md'>
                <h2 className='font-extrabold text-3xl'>Create an Account</h2>
                <form onSubmit={e => handleSubmit(e)} 
                    className='flex flex-col gap-3 p-0 m-0'
                >
                    <input
                        type="text"
                        placeholder='Username' 
                        onChange={e => setUsername(e.target.value)}
                        className='rounded-2xl py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none text-lg' 
                    />
                    <input
                        type="email"
                        placeholder='Email' 
                        onChange={e => setEmail(e.target.value)}
                        className='rounded-2xl py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none text-lg'   
                    />
                    <input
                        type="password"
                        placeholder='Password' 
                        onChange={e => setPassword(e.target.value)}
                        className='rounded-2xl py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none text-lg'   
                    />
                    <button 
                        type='submit'
                        className='bg-[#55B1DF] rounded-2xl py-2 px-8
                        text-white font-bold text-sm  border border-sky-500
                        hover:text-[#55B1DF] hover:bg-white'
                    >Register</button>
                </form>
            </div>
        </section>
    )
}

export default Register
