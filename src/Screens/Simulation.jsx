import CareerCard from "../components/CareerCard";
import {useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";
import { useState } from "react";
import { useEffect } from "react";

// importing choices lin
import getCareerChoices from "../lib/careerChoices";

// importing timer variable
import {seconds } from "../config/config";

// importing chartScreen
import ChartScreen from "./Chart";

function Simulation({choiceHandler, userData, careerData, currentChoice, roundState, roundNumber, onFetch, currentChart, choicesData}){

    const navigate = useNavigate();
    const [counter, setCounter] = useState(seconds);
    const [choices, setChoices] = useState();

    useEffect(() => {
        const timer = roundState && counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer)
    }, [counter, roundState])

    useEffect(() => {
        setCounter(seconds)
        let data = getCareerChoices(roundNumber)
        setChoices(data)
    }, [roundState, roundNumber])

    function onChangeChoice(currentChoice){
        // the current choice reflects back the choice that they have made
        choiceHandler(currentChoice);;
    };

    

    return(
        <section className="screen">
            <Navbar />
            <HeroText heroText={`Simulation Screen`} />
            {Object.keys(userData).length === 0 ?
                <div>
                    <code>You need to join a room before coming to the simulation room</code>
                    <button onClick={() => navigate(`/game`)}>Join a room</button>
                </div> 
                :
                <div>
                    {roundState ? 
                        <div>
                            <div className="user-details">
                                <div>
                                    <p>username : {userData.username}</p>
                                    <p>room name : {userData.room}</p>
                                    <p>round number : {roundNumber}</p>
                                </div>
                                <div>
                                    <p className={counter < 6 && counter > 0 && "red-text"}>{counter > 0 ? `Round ends in ${counter} seconds` : "The round has ended"}</p>
                                </div>
                            </div>
                            <div className="instruction">
                                <h1>Pick a career</h1>
                            </div>
                                {choices ? 
                                     <div className="choices">
                                        <CareerCard key={choices[0].id} name={choices[0].name} id={choices[0].id} changeChoice={onChangeChoice} numberOfPeople={careerData[1]} currentChoice={currentChoice}  />
                                        <CareerCard key={choices[1].id} name={choices[1].name} id={choices[1].id} changeChoice={onChangeChoice} numberOfPeople={careerData[2]} currentChoice={currentChoice}  />
                                        <CareerCard key={choices[2].id} name={choices[2].name} id={choices[2].id} changeChoice={onChangeChoice} numberOfPeople={careerData[3]} currentChoice={currentChoice} />
                                        <CareerCard key={choices[3].id} name={choices[3].name} id={choices[3].id} changeChoice={onChangeChoice} numberOfPeople={careerData[4]} currentChoice={currentChoice} />
                                    </div>
                                    :
                                    "Choices data not available"
                                }
                            </div>
                    :
                        roundNumber === 0 ? 
                            <div>
                                <br />
                                <p style={{fontFamily : "monospace", fontSize : "1rem"}}>Simulation is closed right now.</p>
                                <i style={{fontSize : "0.9rem"}}>The game could be starting any moment. <strong>hang tight!</strong></i>
                            </div>
                            :
                            <ChartScreen onFetch={onFetch} currentChart={currentChart} choicesData={choicesData} roundState={roundState} />
                    }
                    
                </div>
                
                 
            }
        </section>
    )
};

export default Simulation;