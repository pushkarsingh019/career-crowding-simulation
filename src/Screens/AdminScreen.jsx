import React from "react";
import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";
// import ChartScreen from "./Chart";
// main functions of the admin screen
/* 
    - Have the ability to make the room, and send the link for the room.
    - see who joined the room and then let them in or out.
    - control the timer thing.
    - 

*/

// lets just start by building a simple feature -> posting the final data to the backend.



function AdminScreen({onSubmit, roundNumber, onDelete, toggleRoundState}){


    function startHandler(){
        toggleRoundState("true")
    }

    function endHandler(){
        onSubmit(true)
        toggleRoundState("false")
    };

    function deleteHandler(){
        onDelete(true)
    };

    return(
        <div className="screen">
            <Navbar />
            <HeroText heroText={`The Admin Screen`} />
            <br />
            <div className="admin-hero">
                <code>Round Number : {roundNumber}</code>
                <br />
                <code>Click the submit button to end one round and clear database to end the entire simulation</code>
                <br />
                <br />
                <button className="primary-button btn" onClick={startHandler}>Start Next Round</button>
                <button className="primary-button btn margin-left" onClick={endHandler}>End Round</button>
                <button className="secondary-button btn margin-left" onClick={deleteHandler}>End Simulation</button>
            </div>
        </div>
    )
};


export default AdminScreen