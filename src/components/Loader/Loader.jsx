import LoaderSvg from '../../../public/LoaderSvg.svg'
function Loader() {
  return (
    <div className='MainLoader fixed top-0 left-0 w-screen h-screen flex gap-5 justify-center items-center bg-primaryLight-1 dark:bg-primaryDark-1 '>
      <img className="w-20 h-20 animate-spin" src={LoaderSvg} alt="Loading icon" />
      <h1 className='text-primaryLight-4 dark:text-white font-bold  '>Loading....</h1>
    </div>
  )
}

export default Loader