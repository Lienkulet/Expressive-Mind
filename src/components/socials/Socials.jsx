import React from 'react'
import { BsTwitter } from 'react-icons/bs'
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'


const Socials = () => {
  return (
    <div className='flex flex-col border-2 border-gray-100 items-center px-7 gap-3 py-4 md:w-[350px]'>
        <header className='flex items-center '>
            <h1 className='font-semibold text-lg'>FOLLOW US</h1>
        </header>
        <div className='flex flex-wrap gap-2 items-center border-t-2 border-[#45c6a6] py-2 pt-6'>
            <div className='social'>
                <FaFacebookF />
            </div>
            <div className='social'>
                <BsTwitter />
            </div>
            <div className='social'>
                <FaLinkedinIn />
            </div>
            <div className='social'>
                <FaInstagram />
            </div>
            <div className='social'>
                <FaGithub />
            </div>
        </div>
    </div>
  )
}

export default Socials