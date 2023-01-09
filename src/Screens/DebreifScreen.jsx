import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";

// importing video assets
import endVideo from "../assets/video/end.mp4"

function DebreifScreen(){
    return(
        <div className="screen">
            <Navbar />
            <HeroText heroText={`Thank you for playing`} />
            <div className="explanation">
                <div>
                    <h2>How to win the game</h2>
                    <p>To better understand the game and how to win it, you can read the following blog posts <a href="https://stoicpushkar.com">How to win the simulation</a> or for a deeper understanding of the game concepts, you can either read this -- <a href="https://stoicpushkar.com/posts/career-crowding">How prestige and imaitation affect your career choices.</a> or watch the video below. </p>
                    <br />
                    <video src={endVideo} controls preload="auto">Browser does not support video</video>
                </div>
                <div>
                    <iframe title="google form" src="https://docs.google.com/forms/d/e/1FAIpQLSdRpgoGjnumgbB-NEmdhzs2s3m2R_N50Xl_Nkrz7ag-GHuzsQ/viewform?embedded=true" width="640" height="640" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                </div>
            </div>
        </div>
    )
};


export default DebreifScreen