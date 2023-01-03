import React from "react";
import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";


function AdminScreen({onSubmit, roundNumber, onDelete, onStart, roundState}){

    function startHandler(){
        onStart()
    }

    function clickHandler(){
        onSubmit()
    }

    function deleteHandler(){
        onDelete(true)
    }

    return(
        <div className="screen">
            <Navbar />
            <HeroText heroText={`The Admin Screen`} />
            <br />
            <div className="admin-hero">
                <p>{roundState ? `Round ${roundNumber} is running` : roundNumber === 1 ? "Start The Round" : `Round ${roundNumber} has ended` }</p>
                <br />
                <button className="primary-button btn" onClick={startHandler}>Start Next Round</button>
                <button className=" btn margin-left primary-button" onClick={clickHandler}>End Round {roundNumber}</button>
                <button className="secondary-button btn margin-left" onClick={deleteHandler}>End Simulation</button>
            </div>
        </div>
    )
};


export default AdminScreen