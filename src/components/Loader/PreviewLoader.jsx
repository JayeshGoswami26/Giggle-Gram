import LoaderSvg from '../../../public/LoaderSvg.svg'



function PreviewLoader() {
  return (
    <>
    <div className="w-full flex justify-center">
    <img className='w-[4rem] animate-spin ' src={LoaderSvg} alt="" />
    </div>
    </>
  )
}

export default PreviewLoader