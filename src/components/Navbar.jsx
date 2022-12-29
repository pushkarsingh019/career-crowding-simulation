import React from "react";
import {Link} from "react-router-dom"

function Navbar({navbarText}){
    return(
        <div className="navbar">
            <nav className="nav-list">
                <li><Link className="link" to={`/`}>Home</Link></li>
                <li><Link className="link" to={`/admin`}>Admin</Link></li>
                <li><Link className="link" to={`/chart`}>Charts</Link></li>
                <li><Link className="link" to={`/simulation`}>Simulation</Link></li>
            </nav>
        </div>
    )
};

export default Navbar;