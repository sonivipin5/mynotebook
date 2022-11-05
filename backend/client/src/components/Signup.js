import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cPassword:""});
  
    const navigate = useNavigate()
   
    const submit = async(e) => {
      e.preventDefault()
      if(credentials.password !== credentials.cPassword ){
        toast.error('Password Not Match')
        return
      }
      const {name, email, password} = credentials;
        let response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: name, email:email, password:password}),
          });
          const json = await response.json()
          
          if(json.authtoken){
            toast.success('SingUp Successful')
            // redirect
            localStorage.setItem("JWT", json.authtoken)
            setTimeout(() => {
              navigate('/')
              
            }, 1000);
          } else{
            console.log('Invalid Credential');
          }
       
      }
      const OnChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value})
        console.log(credentials)
      }
      const input ="mb-3 border border-gray-400 outline-none rounded-md my-1 w-full indent-1 font-normal"
  return (
    <div className=" flex items-center justify-center mt-20">
    <ToastContainer theme="light" position="top-center" />
      <div className="w-3/4 my-2 ">
        <h1 className="text-2xl font-bold mb-10">Sign Up</h1>
        <form onSubmit={submit}  className="my-3 text-xl border border-black p-10 rounded-md">
            <label htmlFor="name">Enter Your Name</label><br />
            <input minLength={3} required type="text" name="name" id="name" className={input} onChange={OnChange} /><br />
            
            <label htmlFor="email">Enter Your Email</label><br />
            <input  required type="email" name="email" id="email" className={input} onChange={OnChange} /><br />

            <label htmlFor="password">Enter Your Password</label><br />
            <input minLength={5} required type="password" name="password" id="password" className={input} onChange={OnChange} /><br />

            <label htmlFor="cPassword">Confirm Password</label><br />
            <input minLength={5} required type="password" name="cPassword" id="cPassword" className={input} onChange={OnChange} /><br />

            <button className=" bg-cyan-300 font-bold my-4 px-3 py-1" >Create Account <AiOutlineUserAdd className='inline-block mb-[2px] text-xl'/></button>
        </form>
       
            
      </div>
    </div>
  )
}

export default Signup
