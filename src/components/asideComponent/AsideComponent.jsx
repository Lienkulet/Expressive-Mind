import React from 'react'
import Socials from '../socials/Socials'
import Topics from '../topics/Topics'

const AsideComponent = () => {
  return (
    <aside className='flex flex-col shadow-md h-fit bg-white'>
            <Topics />
            <Socials />
          </aside>
  )
}

export default AsideComponent