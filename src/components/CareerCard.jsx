// function CareerCard({ name, id, changeChoice, numberOfPeople, currentChoice }) {
//   function choiceHandler(id) {
//     switch (id) {
//       case 1:
//         changeChoice(1);
//         break;
//       case 2:
//         changeChoice(2);
//         break;
//       case 3:
//         changeChoice(3);
//         break;
//       case 4:
//         changeChoice(4);
//         break;
//       default:
//         break;
//     }
//   }

//   return (
//     <div className="career-card">
//       <h2>{name}</h2>
//       <p>
//         {numberOfPeople
//           ? `${numberOfPeople} have chosen this`
//           : "0 have chosen this"}
//       </p>
//       <button
//         className={currentChoice === id ? "chosen-btn" : "button"}
//         onClick={() => {
//           if (currentChoice !== id) {
//             choiceHandler(id);
//           }
//         }}
//       >
//         {currentChoice
//           ? currentChoice === id
//             ? "Chosen"
//             : "Change Career"
//           : "Choose Career"}
//       </button>
//     </div>
//   );
// }

// export default CareerCard;

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function CareerCard({ name, id, changeChoice, numberOfPeople, currentChoice }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 1 },
    });
  }, [numberOfPeople, controls]); // add numberOfPeople as a dependency

  function choiceHandler(id) {
    switch (id) {
      case 1:
        changeChoice(1);
        break;
      case 2:
        changeChoice(2);
        break;
      case 3:
        changeChoice(3);
        break;
      case 4:
        changeChoice(4);
        break;
      default:
        break;
    }
  }

  return (
    <div className="career-card">
      <h2>{name}</h2>
      <motion.p initial={{ y: -20, opacity: 0 }} animate={controls}>
        {numberOfPeople
          ? `${numberOfPeople} have chosen this`
          : "0 have chosen this"}
      </motion.p>
      <button
        className={currentChoice === id ? "chosen-btn" : "button"}
        onClick={() => {
          if (currentChoice !== id) {
            choiceHandler(id);
          }
        }}
      >
        {currentChoice
          ? currentChoice === id
            ? "Chosen"
            : "Change Career"
          : "Choose Career"}
      </button>
    </div>
  );
}

export default CareerCard;
