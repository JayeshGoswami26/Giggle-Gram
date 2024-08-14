import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='rounded-[3rem] px-10 py-5 border-2 border-primaryLight-4 dark:border-primaryDark-4 bg-primaryLight-2 text-primaryLight-4 font-bold dark:bg-primaryDark-3 dark:text-white '
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn