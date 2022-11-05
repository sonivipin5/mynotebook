import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { CgLogIn } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({email:"", password:""});
    const navigate = useNavigate()
    const OnChange = (e) => {
       setCredentials({...credentials, [e.target.name]:e.target.value})
      }
    const submit = async(e) => {
        e.preventDefault()
        let response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const json = await response.json()
         
          if(json.authtoken){
            // redirect
            toast.success('User Logged In');
            localStorage.setItem("token", json.authtoken)
              setTimeout(() => {
                navigate('/')
              }, 1000)
              
          } else{
           toast.error('Invalid Credential');
          }
       
      }
  return (
    <div className=" flex items-center justify-center mt-20">
      <ToastContainer theme="light" position="top-center" />
      <div className="w-3/4 my-2">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={submit} action='/login' method='POST' className="my-3 border text-xl border-black p-10 rounded-md">
            <label htmlFor="email">Enter Email</label><br />
            <input type="email" name="email" id="email" autoComplete='email' className="p-1 mb-3 border border-gray-400 outline-none rounded-md my-1 w-full indent-1 font-normal" onChange={OnChange} /><br />

            <label htmlFor="password">Enter Password</label><br />
            <input type="password" name="password" id="password" autoComplete='password' className="p-1 mb-3 border border-gray-400 outline-none rounded-md my-1 w-full indent-1 font-normal" onChange={OnChange} /><br />

            <button className=" bg-cyan-300 font-bold my-4 px-3 py-1" >Log In <CgLogIn className='mb-[2px] inline-block'/> </button>
        </form>
       
            
      </div>
    </div>
  )
}

export default Login
