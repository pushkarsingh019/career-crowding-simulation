import {BrowserRouter, Route, Routes} from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";
import axios from "axios"

// importing screens
import LandingPage from "./Screens/LandingPage";
import Simulation from "./Screens/Simulation";
import AdminScreen from "./Screens/AdminScreen";
import ChartScreen from "./Screens/Chart";

// importing config requirements
import {developmentSocket, productionSocket} from "./config/config"
import { useState } from "react";

export default function App(){

  const origin = developmentSocket;
  // setting up socket.io-client
  const socket = io.connect(origin, {transports : ['websocket']});
  const [userData, setUserData] = useState({});
  const [careerData, setCareerData] = useState({});
  const [currentChoice, setCurrentChoice] = useState();
  const [roundNumber, setRoundNumber] = useState(0);

  useEffect(() => {
    socket.on("newChoice", (data) => {
      console.log("recieved new data");
      console.log(data);
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

  function handleNewChoice(userChoice){

    let choiceData = {};

    if(currentChoice){
      choiceData["add"] = userChoice;
      choiceData["subtract"] = currentChoice; 
      setCurrentChoice(userChoice);
    }
    else{
      choiceData["add"] = userChoice;
      setCurrentChoice(userChoice);
    }

    return choiceData;
  }

  function handleChoiceChange(userChoice){
    // current choice is a value from 1 to 4.
    let dataToSend = handleNewChoice(userChoice);
    socket.emit("choiceChange", dataToSend);
  };

  async function submitChoiceHandler(submit){
    if(submit){
      await axios.post(`${origin}`, {roundNumber : roundNumber});
    }
    setRoundNumber(roundNumber + 1);
  };

  async function clearDatabaseHandler(shouldDelete){
    if(shouldDelete){
      await axios.delete(`${origin}`);
    }
    setRoundNumber(0);
  }



  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage socket={socket} storeData={handleUserData} />} />
        <Route path="/simulation" element={<Simulation socket={socket} userData={userData} careerData={careerData} choiceHandler={handleChoiceChange} currentChoice={currentChoice}  />} />
        <Route path="/chart" element={<ChartScreen />} />
        <Route path="/admin" element={<AdminScreen onSubmit={submitChoiceHandler} roundNumber={roundNumber} onDelete={clearDatabaseHandler} />} />
      </Routes>
    </BrowserRouter>
  )
}