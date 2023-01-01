import CareerCard from "../components/CareerCard";
import {useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";
import {useTimer} from "react-timer-hook";

// importing elements for the notification system
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Timer({expiryTimestamp}){
    const {seconds} = useTimer({
        expiryTimestamp,
        onExpire : () => console.info("Timer is finished")
    });

    return(
        <div className="timer">
            <span>{seconds}</span>
        </div>
    )
};


function Simulation({choiceHandler, userData, careerData, currentChoice}){

    // timer setup
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);

    // notification setup
    function notify(){
        toast("test notificaton", {
            position: "top-right",
            autoClose : 30000,
            hideProgressBar : false,
            closeOnClick : false,
            pauseOnHover : false,
            draggable : true,
            progress : undefined,
            theme : "light",
            type : "info"
        })
    };


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
            {/* notification component start */}
            <ToastContainer />
            <Navbar />
            <HeroText heroText={`Simulation Screen`} />
            {Object.keys(userData).length === 0 ?
                <div>
                    <code>You need to join a room before coming to the simulation room</code>
                    <br />
                    <br />
                    <button className="primary-button btn" onClick={() => navigate(`/`)}>Join a room</button>
                </div> 
                :
                <div>
                    <div className="details">
                        <div className="user-details">
                            <span><code>Username : {userData.username}</code></span> 
                            <br /><span><code>Room Number : {userData.room}</code></span>
                        </div>
                        <div>
                            <Timer expiryTimestamp={time} />
                            <button onClick={notify}>Show notification</button>
                        </div>
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