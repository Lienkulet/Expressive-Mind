'use client' 
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react'
import {AiOutlineFileImage} from 'react-icons/ai'
import {toast} from 'react-toastify';

const CreateBlog = () => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState("Nature")
    const [photo, setPhoto] = useState('')
    const [summary, setSummary] = useState('')
    const [caption, setCaption] = useState('')

    const {data: session, status} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session) {
          router.push('/');
        }
      }, [session, router]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!photo || !title || !category || !desc || !summary || !caption) {
            toast.error("All fields are required")
            return
        }

        try {
            const imageUrl = await uploadImage()

            const res = await fetch(`/api/blog`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${
                        session ?. user ?. accessToken
                    }`
                },
                method: 'POST',
                body: JSON.stringify(
                    {
                        title,
                        summary,
                        caption,
                        desc,
                        category,
                        imageUrl,
                        authorId: session?.user?. _id
                    }
                )
            })

            if (!res.ok) {
                throw new Error("Error occured")
            }

            const blog = await res.json()

            router.push(`/blog/${
                blog ?. _id
            }`)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async () => {
        if (!photo) 
            return

        
        const formData = new FormData()

        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?upload_preset=${UPLOAD_PRESET}`,
             {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            const imageUrl = data['secure_url']

            return imageUrl
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='min-h-screen grid place-items-center'>
            <form onSubmit={
                e => handleSubmit(e)
            }
                className='flex flex-col grow-1 gap-5 shadow-md py-5 px-5 rounded-xl 
                w-fit items-start mt-20'
            >
                <h2 className='font-extrabold text-3xl mb-2 text-[#55B1DF]'>Create Post</h2>
                <input type="text" placeholder='Title'
                    onChange={
                        e => setTitle(e.target.value)
                    }
                    className=' rounded-2xl py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none' 
                />
                <input type="text" placeholder='Summary'
                    onChange={
                        e => setSummary(e.target.value)
                    }
                    className=' rounded-2xl py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none' 
                />
                <input type="text" placeholder='Caption'
                    onChange={
                        e => setCaption(e.target.value)
                    }
                    className=' rounded-2xl py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none' 
                />
                <textarea type="text" placeholder='Body'
                    onChange={
                        e => setDesc(e.target.value)
                    }
                    className=' rounded-2xl py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none w-full' 
                />
                <select value={category}
                     className=' rounded-2xl py-2 px-5 border border-[#ccc]
                     hover:border-[#55B1DF] outline-none cursor-pointer' 
                    onChange={
                        e => setCategory(e.target.value)
                }>
                    <option value="Nature">Nature</option>
                    <option value="Tech">Tech</option>
                    <option value="Food">Food</option>
                    <option value="Gym">Gym</option>
                    <option value="Health">Health</option>
                </select>
                <label
                     htmlFor="image" 
                    className='flex items-center gap-1 bg-[#55B1DF] rounded-2xl py-2 px-4
                    text-white font-bold text-sm  border border-sky-500
                    hover:text-[#55B1DF] hover:bg-white cursor-pointer'
                >
                    Upload Image
                    <AiOutlineFileImage className='' />
                </label>
                <input id='image' type="file" className='hidden'
                    onChange={
                        e => setPhoto(e.target.files[0])
                    }/>
                <button 
                    type='submit'
                    className='bg-[#55B1DF] rounded-2xl py-2 px-8
                 text-white font-bold text-sm  border border-sky-500
                 hover:text-[#55B1DF] hover:bg-white'
                >Create Blog</button>
            </form>
        </section>
    )
}

export default CreateBlog
