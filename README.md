# Career Crowding

A real-time simulation which uses the idea of [mimetic theory](https://mimetictheory.com/what-it-is-2/) to explain how prestige and imitation influence our career choices.

## Playing the Game

To play this game, you can head to [simulation.stoicpushkar.com](https://simulation.stoicpushkar.com/) and either conduct the game or play it.

While this game is primarily made for careers, you can also customise it based on your domain. For more information, read [How to customise the simulation](/docs/how-to-customise.md).

## Tech Stack and Usage

This app is bundled together with create-react-app with the nodejs backend. I have also used technologoes like [socketio](https://socket.io/) to make the app real-time.

Here's how to run this app on your local system in three steps.
- Clone the frontend and the backend.
- install the dependencies.
- run npm start.

#### Clone the repositories
`git clone https://github.com/pushkarsingh019/simulation-frontend.git` and `git clone https://github.com/pushkarsingh019/simulation-backend.git`

#### Install the dependencies
On both the folders, run `npm install`

### run start command
For the client folder, run `npm start` and for the backend folder `node app.js`


## Features

In this simulation, you can wither conduct the game or play it. 

Conductors can create a new room, share the room link, start and stop a round and also end the simulation. 
The Players will recieve the game link after which they can play the game real-time with other players in the room. After each round they can check the stats on their last performance and optimise to win the game.

Please Enjoy,
~ Pushkar Singh


