import React from 'react'
import {motion} from 'framer-motion'

function ConformPopUp({ handelPopUp , deletePost}) {
  return (
    <>
    <motion.div className="absolute rounded-[1.75rem] bg-primaryLight-3 shadow-2xl dark:bg-primaryDark-3 border-2 border-primaryLight-1 dark:border-primaryDark-4 w-[95%] xl:w-[50rem] md:w-[30rem] h-[20rem] z-20 md:top-[50%] top-[60%] left-[50%] -translate-y-1/2 -translate-x-1/2  flex justify-center items-center text-white ">
        <div className="flex flex-col justify-center items-center p-2">
            <h1 className='text-3xl font-bold'> Confirm Post Delete </h1>
            <p className='text-center text-primaryLight-1 dark:text-primaryDark-4/90 '>Are you sure you want to remove this Post? This action cannot be undone.</p>

            <div className="flex gap-5 mt-10">
                <button onClick={handelPopUp}> Cancel </button>
                <button onClick={deletePost} className='bg-red-600'> Delete </button>
            </div>
        </div>
    </motion.div>
    </>
    )
}

export default ConformPopUp