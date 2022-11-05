/* eslint-disable no-unused-expressions */
import React,{useContext} from "react";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin4Fill } from "react-icons/ri";
import noteContext from "./context/notes/noteContext";

const NoteItem = ({ note, updateNote }) => {
  const{deleteNote}= useContext(noteContext)
 
  return (
    <div key={note._id} className="border w-full sm:w-[30%] min-w-[200px] m-4 inline-block ">
      <div className="m-3 flex flex-col sm:block ">
        <div className="flex justify-between">
          <h3 className="w-[70%] font-bold">{note.title}</h3>
          <div className=" w-[50px] space-x-3">
          
          <TbEdit onClick={()=>{updateNote(note)}} className="cursor-pointer inline-block text-green-800 " />
          <RiDeleteBin4Fill onClick={()=>{deleteNote(note._id)}} className="cursor-pointer inline-block text-red-600 "/>
          </div>
        </div>
        <p>{note.description}</p>
        <p>{note.tag}</p>
      </div>
    </div>
  );
};

export default NoteItem;
