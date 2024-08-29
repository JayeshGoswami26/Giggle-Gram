import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import avatarsImg from "../../public/s-7.jpg";

function PostCard({$id, title, featuredImage , UserName }) {

  
  
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-primaryLight-3 dark:bg-primaryDark-1 shadow-xl border-[0px] border-primaryLight-2 dark:border-primaryDark-4 rounded-[1rem] p-5'>
        <div className="flex items-center gap-3">
              <img className='w-[2rem] rounded-full ' src={avatarsImg} alt="" />
              <h2
              className='text-xl font-bold text-white dark:text-white'
              >{UserName} </h2>
            </div>
            <div className='w-full justify-center my-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='object-cover rounded-xl w-[20rem]' />
            </div>
           
            <div className="pt-2 text-lg font-bold text-primaryLight-1 dark:text-primaryDark-4">
              {title}
            </div>
        </div>
    </Link>
  )
}


export default PostCard