import React from "react";

function ErrorPopUp({ ErrorHeading , ErrorSubHeading , Okay }) {
  return (
    <>
      <div className="absolute rounded-[1.75rem] bg-primaryLight-3 shadow-2xl dark:bg-primaryDark-3 border-2 border-primaryLight-1 dark:border-primaryDark-4 w-[95%] xl:w-[30rem] md:w-[30rem] h-[20rem] z-20 md:top-[50%] top-[60%] left-[50%] -translate-y-1/2 -translate-x-1/2  flex justify-center items-center text-white ">
      <div className="flex flex-col justify-center items-center p-2">
            <h1 className='text-3xl font-bold'> {ErrorHeading} </h1>
            <p className='text-center text-primaryLight-1 dark:text-primaryDark-4/90 '> {ErrorSubHeading} </p>

            <div className="flex gap-5 mt-10">
                {/* <button className="bg-primaryLight-4" onClick={Cancel}> Cancel </button> */}
                <button className="bg-primaryLight-4 dark:bg-primaryDark-2" onClick={Okay}> Okay </button>
            </div>
        </div>
      </div>
      <div className="absolute w-screen h-screen bg-black/50 top-0 left-0 z-10"></div>
    </>
  );
}

export default ErrorPopUp;
