import CareerCard from "../components/CareerCard";
import {Link, useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";

function Simulation({socket, choiceHandler, userData, careerData, currentChoice, roundState}){
    const navigate = useNavigate();
    const choices = [
        {
            id : 1,
            name : "Tech",
        },
        {
            id : 2,
            name : "Management",
        },
        {
            id : 3,
            name : "Arts",
        },
        {
            id : 4,
            name : "Biology",
        },
    ];

    function onChangeChoice(currentChoice){
        // the current choice reflects back the choice that they have made
        choiceHandler(currentChoice);;
    }
    

    return(
        <section className="screen">
            <Navbar />
            <HeroText heroText={`Simulation Screen`} />
            {Object.keys(userData).length === 0 ?
                <div>
                    <code>You need to join a room before coming to the simulation room</code>
                    <button onClick={() => navigate(`/`)}>Join a room</button>
                </div> 
                :
                <div>
                    {roundState ? 
                        <div>
                            <div className="user-details">
                                <span><code>Username : {userData.username}</code></span> 
                                <br /><span><code>Room Number : {userData.room}</code></span>
                            </div>
                            <div className="instruction">
                                <h1>Pick a career</h1>
                            </div>
                            <div className="choices">
                                <CareerCard key={choices[0].id} name={choices[0].name} id={choices[0].id} changeChoice={onChangeChoice} numberOfPeople={careerData[1]} currentChoice={currentChoice}  />
                                <CareerCard key={choices[1].id} name={choices[1].name} id={choices[1].id} changeChoice={onChangeChoice} numberOfPeople={careerData[2]} currentChoice={currentChoice}  />
                                <CareerCard key={choices[2].id} name={choices[2].name} id={choices[2].id} changeChoice={onChangeChoice} numberOfPeople={careerData[3]} currentChoice={currentChoice} />
                                <CareerCard key={choices[3].id} name={choices[3].name} id={choices[3].id} changeChoice={onChangeChoice} numberOfPeople={careerData[4]} currentChoice={currentChoice} />
                            </div>
                        </div>
                    :
                        <div>
                            <br />
                            <p style={{fontFamily : "monospace", fontSize : "1rem"}}>Simulation round is closed right now.</p>
                            <p style={{fontFamily : "monospace", fontSize : "1rem"}}>You can check how you are performing by looking at the <Link to={`/chart`}>charts</Link> or wait while the round starts shortly</p>
                        </div>
                    }
                    
                </div>
                
                 
            }
        </section>
    )
};

export default Simulation;