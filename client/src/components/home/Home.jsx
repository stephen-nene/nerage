import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import ConfirmImg from "../modal/confirm";

import "../../assets/styles/App.css";

function Home() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

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
      setError('')

      // console.log("Image Path:", response.data);
      setIsOpen(true);
    } catch (error) {
      console.error("Error getting image path:", error);
      if (error.response.data.error) {
        setError(error.response.data.error)
        // message.error(error.response.data.error);
      }
    } finally {
      loadingMessage();
    }
  };

  return (
    <div className="text-center flex flex-col justify-center mt-5">
      <h1>Nerag'e! </h1>
      <h2>The ultimate web scrapping tool</h2>

      <p>To see my true powers enter a weblink below.</p>

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
          placeholder="https://www.youtube.com/"
        />
        <button
          className="border border-rose-300 hover:text-blue-500"
          type="submit"
        >
          Scrape
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}


      <ConfirmImg
        image={image}
        isOpen={isOpen}
        closeModal={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}

export default Home;
