import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";
import axios from "axios";
import React from "react";

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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";

// importing config requirements
// eslint-disable-next-line
import { useState } from "react";

import { socketInUse } from "./config/config";

function App() {
  // setting up socket.io-client
  const [userData, setUserData] = useState({});
  const [careerData, setCareerData] = useState({});
  const [currentChoice, setCurrentChoice] = useState();
  const [roundNumber, setRoundNumber] = useState(0);
  const [currentChart, setCurrentChart] = useState();
  const [choicesData, setChoicesData] = useState();
  const [roundState, setRoundState] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isChart, setIsChart] = useState(false);
  const customId = userData.room;
  const socket = io.connect(socketInUse, {
    transports: ["websocket"],
    query: "clientId=" + customId,
  });

  const toastId = React.useRef(null);

  useEffect(() => {
    socket.on("newChoice", (data) => {
      setCareerData(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("roundStatus", (roundData) => {
      setRoundState(roundData.status);
      setRoundNumber(roundData.number);
    });
    // return () => {
    //   socket.off("roundStatus");
    // };
  }, [socket]);

  useEffect(() => {
    socket.on("newPlayer", (data) => {
      showInfo(data.playerName);
    });

    return () => {
      socket.off("newPlayer");
    };
  }, [socket]);

  useEffect(() => {
    async function getChartData() {
      let { data } = await axios.get(`${socketInUse}`);
      setChoicesData(data.data);
    }
    getChartData();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("client connected");
    });

    return () => {
      socket.off("connect");
    };
  }, [socket]);

  useEffect(() => {
    socket.once("connect_error", (error) => {
      showError();
      console.info(error.message);
    });

    return () => {
      socket.off("connect_error");
    };
  });

  // socket.on("connect_error", (error) => {
  //   showError();
  // });

  // notification function
  function showError() {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error("Failed to connect, refresh your page!", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  function showInfo(playerName) {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success(`${playerName} just joined the room!`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  // reducers

  async function handleUserData(data) {
    setUserData(data);
    await axios.get(`${socketInUse}join/${data.room}/${data.username}`);
  }

  function handleNewChoice(userChoice) {
    let choiceData = {};

    if (currentChoice) {
      choiceData["add"] = userChoice;
      choiceData["subtract"] = currentChoice;
      setCurrentChoice(userChoice);
    } else {
      choiceData["add"] = userChoice;
      setCurrentChoice(userChoice);
    }

    return choiceData;
  }

  function handleChoiceChange(userChoice) {
    // current choice is a value from 1 to 4.
    let dataToSend = handleNewChoice(userChoice);
    socket.emit("choiceChange", dataToSend, userData.room);
  }

  async function submitChoiceHandler() {
    setIsLoading(true);
    try {
      await axios.get(`${socketInUse}end-round/${adminData.roomName}`);
      setIsLoading(false);
    } catch (error) {
      showError();
    }
  }

  async function startRoundHandler() {
    setIsLoading(true);
    try {
      await axios.get(`${socketInUse}start/${adminData.roomName}`);
      setIsLoading(false);
    } catch {
      showError();
    }
  }

  async function clearDatabaseHandler(shouldDelete) {
    if (shouldDelete) {
      await axios.get(`${socketInUse}end-simulation/${adminData.roomName}`);
    }
  }

  async function fetchChartHandler(roundNumber) {
    setIsChart(true);
    try {
      let { data } = await axios.get(
        `${socketInUse}chart/${userData.room}/${roundNumber}`
      );
      setCurrentChart(data);
      setIsChart(false);
    } catch (error) {
      setIsChart(false);
      console.log(error);
    }
  }

  async function adminAuth(credentials) {
    let { data } = await axios.get(
      `${socketInUse}auth/${credentials.password}/room/${credentials.roomNumber}`
    );
    setAdminData({ roomName: data.roomName });
    if (data.code === 1) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  return (
    <BrowserRouter>
      <ToastContainer transition={Flip} />
      <Routes>
        <Route path="/" element={<ChooseScreen />} />
        <Route
          path="/game"
          element={<LandingPage storeData={handleUserData} />}
        />
        <Route
          path="/game/:roomName"
          element={<LandingPage storeData={handleUserData} />}
        />
        <Route
          path="/simulation"
          element={
            <Simulation
              socket={socket}
              userData={userData}
              careerData={careerData}
              choiceHandler={handleChoiceChange}
              currentChoice={currentChoice}
              roundState={roundState}
              roundNumber={roundNumber}
              onFetch={fetchChartHandler}
              currentChart={currentChart}
              choicesData={choicesData}
            />
          }
        />
        <Route
          path="/chart"
          element={
            <ChartScreen
              onFetch={fetchChartHandler}
              currentChart={currentChart}
              choicesData={choicesData}
              roundNumber={roundNumber}
              isChart={isChart}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminScreen
              onSubmit={submitChoiceHandler}
              roundNumber={roundNumber}
              onDelete={clearDatabaseHandler}
              onStart={startRoundHandler}
              roundState={roundState}
              isAdmin={isAdmin}
              onLogin={adminAuth}
              adminData={adminData}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/choice" element={<ChooseScreen />} />
        <Route path="/explanation" element={<ChooseScreen />} />
        <Route
          path="/explanation/:role"
          element={<GameExplantion storeData={handleUserData} />}
        />
        <Route
          path="/explanation/player/:roomName"
          element={<GameExplantion storeData={handleUserData} />}
        />
        <Route path="/end" element={<DebreifScreen />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
