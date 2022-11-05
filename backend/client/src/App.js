import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import NoteState from "./components/context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";


const App = () => {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar title={"MyBook"} />
          <div className="container m-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
};

export default App;
