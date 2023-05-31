'use client' 
import Image from 'next/image';
import Link from 'next/link'
import React, {useState} from 'react'
import person from '../../../public/person.jpg'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { signIn, signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';

const LazyLink = dynamic(() => import('next/link'), {ssr: false})

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showShowMenu, setShowShowMenu] = useState(false);
    const {data: session} = useSession();


    const handleShowDropdown = () => setShowDropdown(prev => !prev)

    const handleHideDropdown = () => setShowDropdown(prev => false)

    const handleShowMenu = () => {
        setShowShowMenu(prev => !prev);
        setShowDropdown(true)
    }

    return (
        <div className='fixed z-50 top-0 left-0 w-full py-3 border-b-2 border-[#45c6a6] bg-white'>
            <div className='w-[83%] my-0 mx-auto flex justify-between items-center relative text-lg'>

                    <Link href='/' 
                        className='flex flex-row group'
                        onClick={() => toast.loading('Loading', {
                            id: 'loading',
                            duration: 5000
                        })}
                    >
                        <h1 className='text-[#45c6a6] text-2xl font-bold
                            transition-colors
                            group-hover:text-black ease-in-out duration-1000
                            '>Expressive</h1>
                        <h1 className='text-black text-2xl font-semibold
                            transition-colors
                            group-hover:text-[#45c6a6] ease-in-out duration-1000
                        '>Mind</h1>
                    </Link>

                    <div className='hidden md:flex flex-row items-center justify-between gap-5'>                   
                    <Link href={'/'} 
                        onClick={() => toast.loading('Loading', {
                            id: 'loading',
                            duration: 5000
                        })}
                        className='px-10 py-0  uppercase font-playSerif font-semibold 
                            hover:text-[#45c6a6] ease-in-out duration-500 text-lg'
                    >Home</Link>
                    <LazyLink href={'/all'} onClick={() => toast.loading('Loading', {
                        id: 'loading',
                        duration: 5000
                    })}
                    className='border-l-2 border-gray-400 font-playSerif pl-12 px-10 py-0 uppercase 
                        hover:text-[#45c6a6] ease-in-out duration-500 font-semibold  text-lg'
                    >All</LazyLink>
                    <LazyLink href={'/about'} onClick={() => toast.loading('Loading', {
                        id: 'loading',
                        duration: 5000
                    })}
                    className='border-l-2 border-gray-400 pl-12 font-playSerif px-10 py-0 uppercase 
                        hover:text-[#45c6a6] ease-in-out duration-500 font-semibold  text-lg'
                    >About</LazyLink>
                    <LazyLink href={'/contact'} onClick={() => toast.loading('Loading', {
                        id: 'loading',
                        duration: 5000
                    })}
                    className='border-x-2 border-gray-400 font-playSerif  px-10 py-0 uppercase 
                        hover:text-[#45c6a6] ease-in-out duration-500 font-semibold  text-lg'
                    >Contact</LazyLink>

                <ul className='flex justify-between items-center gap-5'>
                    {
                    session?.user ? (
                        <div>
                            <Image src={person}
                                width={45}
                                height={45}
                                className='object-cover rounded-[50%] cursor-pointer'
                                onClick={handleShowDropdown}/> {
                            showDropdown && (
                                <div className='absolute bg-[#45c6a6] p-3 mr-6 flex flex-col items-start gap-2 top-11 right-[-3rem] 
                                       text-white rounded-md cursor-pointer'>
                                    <AiOutlineClose onClick={handleHideDropdown}
                                        className='absolute top-1.5 right-1.5'/>
                                    <LazyLink onClick={() => {handleHideDropdown()
                                            toast.loading('Loading', {
                                                id: 'loading',
                                                duration: 5000
                                            })
                                        }} 
                                        href='/create_blog'>Create</LazyLink>
                                        <LazyLink onClick={() => {handleHideDropdown() 
                                                toast.loading('Loading', {
                                                    id: 'loading',
                                                    duration: 5000
                                                })    
                                            }}
                                        href='/dashboard'>Dashboard</LazyLink>
                                    <button onClick={
                                            () => {
                                                signOut();
                                                handleHideDropdown();
                                            }
                                        }
                                        className='border-none text-white rounded-md font-bold font-lg '>Logout</button>
                                    
                                </div>
                            )
                        } </div>
                    ) : (
                        <>
                            <LazyLink href={'/register'} onClick={() => toast.loading('Loading', {
                                    id: 'loading',
                                    duration: 5000
                                     })}
                                className='border-r-2 border-gray-400 font-playSerif  px-10 py-0 uppercase 
                                         hover:text-[#45c6a6] ease-in-out duration-500 font-semibold  text-lg'>Register</LazyLink>
                            <button
                               className='font-playSerif  px-10 py-0 uppercase 
                               hover:text-[#45c6a6] ease-in-out duration-500 font-semibold  text-lg'
                               onClick={() => signIn()}
                               >Log in</button>
                        </>
                    )
                } </ul>
                 </div>
                 <AiOutlineMenu className='md:hidden' onClick={() => handleShowMenu()} />
                
            </div>
            <nav className={`md:hidden ${showShowMenu? ' flex ' : ' hidden '} flex-col absolute
                  top-14 right-0 gap-y-4 p-4 bg-white border-2 border-[#45c6a6] items-start
                   w-fit text-[#45c6a6] font-bold z-1  outline-none text-lg
                   rounded-bl-xl`}>

                    <Link href={'/'} onClick={() => {
                        handleShowMenu()
                        toast.loading('Loading', {
                            id: 'loading',
                            duration: 5000
                        })
                        }}>Home</Link>
                    <LazyLink onClick={() => {handleHideDropdown() 
                                                toast.loading('Loading', {
                                                    id: 'loading',
                                                    duration: 5000
                                                })    
                                            }}
                            href='/all'>All</LazyLink>
                    <LazyLink onClick={() => {handleHideDropdown() 
                                                toast.loading('Loading', {
                                                    id: 'loading',
                                                    duration: 5000
                                                })    
                                            }}
                            href='/about'>About</LazyLink>
                    <LazyLink onClick={() => {handleHideDropdown() 
                                                toast.loading('Loading', {
                                                    id: 'loading',
                                                    duration: 5000
                                                })    
                                            }}
                            href='/contact'>
                                Contact 
                    </LazyLink>
                    {
                    session?.user ? (
                        <div>
                        {
                            showDropdown && (
                                <div className='flex flex-col items-start gap-y-4 text-lg rounded-md cursor-pointer'>
                                    <LazyLink onClick={() => {handleHideDropdown() 
                                                toast.loading('Loading', {
                                                    id: 'loading',
                                                    duration: 5000
                                                })    
                                            }}
                                        href='/create_blog'
                                        className='border-t-2 w-full pt-2'>Create</LazyLink>
                                    <LazyLink onClick={() => {handleHideDropdown() 
                                                toast.loading('Loading', {
                                                    id: 'loading',
                                                    duration: 5000
                                                })    
                                            }}
                                        href='/dashboard'>Dashboard</LazyLink>
                                    <button onClick={
                                            () => {
                                                signOut();
                                                handleHideDropdown();
                                            }
                                        }
                                        className='border-none text-[#45c6a6] rounded-md font-bold font-lg p-0'>
                                            Logout
                                    </button>
                                </div>
                            )
                        } </div>
                    ) : (
                        <>
                            <LazyLink href='/register' 
                                onClick={() => {handleShowMenu() 
                                    toast.loading('Loading', {
                                        id: 'loading',
                                        duration: 5000
                                    })    
                                }}
                           >Register</LazyLink>
                            <button
                               className='outline-none border-none p-0 text-md text-[#45c6a6] text-start'
                               onClick={() => {
                                signIn()
                                handleShowMenu()
                            }
                               }
                               >Log in</button>
                        </>
                    )}
                 </nav>
        </div>
    )
}

export default Navbar
