/* eslint-disable no-unused-vars */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React,{useContext} from 'react'
import { useState } from 'react';
import noteContext from "./context/notes/noteContext";
import Notes from "./Notes";

const Home = () => {   
    const context = useContext(noteContext)
    const {addNote}= context
    
    const [note, setNote] = useState({title:'', description: '',tag:''});
    const handleChange = (e) => {
      setNote({...note,[e.target.name]:e.target.value})
    }
    

    const submit = (e) => {
      e.preventDefault()
      if (note.title.toString().length <=4){
        return alert('Enter Minimum 5 Character in Title')
      }
      if (note.description.toString().length <= 4){
        return alert('Enter Minimum 5 Character in Description')
      }
      if (note.tag.toString().length <= 5){
        return alert('Enter Minimum 5 Character in Tag')
      }
      addNote(note.title, note.description, note.tag)
      setNote({title:'', description: '',tag:''})
      toast.success('Note add Successfully')
    }
    
  return (
    <div className=" flex items-center justify-center mt-20">
      <ToastContainer theme="light" position="top-center" autoClose={1000}/>
      <div className="w-3/4 my-2">
        <h1 className="text-2xl font-bold">Add A Note</h1>
        <form action='/' method='POST' className="my-3 font-bold ">
            <label htmlFor="title">Title</label><br />
            <input type="text" name="title" id="title" className="border-2 rounded-md my-1 w-full indent-1 font-normal" onChange={handleChange} value={note.title}/><br />
            <label htmlFor="description">Description</label><br />
            <input type="text" name="description" id="description" className="border-2 rounded-md my-1 w-full indent-1 font-normal" onChange={handleChange} value={note.description}/><br />
            <label htmlFor="tag">Tag</label><br />
            <input type="text" name="tag" id="tag" className="border-2 rounded-md my-1 w-full indent-1 font-normal" onChange={handleChange} value={note.tag} />

            <button className=" bg-cyan-300 font-bold my-4 px-3 py-1" onClick={submit}>Add Note</button>
        </form>
       
            <Notes/>
      </div>
    </div> 
  ); 
};

export default Home;
