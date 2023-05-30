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
        <div className='fixed z-50 top-0 left-0 w-full bg-[#005B6B] shadow py-3'>
            <div className='w-[83%] my-0 mx-auto flex justify-between items-center relative  text-white text-lg'>

                    <Link href='/' className='flex flex-row'
                        onClick={() => toast.loading('Loading', {
                            id: 'loading',
                            duration: 5000
                        })}
                    >
                        <h1 className='text-[#66CAE3] text-2xl font-bold'>Expressive</h1>
                        <h1 className='text-white text-2xl font-bold'>Mind</h1>
                    </Link>

                    <div className='hidden md:flex flex-row items-center justify-between gap-5'>                   
                    <Link href={'/'} 
                        onClick={() => toast.loading('Loading', {
                            id: 'loading',
                            duration: 5000
                        })}
                    >Home</Link>
                    <LazyLink href={'/all'} onClick={() => toast.loading('Loading', {
                        id: 'loading',
                        duration: 5000
                    })}>All</LazyLink>

                <ul className='flex items-center gap-5'>
                    {
                    session?.user ? (
                        <div>
                            <Image src={person}
                                width={45}
                                height={45}
                                className='object-cover rounded-[50%] cursor-pointer'
                                onClick={handleShowDropdown}/> {
                            showDropdown && (
                                <div className='absolute bg-[#005B6B] p-3 mr-6 flex flex-col items-start gap-2 top-8 right-[-3rem] rounded-md cursor-pointer'>
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
                            <LazyLink href='/register'>Register</LazyLink>
                            <button
                               className='outline-none border-none py-2 text-md text-white rounded-md'
                               onClick={() => signIn()}
                               >Log in</button>
                        </>
                    )
                } </ul>
                 </div>
                 <AiOutlineMenu className='md:hidden' onClick={() => handleShowMenu()} />
                
            </div>
            <nav className={`md:hidden ${showShowMenu? ' flex ' : ' hidden '} flex-col absolute
                  top-11 right-0 gap-y-4 p-4 bg-[#005B6B] items-start
                   w-fit text-white z-]-1] border-none outline-none
                   rounded-bl-xl`}>

                    <Link href={'/'} onClick={() => {
                        handleShowMenu()
                        toast.loading('Loading', {
                            id: 'loading',
                            duration: 5000
                        })
                        }}>Home</Link>
                    {
                    session?.user ? (
                        <div>
                        {
                            showDropdown && (
                                <div className='flex flex-col items-start gap-y-4 rounded-md cursor-pointer'>
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
                                        className='border-none text-white rounded-md font-bold font-lg p-0'>
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
                               className='outline-none border-none p-0 text-md text-white text-start'
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
