import { Link } from "react-router-dom";
import HeroText from "../components/HeroText";
import Navbar from "../components/Navbar";

function ErrorPage(){
    return(
        <div className="screen">
            <Navbar />
            <HeroText heroText={`Error 404 | Page Not Found`} />
            <h3>Looks like you are trying to access a page thats not there</h3>
            <Link to={`/choice`}>Go Back to home</Link>
        </div>
    )
};

export default ErrorPage;