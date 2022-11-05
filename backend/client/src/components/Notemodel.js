

import React from 'react'
import { RiCloseLine } from 'react-icons/ri';

const Notemodel = ({ model, onChange, notes, submit}) => {
   
const closeModel = (e) => {
    if(model.current.classList.contains('model')){
        model.current.classList.add('hidden')
     setTimeout(() => {
      model.current.classList.remove('hidden')
      model.current.classList.add('scale-0')
    }, 100)
  }

}

  return (
    <div tabIndex={-1}  ref={model} className="model fixed top-0  left-0 w-full h-full z-[1] scale-0 transition-all ">
        <div className="bg-black absolute top-0 left-0 w-full h-full opacity-30"></div>
     <div  className=' absolute left-[5%] sm:left-[15%]  top-[10%] w-[90%] sm:w-[70%] h-fit bg-white  z-[2] border border-black shadow-lg'>
       <div  className="mt-5">
        <h2 className='font-bold ml-8 mb'>Edit Note</h2>
        <RiCloseLine onClick={closeModel} className='absolute right-2 top-2 cursor-pointer text-2xl'/>
       <form className="my-3 font-bold mx-8 ">
            <label htmlFor="etitle">Title</label><br />
            <input type="text" name="etitle" id="etitle" className="border-2 rounded-md my-1 w-full indent-1 font-normal" value={notes.etitle} onChange={onChange}/><br />
            <label htmlFor="edescription">Description</label><br />
            <input type="text" name="edescription" id="edescription" className="border-2 rounded-md my-1 w-full indent-1 font-normal" value={notes.edescription} onChange={onChange}/><br /> 
            <label htmlFor="etag">Tag</label><br />
            <input type="text" name="etag" id="etag" className="border-2 rounded-md my-1 w-full indent-1 font-normal" value={notes.etag} onChange={onChange} />

            <button className=" bg-cyan-300 font-bold my-4 px-3 py-1" onClick={submit} >Update Note</button>
        </form>
       </div>
     </div>
    </div>
  )
}

export default Notemodel
