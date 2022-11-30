import CareerCard from "../components/CareerCard";
import {useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar";

function Simulation({socket, choiceHandler, userData, careerData, currentChoice}){
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
            <Navbar navbarText={`Simulation Screen`} />
            {Object.keys(userData).length === 0 ?
                <div>
                    <code>You need to join a room before coming to the simulation room</code>
                    <button onClick={() => navigate(`/`)}>Join a room</button>
                </div> 
                :
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
                 
            }
        </section>
    )
};

export default Simulation;