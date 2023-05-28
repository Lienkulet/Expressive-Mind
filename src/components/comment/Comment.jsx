import React from 'react'
import { VscAccount } from 'react-icons/vsc'
import { format } from 'timeago.js'

const Comment = ({comment: { authorId, createdAt, title, text }}) => {
  return (
    <section className='flex flex-col border-2 p-2 w-full h-fit rounded-md'>
      <header className='flex flex-row items-center gap-2'>
        <VscAccount size={'2rem'} />
        <div className='flex flex-col'>
        <span className='font-bold text-md'>
          {authorId.username}
        </span>
        <time className='text-sm'>{format(createdAt)}</time>
        </div>
    </header>
    <main className='flex flex-col p-2'>
        <h3 className='font-bold text-md'>
            {title}
        </h3>
        <p>
            {text}
        </p>
    </main>
    </section>
  )
}

export default Comment