import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import avatarsImg from "../../public/s-7.jpg";

function PostCard({$id, title, featuredImage}) {

  // console.log( `This is id ${$id} :: This is title ${title} :: This is Featured Image ${featuredImage} ` )
  
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-primaryLight-3 dark:bg-primaryDark-1 shadow-xl border-[0px] border-primaryLight-2 dark:border-primaryDark-4 rounded-[1rem] p-5'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl w-[20rem]' />
            </div>
            <div className="flex items-center gap-3">
              <img className='w-[2rem] rounded-full ' src={avatarsImg} alt="" />
              <h2
              className='text-xl font-bold text-white dark:text-primaryDark-4'
              >{title}</h2>
            </div>
        </div>
    </Link>
  )
}


export default PostCard