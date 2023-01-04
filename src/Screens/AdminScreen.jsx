import React from "react";
import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";
import Login from "./Login";

// importing notifications
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminScreen({onSubmit, roundNumber, onDelete, onStart, roundState, isAdmin,onLogin}){ 
    
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
            {isAdmin ? 
                <div className="admin-hero">
                    <p>{roundState ? `Round ${roundNumber} is running` : roundNumber === 0 ? "Start The Round" : `Round ${roundNumber} has ended` }</p>
                    <br />
                    {roundState ? <button className=" btn  end-button" onClick={clickHandler}>End Round {roundNumber}</button> : <button className=" btn start-button" onClick={startHandler}>Start Round {roundNumber + 1}</button>}   
                    <button className="secondary-button btn margin-left" onClick={deleteHandler}>End Simulation</button>
                </div>
            :
                <Login onLogin={onLogin} />
            }
        </div>
    )
};


export default AdminScreen