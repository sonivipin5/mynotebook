/* eslint-disable jsx-a11y/anchor-is-valid */
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React,{ useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {CgLogIn, CgLogOut} from 'react-icons/cg'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineUserAdd} from 'react-icons/ai'

const  style ={
  header: 'w-full absolute top-0 h-16 flex bg-cyan-300 py-4 transition-all min-w-[320px] ',
  nav:'sm:space-x-5 space-y-4 sm:space-y-0 flex w-full sm:w-1/4 flex-col sm:flex-row  mt-16 sm:mt-0  items-center text-lg font-bold text-gray-500 overflow-hidden transition-all ',
  loginSignup:"sm:space-x-2 space-y-4 sm:space-y-0 mt-[2px] sm:absolute  sm:flex-row flex flex-col justify-center items-center sm:right-5 text-lg font-bold text-gray-500",
  logout:"sm:space-x-2 mt-[2px] sm:absolute flex items-center right-5 text-lg font-bold text-gray-500",
}

const Navbar = ({title}) => {
    let location = useLocation();
    const headerRef = useRef()
 
    const logout = () => {
      toast.success('User Logout')
     
        localStorage.removeItem('token')
        
     

    }

    const hambargar = () => {
      if(headerRef.current.classList.contains('h-16')) {
        headerRef.current.classList.replace('h-16', 'h-72')
      } else if(headerRef.current.classList.contains('h-72')){
        headerRef.current.classList.replace('h-72', 'h-16')
      }
    }
    
    const closeNav = () => {
      if(headerRef.current.classList.contains('h-72')){
        headerRef.current.classList.replace('h-72', 'h-16')
      }
    }
    
  return (
    <div>
      <header ref={headerRef} className={style.header}>
      <ToastContainer theme="light" position="top-center" autoClose={1000} />
        <div className="logo text-2xl mx-10 font-bold absolute sm:relative "><Link to="/" >{title}</Link></div>
        <div onClick={hambargar}><GiHamburgerMenu className='sm:hidden text-3xl absolute right-8 cursor-pointer '/> </div>
        <nav className={style.nav}>
          <div className=' flex flex-col sm:flex-row sm:space-x-5 items-center '>

            <Link onClick={closeNav} className={`${location.pathname==='/'?'text-black':''}`}  to="/">Home</Link>
            <Link onClick={closeNav} className={`${location.pathname==='/about'?'text-black':''}`}  to="/about">About</Link>
            
            {
            //if not Login User
            !localStorage.getItem('token')? (<div className={style.loginSignup}>
            <Link  onClick={closeNav}  className={`${location.pathname==='/login'&&'text-black'} `}  to="/login">Login <CgLogIn className='inline-block text-xl'/></Link>
            <Link  onClick={closeNav}  className={`${location.pathname==='/signup'&&'text-black'}`}  to="/signup">SignUp <AiOutlineUserAdd className='inline-block text-xl'/></Link>
            </div>):
            // if User Logged in
            (<div onClick={closeNav} className={style.logout}>
            <Link onClick={logout} className={`${location.pathname==='/login'&&'text-black'} `}  to="/login">Logout <CgLogOut className='inline-block text-xl'/></Link>
           
            </div>)
            }
           
          </div>
            </nav>
      </header>
      
    </div>
  )
}

export default Navbar
