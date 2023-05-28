import Link from 'next/link'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { BsFillTelephoneFill, BsLinkedin } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { TbMessage2 } from 'react-icons/tb'
const Footer = () => {
    return (
        <section className='w-full h-fit py-20 bg-[#302F36]'>
            <div className='w-[83%] h-full my-0 mx-auto flex flex-col md:flex-row gap-10
                        justify-between items-center'>
                <section className='flex flex-col text-white min-h-[250px]'>
                    <header className='flex mt-0 mb-3'>
                        <h1 className='text-white text-2xl font-bold'>Expressive</h1>
                        <h1 className='text-[#66CAE3] text-2xl font-bold'>Mind</h1>
                    </header>
                    <summary className='list-none mt-2 max-w-md text-[#AEAEAB]'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui iusto sapiente nulla, optio amet fuga dolorem ipsam rerum accusantium minima, dolores, eaque asperiores.
                    </summary>
                    <div className='flex flex-col mt-4 gap-1'>
                        <span className='flex flex-row gap-2 text-[#AEAEAB] items-center'>
                            <BsFillTelephoneFill size={'1rem'}  />
                            123-456-789</span>
                        <span className='flex flex-row gap-2 text-[#AEAEAB] items-center'>
                            <MdEmail size={'1.25rem'} />
                            clocicovalexandru@gmail.com</span>
                    </div>
                    <div className='flex flex-wrap items-center gap-5 mt-4'>
                        <Link href={'https://github.com/Lienkulet'} target='_blank' className='border-2 border-gray-400 rounded-md p-1'>
                            <AiFillGithub size={'2rem'} fill='grey' />
                        </Link>
                        <Link href={'https://www.linkedin.com/in/alexandru-clocicov/'} target='_blank' className='border-2 border-gray-400 rounded-md p-2'>
                            <BsLinkedin size={'1.5rem'} fill='grey' />
                        </Link>
                    </div>
                </section>
                <section className='flex flex-col my-0 p-0 min-h-[250px]'>
                    <h1 className='font-extrabold text-2xl mb-5 text-white'>Contact Us</h1>
                    <form className='flex flex-col gap-2 items-end'>
                        <input type="email" placeholder='Your email address' className='w-full bg-[#262625]
                                                        py-2 px-3 text-lg
                                                        text-gray-400
                                                        placeholder:text-[#8a888a]'/>
                        <textarea cols="30" rows='3' className='w-full bg-[#262625]
                                                        py-2 px-3 text-lg
                                                        max-h-[100px]        
                                                        text-gray-400
                                                        placeholder:text-[#8a888a]' placeholder='Message...'/>
                        <button className='bg-[#005B6B] flex flex-row
                                            items-center justify-center text-white
                                             gap-1 text-lg py-2 px-5 w-full md:w-fit 
                                             rounded-sm'>
                           <TbMessage2 size={'1.5rem'} />
                            Send
                        </button>
                    </form>
                </section>
            </div>
        </section>
    )
}

export default Footer

