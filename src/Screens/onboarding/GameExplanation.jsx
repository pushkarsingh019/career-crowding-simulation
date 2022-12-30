import HeroText from "../../components/HeroText";
import Navbar from "../../components/Navbar";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom"

function GameExplantion(){
    let {role} = useParams();


    function AdminExplanation(){
        return(
            <section>
                <code>How to run this game</code>
                <br />
                <Link to={`/`}>Conduct the Game</Link>
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
            <HeroText heroText={`How to play the game`} />
            {role === "admin" ? <AdminExplanation/ > : <PlayerExplanation />}
        </div>
    )
};

export default GameExplantion;