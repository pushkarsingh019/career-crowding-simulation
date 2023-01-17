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
import DebreifScreen from "./Screens/DebreifScreen";

// importing onboarding screens
import ChooseScreen from "./Screens/onboarding/ChooseScreen";
import GameExplantion from "./Screens/onboarding/GameExplanation";

// importing notifications library
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// importing config requirements
// eslint-disable-next-line
import { useState } from "react";

import { socketInUse } from "./config/config";

function App(){

  // setting up socket.io-client
  const [userData, setUserData] = useState({});
  const [careerData, setCareerData] = useState({});
  const [currentChoice, setCurrentChoice] = useState();
  const [roundNumber, setRoundNumber] = useState(0);
  const [currentChart, setCurrentChart] = useState();
  const [choicesData, setChoicesData] = useState();
  const [roundState, setRoundState] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const customId = userData.room;
  const socket = io.connect(socketInUse, {transports : ['websocket'], query : "clientId="+customId});
  let errorLogged = false;

  useEffect(() => {
    socket.on("newChoice", (data) => {
      setCareerData(data);
    });
  }, [socket, careerData]);

  useEffect(() => {
    socket.on("roundStatus", (roundData) => {
      setRoundNumber(roundData.number)
      setRoundState(roundData.status)
    })
  }, [socket])

  useEffect(() => {
    async function getChartData(){
      let {data} = await axios.get(`${socketInUse}`);
      setChoicesData(data.data)
    }
    getChartData();
  }, [])

  socket.on("connect", () => {
    console.log("client connected");
    errorLogged = false;
  })

  socket.on("connect_error", (error) => {
    if(!errorLogged){
      showError()
      console.log(error)
      errorLogged = true
    }
    socket.off("connect_error");
  })


  // notification function
 function showError(){
  toast.error('Failed to connect, refresh your page!', {
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
 }

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

  async function submitChoiceHandler(){
    await axios.post(`${socketInUse}`, {roundNumber : roundNumber});
  };

  async function startRoundHandler(){
      await axios.get(`${socketInUse}start`)
  };

  async function clearDatabaseHandler(shouldDelete){
    if(shouldDelete){
      await axios.delete(`${socketInUse}`);
    }
  };

  async function fetchChartHandler(roundNumber){
    let {data} = await axios.get(`${socketInUse}chart/${roundNumber}`);
    setCurrentChart(data.data);
  }

  async function adminAuth(credentials){
    let {data} = await axios.get(`${socketInUse}auth/${credentials.password}/room/${credentials.roomNumber}`)
    if(data.code === 1){
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false)
    }
  }

  return(
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ChooseScreen />} />  
        <Route path="/game" element={<LandingPage storeData={handleUserData} />} />
        <Route path="/game/:roomName" element={<LandingPage storeData={handleUserData} />} />
        <Route path="/simulation" element={<Simulation socket={socket} userData={userData} careerData={careerData} choiceHandler={handleChoiceChange} currentChoice={currentChoice} roundState={roundState} roundNumber={roundNumber} onFetch={fetchChartHandler} currentChart={currentChart} choicesData={choicesData} />} />
        <Route path="/chart" element={<ChartScreen onFetch={fetchChartHandler} currentChart={currentChart} choicesData={choicesData} roundState={roundState} /> } />
        <Route path="/admin" element={<AdminScreen onSubmit={submitChoiceHandler} roundNumber={roundNumber} onDelete={clearDatabaseHandler} onStart={startRoundHandler} roundState={roundState} isAdmin={isAdmin} onLogin={adminAuth} />} />
        <Route path="/choice" element={<ChooseScreen />} />
        <Route path="/explanation" element={<ChooseScreen  />} />
        <Route path="/explanation/:role" element={<GameExplantion storeData={handleUserData} />} />
        <Route path="/explanation/player/:roomName" element={<GameExplantion storeData={handleUserData} />} />
        <Route path="/end" element={<DebreifScreen />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;