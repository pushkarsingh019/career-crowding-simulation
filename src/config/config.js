const developmentSocket = "http://localhost:8080/";
const developmentOrigin = "http://localhost:3000/";

// production variables
export const originInUse = process.env.ORIGIN || developmentOrigin;
export const socketInUse = process.env.SOCKET || developmentSocket;

// stopwatch for the timer
export const seconds = 20;
export const stopTimer = 19500;