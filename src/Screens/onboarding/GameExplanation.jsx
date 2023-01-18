import HeroText from "../../components/HeroText";
import Navbar from "../../components/Navbar";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import axios
import axios from "axios";
import { originInUse, socketInUse } from "../../config/config";

function GameExplantion({storeData}){

    let {role} = useParams();
    let {roomName} = useParams();

    function AdminExplanation(){

        const [gameLink, setGameLink] = useState();
        const [roomNumber, setRoomNumber] = useState();
        const [password, setPassword] = useState();
        const [copyText, setCopyText] = useState("click to copy the sharable link")
 
        async function createGameLink(event){
            event.preventDefault();
            setGameLink(`/explanation/player/${roomNumber}`)

            let adminCredentials = {
                roomNumber : roomNumber,
                password : password
            };

            await axios.post(`${socketInUse}create-game`, adminCredentials)
        };


        return(
            <section className="explanation">
                <div>
                    <br />
                    <h2>How to conduct the game</h2>
                    <br />
                    <p>As an admin, your main task it to conduct the game and decide when to start and stop the round.
                    First, when you create the game essentials, you will get the links to conduct the game and to share it to fellow participants. After you have shared the link, click on <i>join the game</i> and log in with the credentials you have created.</p>
                    <br />
                    <p>On your admin page, you will have two options <strong>Start round 1</strong> and <strong>End Simulation</strong>. When you start the round, the players would be able to play the game. After 20 seconds of starting the round you will get a notification to close the round. Thats when you should close the round and wait some seconds to start the next round.</p>
                    <br />
                    <p>continue this for 10 rounds and end the simulation.</p>
                    <br />
                    <code style={{fontFamily : "monospace"}}>Here's a shot video explaining the process</code>
                    <br />
                    <br />
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/9GH_AarysN4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div>
                    <br />
                    <h2>Create the game credentials</h2>
                    <form onSubmit={createGameLink} className="form">
                        <input required style={{marginTop : "0px"}} type="text" placeholder="A Unique Room Name" onChange={(e) => setRoomNumber(e.target.value)} value={roomNumber || ""}/>
                        <br />
                        <input required type="password" placeholder="Admin password" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
                        <button className="create-room-btn" type="submit">Create Room</button>
                    </form>
                    <code>{gameLink ? <Link to={`/admin`}>Join the game</Link> : "Create room to get the game link"}</code>
                    <br />
                    {gameLink ? <span onClick={() => {navigator.clipboard.writeText(`${originInUse}${gameLink}`); setCopyText("coped to clipboard")}}>{copyText}</span> : ""}
                </div>
            </section>
        )
    };

    function PlayerExplanation({storeData}){

        const navigate = useNavigate();
        const [username, setUsername] = useState("");
        const [room, setRoom] = useState(roomName);

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
            <section className="explanation">
                <div>
                    <br />
                    <h2>How to win the game</h2>
                    <br />
                    <p>In order to win the game, all you have to do is <strong>make choices that will help you make the most amount of money.</strong>
                    On the screen there would be four career choices, and you have 20 seconds to choose a career. After 20 seconds, you will get to know which choice would have made you the most amount of money. </p>
                    <br />
                    <p>In order to win the game, you have to make the right choices and make the most amount of money at the end of the game.</p>
                    <br />
                    <code style={{fontFamily : "monospace", fontSize : "1rem"}}>Here's a short video to understand how to play the game</code>
                    <br />
                    <br />
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/EodLYrqbkng" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div>
                    <br />
                    <h2>Play the Game</h2>
                    <code style={{fontFamily : "monospace"}}>Enter the room number of click the link sent by the conductor</code>
                    <form onSubmit={formHandler} className="form">
                        <input required type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username || ""} />
                        <br />
                        <input required type="text" placeholder="Enter room number" onChange={(e) => setRoom(e.target.value)} value={room || ""} />
                        <br />
                        <button className="btn primary-button" type="submit">Join Room</button>
                    </form>
                </div>
            </section>
        )
    }


    return(
        <div className="screen">
            <Navbar />
            <HeroText heroText={role === "admin" ? "How to conduct the game" : "How to play the game"} />
            {role === "admin" ? <AdminExplanation/ > : <PlayerExplanation storeData={storeData} />}
        </div>
    )
};

export default GameExplantion;