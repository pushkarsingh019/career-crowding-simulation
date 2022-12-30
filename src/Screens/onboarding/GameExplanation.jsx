import HeroText from "../../components/HeroText";
import Navbar from "../../components/Navbar";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom"
import { useState } from "react";

function GameExplantion(){
    const origin = "https://simulation.stoicpushkar.com"
    let {role} = useParams();

    function AdminExplanation(){

        const [gameLink, setGameLink] = useState();
        const [roomNumber, setRoomNumber] = useState();
        const [copyText, setCopyText] = useState("click to copy the sharable link")

        function createGameLink(event){
            event.preventDefault();
            setGameLink(`/${roomNumber}`)
        }


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
                    {gameLink ? <span onClick={() => {navigator.clipboard.writeText(`${origin}${gameLink}`); setCopyText("coped to clipboard")}}>{copyText}</span> : ""}
                </div>
            </section>
        )
    };

    function PlayerExplanation(){
        return(
            <section>
                <code>How to play this game</code>
                <br />
                <Link to={`/`}>Play the game</Link>
            </section>
        )
    }


    return(
        <div className="screen">
            <Navbar />
            <HeroText heroText={role === "admin" ? "How to conduct the game" : "How to play the game"} />
            {role === "admin" ? <AdminExplanation/ > : <PlayerExplanation />}
        </div>
    )
};

export default GameExplantion;