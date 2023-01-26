import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";

function DebreifScreen() {
  return (
    <div className="screen">
      <Navbar />
      <HeroText heroText={`Thank you for playing`} />
      <div className="instructions">
        <div>
          <h2>How to win the game</h2>
          <p>
            To better understand the game and how to win it, you can read the
            following blog posts{" "}
            <a href="https://stoicpushkar.com">How to win the simulation</a> or
            for a deeper understanding of the game concepts, you can either read
            this --{" "}
            <a href="https://stoicpushkar.com/posts/career-crowding">
              How prestige and imaitation affect your career choices.
            </a>{" "}
            or watch the video below.{" "}
          </p>
          <br />
        </div>
        <div className="flex">
          <iframe
            src="https://player.vimeo.com/video/792942446?h=c734cb391e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            width="800"
            height="450"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            title="Career Crowding Debrief.mp4"
          ></iframe>
          <div className="feedback-link">
            <p>
              Please help the game by taking two minutes of your time to fill
              this feedback form 👇🏽
            </p>
            <a
              target={"_blank"}
              rel="noreferrer"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdRpgoGjnumgbB-NEmdhzs2s3m2R_N50Xl_Nkrz7ag-GHuzsQ/viewform?embedded=true"
            >
              <i>feedback form</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebreifScreen;
