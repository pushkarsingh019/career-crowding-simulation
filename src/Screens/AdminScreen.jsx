import React from "react";
import Navbar from "../components/Navbar";
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


    return(
        <div className="screen">
            <Navbar navbarText={`The Admin Screen`} />
            <div>
                <code>{roundNumber}</code>
                <h3>Click the button to submit the data and reset the simulation</h3>
                <button onClick={clickHandler}>Submit</button>
                <button onClick={deleteHandler}>Clear Database</button>
            </div>
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