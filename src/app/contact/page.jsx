import AsideComponent from '@/components/asideComponent/AsideComponent'
import Image from 'next/image'
import React from 'react'
import { TbMessage2 } from 'react-icons/tb'


const Contact = () => {
  return (
    <section className='h-full w-full py-16 mx-auto mt-10  flex md:flex-row flex-col 
        items-center justify-center gap-5
        p-4 bg-[#E3E4E8]'>
    <main className='bg-white shadow-sm rounded-lg'>
      <Image
        src='/img-contact.jpg'
        alt='img-contact'
        width={450}
        height={450}
        className='w-full rounded-t-lg'
      />
      <div className='flex flex-col max-w-[600px] w-full p-6 text-[#777] font-extralight text-sm'>
        <h1 className='font-semibold text-3xl text-[#45c6a6]'>Contact US</h1>
        <p className='mt-4'>Sed ut massa tristique, vehicula tellus in, fringilla ligula. Phasellus dignissim est sed egestas fringilla.
           Vivamus egestas nec dolor vitae egestas. Nulla a ante odio. 
          Vestibulum lobortis tincidunt nulla non varius. Fusce ornare, ante nec ullamcorper scelerisque.
        </p>
        <ul className='list-disc px-10 items-center justify-center py-6'>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
          <li>Integer lorem quam, interdum id nulla vel, varius lacinia metus</li>
          <li>Nunc quis elit scelerisque, dapibus sem et, venenatis nunc</li>
          <li>Proin eu laoreet augue. Aenean at rutrum nibh</li>
        </ul>
        <p>Nullam tristique massa faucibus, sodales sapien ac, tincidunt dolor. Quisque ut lobortis lectus, non suscipit ante.
           Duis lectus metus, consequat vitae ante et, ullamcorper scelerisque nisl.
        </p>

        <form className='flex flex-col gap-2 items-end mt-4'>
                        <input type="email" 
                          placeholder='Your email address' 
                          className='w-full 
                                py-2 px-3 text-lg
                                text-gray-400
                                border border-[#45c6a6]
                                placeholder:text-[#8a888a]'/>
                        <textarea cols="30" rows='3'
                                 className='w-full 
                                py-2 px-3 text-lg
                                max-h-[100px]        
                                text-gray-400
                                border border-[#45c6a6]
                                placeholder:text-[#8a888a]' 
                                placeholder='Message...'/>
                        <button className='flex flex-row border-2 border-[#45c6a6]
                                items-center justify-center font-medium
                                gap-1 text-lg py-2 px-5 w-full md:w-fit 
                                rounded-md text-[#45c6a6]
                                hover:text-white hover:bg-[#45c6a6]
                                ease-in-out duration-1000
                        '>
                           <TbMessage2 size={'1.5rem'} />
                            Send
                        </button>
                    </form>
      </div>
    </main>
    <AsideComponent />      
    </section>
  )
}

export default Contact