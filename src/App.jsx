import {BrowserRouter, Route, Routes} from "react-router-dom";
import io from "socket.io-client";

// importing screens
import LandingPage from "./Screens/LandingPage";
import Simulation from "./Screens/Simulation";
import Chart from "./Screens/Chart";

// importing config requirements
import {developmentSocket} from "./config/config"

export default function App(){

  // setting up socket.io-client
  const socket = io.connect(developmentSocket, {transports : ['websocket']});

  socket.on("connect", () => {
    console.log("client connected");
  })

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage socket={socket} />} />
        <Route path="/simulation" element={<Simulation socket={socket} />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </BrowserRouter>
  )
}