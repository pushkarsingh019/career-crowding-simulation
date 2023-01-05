import React, {useState} from "react";

function Login({onLogin}){

    const [roomNumber, setRoomNumber] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();

    function loginHandler(event){
        setMessage("")
        event.preventDefault();

        let adminCredentials = {
            roomNumber,
            password
        };

        onLogin(adminCredentials)

        setTimeout(() => {
            setMessage("Wrong room name or password. try again")
        }, 1000);

    }

    return(
        <form onSubmit={loginHandler} className="form">
            <h4>Login to conduct the game</h4>
            <input required type="text" placeholder="Your Room's Name" onChange={(e) => setRoomNumber(e.target.value)} value={roomNumber || ""}/>
            <br />
            <input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
            <br />
            {message ? message : ""}
            <br />
            <button className="start-button btn" type="submit">Login</button>
        </form>
    )
};

export default Login;