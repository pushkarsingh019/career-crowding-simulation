import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";

function Explain(){
    return(
        <section className="user-details" style={{textAlign : "center"}}>
            <p>Here are some links for you to better understand the game, <a href="https://stoicpushkar.com">How to win the game</a> and <a href="https://stoicpushkar.com/posts/career-crowding">How prestige and imaitation affect your career choices.</a>. Reading these articles will help you better understand the game and its underlying logic.</p>
        </section>
    )
}

function DebreifScreen(){
    return(
        <div className="screen">
            <Navbar />
            <HeroText heroText={`Thank you for playing`} />
            <Explain />
            <br />
            <br />
            <p>Do you have 2 minutes to fill out the form below to help us make the game better?</p>
            <br />
            <iframe title="google form" src="https://docs.google.com/forms/d/e/1FAIpQLSdRpgoGjnumgbB-NEmdhzs2s3m2R_N50Xl_Nkrz7ag-GHuzsQ/viewform?embedded=true" width="640" height="640" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>
    )
};


export default DebreifScreen