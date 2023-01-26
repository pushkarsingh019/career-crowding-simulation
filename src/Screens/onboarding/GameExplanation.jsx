import HeroText from "../../components/HeroText";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import axios
import axios from "axios";
import { socketInUse } from "../../config/config";

function Explanation({ storeData }) {
  let { role } = useParams();
  let { roomName } = useParams();

  return (
    <div className="screen">
      <Navbar />
      <HeroText
        heroText={
          role === "admin" ? "How to conduct the game" : "How to play the game"
        }
      />
      {role === "admin" ? (
        <Admin />
      ) : (
        <Player storeData={storeData} roomName={roomName} />
      )}
    </div>
  );
}

function Admin() {
  const navigate = useNavigate();
  const [readRules, setReadRules] = useState(false);
  const [watchVideo, setWatchVideo] = useState(false);

  function AdminInstructions() {
    return (
      <section className="instructions">
        <p>
          As an admin, your main task it to conduct the game and decide when to
          start and stop the round. First, when you create the game essentials,
          you will get the links to conduct the game and to share it to fellow
          participants. After you have shared the link, click on{" "}
          <i>join the game</i> and log in with the credentials you have created.
        </p>
        <br />
        <p>
          On your admin page, you will have two options{" "}
          <strong>Start round 1</strong> and <strong>End Simulation</strong>.
          When you start the round, the players would be able to play the game.
          After 20 seconds of starting the round you will get a notification to
          close the round. Thats when you should close the round and wait some
          seconds to start the next round.
        </p>
        <p>continue this for 10 rounds and end the simulation.</p>
        <br />
        <div className="admin-options-flex">
          <button
            onClick={() => {
              setReadRules(true);
            }}
            className="btn primary-button"
          >
            Watch Demo Video
          </button>
          <button
            onClick={() => {
              setReadRules(true);
              setWatchVideo(true);
            }}
            className="btn secondary-button margin-left"
          >
            Create Game
          </button>
        </div>
      </section>
    );
  }

  function AdminVideo() {
    return (
      <section>
        <code style={{ fontFamily: "monospace" }}>
          Here's a shot video explaining the process
        </code>
        <br />
        <iframe
          src="https://player.vimeo.com/video/792924670?h=305443dafb&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          width="700"
          height="394"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          title="How to conduct the game"
        ></iframe>
        <br />
        <br />
        <button
          onClick={() => {
            setWatchVideo(true);
          }}
          className="btn primary-button"
        >
          Create Game
        </button>
      </section>
    );
  }

  function AdminGame() {
    const [roomNumber, setRoomNumber] = useState();
    const [password, setPassword] = useState();

    async function createGame(event) {
      event.preventDefault();
      let adminCredentials = {
        roomNumber: roomNumber,
        password: password,
      };
      await axios.post(`${socketInUse}create-game`, adminCredentials);
      navigate("/admin");
    }

    return (
      <section>
        <h4>Create the game credentials</h4>
        <form onSubmit={createGame} className="form">
          <input
            required
            type="text"
            placeholder="A Unique Room Name"
            onChange={(e) => setRoomNumber(e.target.value)}
            value={roomNumber || ""}
          />
          <br />
          <input
            required
            type="password"
            placeholder="strong password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
          <br />
          <br />
          <button className="btn primary-button" type="submit">
            Create Room
          </button>
        </form>
      </section>
    );
  }

  return (
    <section>
      {readRules ? (
        readRules && watchVideo ? (
          <AdminGame />
        ) : (
          <AdminVideo />
        )
      ) : (
        <AdminInstructions />
      )}
    </section>
  );
}

function Player({ roomName, storeData }) {
  const navigate = useNavigate();
  const [read, setRead] = useState(false);
  const [watch, setWatch] = useState(false);

  function PlayersInstructions() {
    return (
      <section className="instructions">
        <p>
          In order to win the game, all you have to do is{" "}
          <strong>
            make choices that will help you make the most amount of money.
          </strong>
          On the screen there would be four career choices, and you have 20
          seconds to choose a career. After 20 seconds, you will get to know
          which choice would have made you the most amount of money.{" "}
        </p>
        <br />
        <p>
          In order to win the game, you have to make the right choices and make
          the most amount of money at the end of the game.
        </p>
        <br />
        <div className="admin-options-flex">
          <button
            onClick={() => {
              setRead(true);
            }}
            className="btn primary-button"
          >
            Watch Demo Video
          </button>
          <button
            onClick={() => {
              setRead(true);
              setWatch(true);
            }}
            className="btn secondary-button margin-left"
          >
            Play Game
          </button>
        </div>
      </section>
    );
  }

  function PlayerVideo() {
    return (
      <section>
        <code style={{ fontFamily: "monospace", fontSize: "1rem" }}>
          Here's a short video to understand how to play the game
        </code>
        <br />
        <iframe
          src="https://player.vimeo.com/video/792921882?h=ca517fe093&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          width="700"
          height="400"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          title="How to play the game.mp4"
        ></iframe>
        <br />
        <button
          onClick={() => {
            setWatch(true);
          }}
          className="btn primary-button"
        >
          Play Game
        </button>
      </section>
    );
  }

  function PlayGame({ storeData, roomName }) {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState(roomName);

    async function formHandler(event) {
      event.preventDefault();
      let userData = {
        username,
        room,
        // simulaton
      };

      storeData(userData);
      navigate("/simulation");
    }

    return (
      <section>
        <br />
        <h2>Play the Game</h2>
        <code style={{ fontFamily: "monospace" }}>
          Enter the room number of click the link sent by the admin.
        </code>
        <form onSubmit={formHandler} className="form">
          <input
            required
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username || ""}
          />
          <br />
          {roomName === "" || roomName === undefined ? (
            <input
              required
              type="text"
              placeholder="Enter room number"
              onChange={(e) => setRoom(e.target.value)}
              value={room || ""}
            />
          ) : (
            ""
          )}
          <br />
          <button className="btn primary-button" type="submit">
            Join Room
          </button>
        </form>
      </section>
    );
  }

  return (
    <div className="screen">
      {read ? (
        read && watch ? (
          <PlayGame storeData={storeData} roomName={roomName} />
        ) : (
          <PlayerVideo />
        )
      ) : (
        <PlayersInstructions />
      )}
    </div>
  );
}

export default Explanation;
