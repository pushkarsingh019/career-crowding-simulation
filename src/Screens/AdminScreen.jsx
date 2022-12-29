import React from "react";
import Navbar from "../components/Navbar";
import ChartScreen from "./Chart";
// import ChartScreen from "./Chart";
// main functions of the admin screen
/* 
    - Have the ability to make the room, and send the link for the room.
    - see who joined the room and then let them in or out.
    - control the timer thing.
    - 

*/

// lets just start by building a simple feature -> posting the final data to the backend.



function AdminScreen({onSubmit, roundNumber, onDelete}){


    function clickHandler(){
        onSubmit(true)
    }

    function deleteHandler(){
        onDelete(true)
    }

    const buttonStyle = {
        padding : "5px 8px",
        backgroundColor : "white",
        border : "2px solid blue",
        color : "blue",
        borderRadius : "12px"
    }


    return(
        <div className="screen">
            <Navbar navbarText={`The Admin Screen`} />
            <div className="admin-hero">
                <code>Round Number : {roundNumber}</code>
                <br />
                <code>Click the submit button to end one round and clear database to end the entire simulation</code>
                <br />
                <button style={buttonStyle}  onClick={clickHandler}>Submit</button>
                <button onClick={deleteHandler}>Clear Database</button>
            </div>
            <ChartScreen />
            {/* <div className="admin-grid">
                <div className="create-room-form">
                    <form>
                        <h3>Create A Room</h3>
                        <input type="text" placeholder="Room Number" />
                        <br />
                        <button type="submit">Create Room</button>
                    </form>
                </div>
                <div>
                    <h3>The Timer Section</h3>
                </div>
                <div>
                    <h3>Users in the room</h3>
                </div>
            </div> */}
        </div>
    )
};


export default AdminScreen