import Navbar from "../../components/Navbar";
import HeroText from "../../components/HeroText";

import { Link } from "react-router-dom";

// importing assets

import arcadeIcon from "../../assets/arcade-icon.svg";
import settingsIcon from "../../assets/settings-icon.svg";

function ChooseScreen(){

    function ChoiceCard({image, choiceName, subtitle, buttonText, buttonRedirect}){
        return(
            <div className="choice-card">
                <img src={image} alt="apple arcade icon" />
                <h3>{choiceName}</h3>
                <code>{subtitle}</code>
                <br />
                <Link to={buttonRedirect}>{buttonText}</Link>
            </div>
        )
    }


    return(
        <div className="screen">
            <Navbar />
            <HeroText heroText={`Choose your role`} />
            <div className="onboarding-choice">
                <ChoiceCard image={settingsIcon} choiceName={`Admin`} subtitle={`The person conducting the game`} buttonText={`Conduct Game`} buttonRedirect={`/explanation/admin`}  />
                <ChoiceCard image={arcadeIcon} choiceName={`Player`} subtitle={`The person playing the game`} buttonText={`Play the game`} buttonRedirect={`/explanation/player`}  />
            </div>
        </div>
    )
};

export default ChooseScreen;