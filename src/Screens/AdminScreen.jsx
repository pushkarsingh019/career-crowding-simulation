import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

// importing notifications
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// importing timer config variables
import { originInUse, stopTimer } from "../config/config";

function AdminScreen({
  onSubmit,
  roundNumber,
  onDelete,
  onStart,
  roundState,
  isAdmin,
  onLogin,
  adminData,
  isLoading,
}) {
  const [loadingMessage, setLoadingMessage] = useState("");
  const navigate = useNavigate();
  function notify() {
    toast.warning("Close the round", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "warning",
    });
  }

  function notifyClipboard() {
    toast.info("copied to clipboard!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function startHandler() {
    setLoadingMessage(`starting round ${roundNumber + 1}...`);
    onStart();
    setTimeout(function () {
      notify();
    }, stopTimer);
  }

  function clickHandler() {
    setLoadingMessage(`ending round  ${roundNumber}...`);
    onSubmit();
  }

  async function deleteHandler() {
    await onDelete(true);
    navigate(`/end`);
  }

  async function copyToClipboard() {
    const link = `${originInUse}explanation/player/${adminData.roomName}`;
    console.log(link);
    try {
      navigator.clipboard.writeText(link);
      notifyClipboard();
    } catch (error) {
      console.log("copy to clipboard failed");
    }
  }

  return (
    <div className="screen">
      <ToastContainer />
      <Navbar isAdmin={isAdmin} />
      <HeroText heroText={`The Admin Screen`} />
      <br />
      {isAdmin ? (
        <div className="admin-hero">
          <div className="round-status">
            {isLoading ? (
              <i>{loadingMessage}</i>
            ) : roundState ? (
              `Round ${roundNumber} is in progress`
            ) : roundNumber === 0 ? (
              "Start the Game"
            ) : (
              `Round ${roundNumber} has ended`
            )}
          </div>
          <br />
          <div className="admin-options-flex">
            {roundState ? (
              <button className=" btn  end-button" onClick={clickHandler}>
                End Round {roundNumber}
              </button>
            ) : (
              <div>
                <button
                  className=" btn start-button margin-left"
                  onClick={startHandler}
                >
                  Start Round {roundNumber + 1}
                </button>
                {roundNumber !== 0 ? (
                  <button
                    className="secondary-button btn margin-left"
                    onClick={deleteHandler}
                  >
                    End Simulation
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}
            <button
              className="btn primary-button margin-left"
              onClick={copyToClipboard}
            >
              Share Game Link
            </button>
          </div>
        </div>
      ) : (
        <Login onLogin={onLogin} />
      )}
    </div>
  );
}

export default AdminScreen;
