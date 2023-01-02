import HeroText from "../../components/HeroText";
import Navbar from "../../components/Navbar";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GameExplantion({storeData}){
    const origin = "https://simulation.stoicpushkar.com"
    let {role} = useParams();


    function AdminExplanation(){

        const [gameLink, setGameLink] = useState();
        const [roomNumber, setRoomNumber] = useState();
        const [copyText, setCopyText] = useState("click to copy the sharable link")

        function createGameLink(event){
            event.preventDefault();
            setGameLink(`/game/${roomNumber}`)
        };


        return(
            <section className="explanation">
                <div>
                    <br />
                    <h2>How to conduct the game</h2>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, iusto. Dicta quibusdam, quasi consequuntur impedit reiciendis earum aliquam quas libero aut, maiores cupiditate perferendis unde laborum qui corrupti? Tenetur ullam maxime illum minima sed illo odio libero reprehenderit ipsam doloribus deserunt quas quos vel, animi aperiam! Nihil nisi commodi eaque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores molestiae nesciunt vero libero sunt illum quibusdam doloribus fuga ipsa accusamus? </p>
                    <br />
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/J4ypOJbC1lA" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
                <div>
                    <br />
                    <h2>Create the game credentials</h2>
                    <form onSubmit={createGameLink} className="form">
                        <input required style={{marginTop : "0px"}} type="text" placeholder="A Unique Room Name" onChange={(e) => setRoomNumber(e.target.value)} value={roomNumber || ""}/>
                        <button className="create-room-btn" type="submit">Create Room</button>
                    </form>
                    <code>{gameLink ? <Link to={gameLink}>Join the game</Link> : "Create room to get the game link"}</code>
                    <br />
                    {gameLink ? <span onClick={() => {navigator.clipboard.writeText(`${origin}/game/${gameLink}`); setCopyText("coped to clipboard")}}>{copyText}</span> : ""}
                </div>
            </section>
        )
    };

    function PlayerExplanation({storeData}){

        const navigate = useNavigate();
        const [username, setUsername] = useState("");
        const [room, setRoom] = useState("");

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
                    On the screen there would be four career choices, and you have 30 seconds to choose a career. After 30 seconds, you will get to know which choice would have made you the most amount of money. </p>
                    <br />
                    <p>In order to win the game, you have to make the right choices and make the most amount of money at the end of the game.</p>
                    <br />
                    <code style={{fontFamily : "monospace", fontSize : "1rem"}}>Here's a short video to understand how to play the game</code>
                    <br />
                    <br />
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/J4ypOJbC1lA" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
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