import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

import Navbar from "./components/Navbar";
import ConfirmImg from "./components/modal/confirm";

import Home from "./components/home/Home";
import Odds from "./components/odds/Odds";
import ContactUs from "./components/ContactUs";
import NotFound from "./components/NotFound";
import CommingSoon from "./components/CommingSoon";


import "./assets/styles/App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // New function to get image path from the backend
  const getImagePath = async (link) => {
    const loadingMessage = message.loading("Capturing screenshot...", 0);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/screenshot",
        { url: link }
      );
      loadingMessage();
      message.success("Screenshot captured successfully");
      setImage(response.data.imgUrl);

      // console.log("Image Path:", response.data);
      setIsOpen(true);
    } catch (error) {
      console.error("Error getting image path:", error);
      if (error.response.data.error) {
        message.error(error.response.data.error);
      }
    } finally {
      loadingMessage();
    }
  };

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <div className="">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/*" element={<NotFound/>} />
          <Route path="/login" element={<CommingSoon/>} />
          <Route path="/contactus" element={<ContactUs/>} />

          <Route path="/odds" element={<Odds/>} />
        </Routes>


      </div>
    </>
  );
}

export default App;
