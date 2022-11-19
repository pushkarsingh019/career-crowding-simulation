import {BrowserRouter, Route, Routes} from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";

// importing screens
import LandingPage from "./Screens/LandingPage";
import Simulation from "./Screens/Simulation";
import Chart from "./Screens/Chart";

// importing config requirements
import {developmentSocket, productionSocket} from "./config/config"
import { useState } from "react";

export default function App(){

  // setting up socket.io-client
  const socket = io.connect(productionSocket, {transports : ['websocket']});
  const [userData, setUserData] = useState({});
  const [careerData, setCareerData] = useState({});

  useEffect(() => {
    socket.on("newChoice", (data) => {
      setCareerData(data);
    })
  }, [socket, careerData])

  socket.on("connect", () => {
    console.log("client connected");
  })

  // reducers
  function handleUserData(data){
    setUserData(data)
  };

  function handleChoiceChange(currentChoice){
    // current choice is a value from 1 to 4.
    console.log("handle choice change");
    socket.emit("choiceChange", currentChoice);
  }



  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage socket={socket} storeData={handleUserData} />} />
        <Route path="/simulation" element={<Simulation socket={socket} userData={userData} careerData={careerData} choiceHandler={handleChoiceChange}  />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </BrowserRouter>
  )
}