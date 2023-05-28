'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineFileImage } from 'react-icons/ai';
import { CircleLoader } from 'react-spinners';
const EditBlog = (ctx) => {
  const {data: session} = useSession();
  const router = useRouter();
  
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState("")
  const [summary, setSummary] = useState('')
  const [caption, setCaption] = useState('')
  const [photo, setPhoto] = useState('')
  const [loading, setLoading] = useState(false)
  
  const [blog, setBlog] = useState('');
  useEffect(() => {
    async function fetchBlog() {
        setLoading(true);

        const res = await fetch(`/api/blog/${ctx.params.id}`, {
            method: 'GET',
        })

        if(res.ok){
           const xxx = await res.json();
           console.log(xxx);
            setBlog(xxx);
            console.log(await blog);

    
            console.log('Fetched all', blog); 
        }
        setLoading(false);

      }
        fetchBlog();
  }, []);


  useEffect(() => {
    setTitle(blog.title);
    setDesc(blog.desc);
    setCategory(blog.category);
    setSummary(blog.summary);
    setCaption(blog.caption);
  }, [blog])
  

  const handleUpdate = async (e) => {
    e.preventDefault()

    if(title === '' || category === '' || desc === ''){
        toast.error("All fields are required")
        return
    }

    try {
        let imageUrl = null
        if(photo){
            imageUrl = await uploadImage()
        }

        const body = {
            title, 
            desc, 
            category,
            summary,
            caption,
        }

        if(imageUrl != null){
            body.imgUrl = imageUrl
        }
        
        console.log('img',body)
        
        const res = await fetch(`/api/blog/${ctx.params.id}`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${session?.user?.accessToken}`
            },
            method: "PUT",
            body: JSON.stringify(body)
        })

        if(res.ok){
            const blog = await res.json()

            toast.success('Blog Updated Successfully')
            router.push(`/blog/${blog._id}`)
        }

        
    } catch (error) {
        console.log(error)
    }
}

const uploadImage = async () => {
    if (!photo) return

    const formData = new FormData()

    formData.append("file", photo)
    formData.append("upload_preset", UPLOAD_PRESET)

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
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
    <section className='grid place-items-center min-h-screen'>
        {loading ? ( 
            <div className='flex items-center justify-center mt-16'>
                    <CircleLoader size={150} color='#005B6B' />
                </div>
        ) : (
        <form onSubmit={
                e => handleUpdate(e)
            }
                className='flex flex-col grow-1 gap-5 shadow-md py-5 px-5 rounded-xl 
                w-fit items-start mt-20'
            >
                <h2 className='font-extrabold text-3xl mb-2 text-[#55B1DF]'>Update Post</h2>
                <label className='flex flex-col gap-1 w-full'>
                    <h1 className='text-md font-bold'>Title:</h1>
                <input type="text" placeholder='Title'
                    value={title}
                    onChange={
                        e => setTitle(e.target.value)
                    }
                    className=' rounded-md py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none' 
                />
                </label>
                <label className='flex flex-col gap-1 w-full'>
                    <h1 className='text-md font-bold'>Summary:</h1>
                <input type="text" placeholder='Summary'
                    value={summary}
                    onChange={
                        e => setSummary(e.target.value)
                    }
                    className=' rounded-md py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none' 
                />
                </label>
                <label className='flex flex-col gap-1 w-full'>
                    <h1 className='text-md font-bold'>Caption:</h1>
                <input type="text" placeholder='Caption'
                    value={caption}
                    onChange={
                        e => setCaption(e.target.value)
                    }
                    className=' rounded-md py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none' 
                />
                </label>
                <label className='flex flex-col gap-1 w-full'>
                    <h1 className='text-md font-bold'>Body Text:</h1>
                <textarea type="text" placeholder='Body'
                value={desc}
                    onChange={
                        e => setDesc(e.target.value)
                    }
                    className=' rounded-md py-2 px-5 border border-[#ccc]
                    hover:border-[#55B1DF] outline-none w-full' 
                />
                </label>
                <label className='flex flex-col gap-1 w-full'>
                <h1 className='text-md font-bold'>Category:</h1>
                <select value={category}
                     className=' rounded-md py-2 px-5 border border-[#ccc]
                     hover:border-[#55B1DF] outline-none cursor-pointer w-full' 
                    onChange={
                        e => setCategory(e.target.value)
                }>
                    <option value="Nature">Nature</option>
                    <option value="Tech">Tech</option>
                    <option value="Food">Food</option>
                    <option value="Gym">Gym</option>
                    <option value="Health">Health</option>
                </select>
                </label>
                <label
                     htmlFor="image" 
                    className='flex items-center gap-1 bg-[#55B1DF] rounded-md py-2 px-4
                    text-white font-bold text-sm  border border-sky-500 justify-center
                    hover:text-[#55B1DF] hover:bg-white cursor-pointer w-full '
                >
                    Change Image
                    <AiOutlineFileImage />
                </label>
                
                <input id='image' type="file" className='hidden'
                    onChange={
                        e => setPhoto(e.target.files[0])
                    }/>
                <button 
                    type='submit'
                    className='bg-[#55B1DF] rounded-md py-2 px-8
                 text-white font-bold text-sm  border border-sky-500
                 hover:text-[#55B1DF] hover:bg-white w-full'
                >Update Blog</button>
            </form>
        )
        }
        </section>
  )
}

export default EditBlog