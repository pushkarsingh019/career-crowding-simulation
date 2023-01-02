import {BrowserRouter, Route, Routes} from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";
import axios from "axios"

// importing screens
import LandingPage from "./Screens/LandingPage";
import Simulation from "./Screens/Simulation";
import AdminScreen from "./Screens/AdminScreen";
import ChartScreen from "./Screens/Chart";
import ErrorPage from "./Screens/ErrorPage";

// importing onboarding screens
import ChooseScreen from "./Screens/onboarding/ChooseScreen";
import GameExplantion from "./Screens/onboarding/GameExplanation";

// importing config requirements
import {developmentSocket, productionSocket} from "./config/config"
import { useState } from "react";

export const origin = developmentSocket

function App(){

  console.log(productionSocket)
  // setting up socket.io-client
  const socket = io.connect(origin, {transports : ['websocket']});
  const [userData, setUserData] = useState({});
  const [careerData, setCareerData] = useState({});
  const [currentChoice, setCurrentChoice] = useState();
  const [roundNumber, setRoundNumber] = useState(1);
  const [currentChart, setCurrentChart] = useState();
  const [choicesData, setChoicesData] = useState();
  const [roundState, setRoundState] = useState();

  useEffect(() => {
    socket.on("newChoice", (data) => {
      setCareerData(data);
    });
  }, [socket, careerData])

  useEffect(() => {
    async function getChartData(){
      let {data} = await axios.get(`${origin}`);
      setChoicesData(data.data)
    }
    getChartData();
  }, [])

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
    setRoundState(false)
    if(submit){
      await axios.post(`${origin}`, {roundNumber : roundNumber});
    }
  };

  async function startRoundHandler(){
    setRoundNumber(roundNumber + 1);
    setRoundState(true)
  }

  async function clearDatabaseHandler(shouldDelete){
    if(shouldDelete){
      await axios.delete(`${origin}`);
    }
    setRoundNumber(1);
  };

  async function fetchChartHandler(roundNumber){
    let {data} = await axios.get(`${origin}chart/${roundNumber}`);
    setCurrentChart(data.data);
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChooseScreen />} />  
        <Route path="/game" element={<LandingPage storeData={handleUserData} />} />
        <Route path="/game/:roomName" element={<LandingPage storeData={handleUserData} />} />
        <Route path="/simulation" element={<Simulation socket={socket} userData={userData} careerData={careerData} choiceHandler={handleChoiceChange} currentChoice={currentChoice} />} />
        <Route path="/chart" element={<ChartScreen onFetch={fetchChartHandler} currentChart={currentChart} choicesData={choicesData} /> } />
        <Route path="/admin" element={<AdminScreen onSubmit={submitChoiceHandler} roundNumber={roundNumber} onDelete={clearDatabaseHandler} onStart={startRoundHandler} roundState={roundState} />} />
        <Route path="/choice" element={<ChooseScreen />} />
        <Route path="/explanation" element={<ChooseScreen  />} />
        <Route path="/explanation/:role" element={<GameExplantion storeData={handleUserData} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;