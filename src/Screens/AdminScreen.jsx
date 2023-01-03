import React from "react";
import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";

// importing notifications
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminScreen({onSubmit, roundNumber, onDelete, onStart, roundState}){ 
    
    function notify(){
        toast("Close the round", {
            position: "top-right",
            autoClose : 2000,
            hideProgressBar : false,
            closeOnClick : false,
            pauseOnHover : false,
            draggable : true,
            progress : undefined,
            theme : "light",
            type : "warning"
        })
    };

    function startHandler(){
        onStart()
        setTimeout(function(){
            notify()
        }, 29300)
    }

    function clickHandler(){
        onSubmit()
    }

    function deleteHandler(){
        onDelete(true)
    }

    return(
        <div className="screen">
            <ToastContainer />
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