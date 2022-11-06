/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'https://vipmynotebook.herokuapp.com';

  const notes = [];
  const [note, setNote] = useState(notes);

  // GET ALL NOTES
  const getNotes = async () => {
    let response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const json = await response.json();
    setNote(json);
  };

  //   Add a note
  const addNote = async (title, description, tag) => {
    let response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description,  tag}),
    });

    const json = await response.json()
    setNote(note.concat(json));
  };

  //  delete a note
  const deleteNote = async (id) => {
    // API CALL
    
    if(confirm("Do you want to delete this note")){

  
    try {
      let response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify(),
      });
  
      
      const newNotes = note.filter((note) => {
        return note._id !== id;
      });
      setNote(newNotes);
      toast.success('Note Deleted Successfully')
    } catch (error) {
      let someError = error
     
    }
  }
  };

  //  edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    let response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description,  tag }),
    });
    const json = await response.json()

    // Logic Edit Note for client
    let newNotes = JSON.parse(JSON.stringify(note))
  
    for (let i = 0; i < newNotes.length; i++) {
      const e = newNotes[i];
      if (e._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
      break;
      }
    }
    setNote(newNotes);
    toast.success('Note Update')
  };
  return (
    <NoteContext.Provider value={{ note, addNote, deleteNote, editNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
