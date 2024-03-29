const developmentSocket = "http://localhost:8080/";
const developmentOrigin = "http://localhost:3000/";

export const socketInUse = process.env.REACT_APP_SOCKET || developmentSocket;
export const originInUse = process.env.REACT_APP_ORIGIN || developmentOrigin;

// stopwatch for the timer
export const seconds = 20;
export const stopTimer = 19500;