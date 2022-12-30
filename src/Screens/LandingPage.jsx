import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";

function LandingPage({storeData}){

    const {roomName} = useParams();
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState(roomName);
    // const [simulaton, setSimulation] = useState();
    const navigate = useNavigate();

    async function formHandler(event){
        event.preventDefault();
        let userData = {
            username,
            room,
            // simulaton
        };

        storeData(userData);
        navigate("/simulation");
    }


    return(
        <div className="screen landing-screen">
            <Navbar />
            <HeroText heroText={`Enter your details to get started`} />
            <form onSubmit={formHandler} className="form">
                <input required type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username || ""} />
                <br />
                <input required type="text" placeholder="Enter room number" onChange={(e) => setRoom(e.target.value)} value={room || ""} />
                <br />
                {/* <input required type="Number" placeholder="Enter Simulation Number" onChange={(e) => setSimulation(e.target.value)} value={simulaton || ""} /> */}
                <br />
                <button className="btn primary-button" type="submit">Join Room</button>
            </form>
            </div>
    )
};

export default LandingPage;