import React,{useContext, useRef , useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "./context/notes/noteContext";
import NoteItem from './NoteItem';
import Notemodel from './Notemodel';


const Notes = () => {
  const navigate = useNavigate()
    const context = useContext(noteContext)
    const {note, getNotes, editNote }= context

    const openCloseModel=() => {if(model.current.classList.contains('scale-0')){
      model.current.classList.remove('scale-0')}
    else {model.current.classList.add('scale-0') };}
    useEffect(() => {
      !localStorage.getItem('token')? navigate('/login'):
      getNotes()
       // eslint-disable-next-line
    }, [])
    const model = useRef()
  
    const [notes, setNotes] = useState({id:"", etitle: "", edescription: "",etag: ""});
  
    const submit = (e) => {
      e.preventDefault()
      if (notes.etitle.toString().length <=4){
        return alert('Enter Minimum 5 Character in Title')
      }
      if (notes.edescription.toString().length <= 4){
        return alert('Enter Minimum 5 Character in Description')
      }
      if (notes.etag.toString().length <= 4){
        return alert('Enter Minimum 5 Character in Tag')
      }
      openCloseModel()
      editNote(notes.id, notes.etitle, notes.edescription, notes.etag)
    }
  
  const updateNote = (e) => {
    setNotes( {id:e._id, etitle:e.title, edescription:e.description, etag: e.tag})
    openCloseModel()
    
  }

  const onChange = (e) => {
    
    setNotes({...notes,[e.target.name]:e.target.value})
   
  }

  return (
    
    <div>
      <div>
      <Notemodel submit={submit} model={model} onChange={onChange} notes={notes} />
      </div>
       <div className="">
       <h1 className="text-2xl font-bold">Your Notes</h1>
        {note.map((note)=>{
        return <NoteItem key={note._id} note={note} updateNote={updateNote}/>
        })}
       </div>
    </div>
  )
}

export default Notes
