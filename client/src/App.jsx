import React, { useState } from "react";
import { Link } from "react-router-dom";
import Betika from "./assets/Betika.png";
import sportpesa from "./assets/sportpesa.webp";
import Bet22 from "./assets/22bet.jpg";
import axios from "axios";
import {message} from 'antd'
import ConfirmImg from "./modal/confirm";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(""); 


   // New function to get image path from the backend
   const getImagePath= async (link)=>{
    try {
      // Show loading message
      const loadingMessage = message.loading('Capturing screenshot...', 0);
  
      const response = await axios.post("http://localhost:3000/api/screenshot", { url: link });
  
      // Hide loading message and show success message
      loadingMessage();
      message.success('Screenshot captured successfully');
      setImage(response.data.imgUrl); // Set the image state to the screenshotPath from the response
  
      // const { imgUrl } = response.data; // Extract screenshotPath from the response
  // setImage(imgUrl)
      console.log("Image Path:", response.data);
      setIsOpen(true); // Assuming setIsOpen is a state updater function

    } catch (error) {
      console.error("Error getting image path:", error);
  
      // Hide loading message and show error message
      message.error('Error capturing screenshot');
    }
   }



  return (
    <div className="container">
      <h1>Welcome to Nerag'e!</h1>

      <div className="row">
        {/* Add onClick handlers to trigger the getImagePath function for each link */}
        <Link onClick={() => getImagePath("https://www.ke.sportpesa.com/en/sports-betting/football-1/")}>
          <img src={sportpesa} className="logo tauri" alt="Tauri logo" />
        </Link>
        <Link onClick={() => getImagePath("https://www.betika.com/en-ke/")}>
          <img src={Betika} className="logo react" alt="React logo" />
        </Link>
        <Link onClick={() => getImagePath("https://22bet.co.ke/")}>
          <img src={Bet22} className="logo vite" alt="Vite logo" />
        </Link>
      </div>


      <p>Select a logo to view latest page.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          getImagePath(name);
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a link to scrap..."
        />
        <button type="submit">Scrap</button>
      </form>

      <ConfirmImg image={image} isOpen={isOpen} closeModal={()=>setIsOpen(!isOpen)}/>
    </div>
  );
}

export default App;
