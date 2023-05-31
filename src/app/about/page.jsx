import AsideComponent from '@/components/asideComponent/AsideComponent'
import Image from 'next/image'
import React from 'react'


const About = () => {
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
        <h1 className='font-semibold text-3xl text-[#45c6a6]'>About US</h1>
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
      </div>
    </main>
    <AsideComponent />      
    </section>
  )
}

export default About