import { useState } from "react";
import {useNavigate} from "react-router-dom"

function LandingPage({socket, storeData}){

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState();
    const [simulaton, setSimulation] = useState();
    const navigate = useNavigate();

    async function formHandler(event){
        event.preventDefault();
        let userData = {
            username,
            room,
            simulaton
        };

        storeData(userData);
        navigate("/simulation");
    }


    return(
        <div className="screen">
            <h1>Enter your details to get started</h1>
            <form onSubmit={formHandler}>
                <input required type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username || ""} />
                <br />
                <input required type="text" placeholder="Enter room number" onChange={(e) => setRoom(e.target.value)} value={room || ""} />
                <br />
                <input required type="Number" placeholder="Enter Simulation Number" onChange={(e) => setSimulation(e.target.value)} value={simulaton || ""} />
                <br />
                <button type="submit">Join Room</button>
            </form>
        </div>
    )
};

export default LandingPage;