//hooks
import { useEffect, useState } from "react";
//assets
import KeysArray from "../../../assets/Keyboard";
import { checkGuess } from "../../../assets/game-helper";

import "./Keyboard.css";
function KeyBoard({ guesses, answer, turn }) {
  const [keys, setKeys] = useState(KeysArray);
  //start of useEffect
  useEffect(() => {
    const currentSubmittedGuess = checkGuess(guesses[turn - 1], answer);
    if (currentSubmittedGuess === null) return;
    const newKeys = keys.map((key) => {
      const matchedKey = currentSubmittedGuess.find(
        (submittedLetter) => submittedLetter.letter === key.letter
      );
      if (matchedKey) {
        if (key.status === "correct" && matchedKey.status !== "correct") {
          matchedKey.status = "correct";
        } else if (
          key.status === "misplaced" &&
          matchedKey.status === "incorrect"
        ) {
          matchedKey.status = "misplaced";
        }
      }
      return matchedKey ? matchedKey : key;
    });
    setKeys(newKeys);
  }, [guesses]);
  //end of useEffect
  function RenderKeys() {
    const topKeys = keys.map((key, index) => {
      return index <= 9 ? (
        <div key={index} className={`letter-key ${key.status}`}>
          {key.letter}
        </div>
      ) : (
        ""
      );
    });
    const middleKeys = keys.map((key, index) => {
      return index > 9 && index <= 18 ? (
        <div key={index} className={`letter-key ${key.status}`}>
          {key.letter}
        </div>
      ) : (
        ""
      );
    });
    const bottomKeys = keys.map((key, index) => {
      return index > 18 && index <= 27 ? (
        <div
          key={index}
          className={`${index === 19 ? "submit-key" : "letter-key"} ${
            key.status
          }`}
        >
          {key.letter}
        </div>
      ) : (
        ""
      );
    });
    return (
      <div className="keyboard-wrapper">
        <div className="key-wrapper">{topKeys}</div>
        <div className="key-wrapper">{middleKeys}</div>
        <div className="key-wrapper">{bottomKeys}</div>
      </div>
    );
  }
  return (
    <div className="keyboard-wrapper">
      <RenderKeys />
    </div>
  );
}

export default KeyBoard;
// function KeyBoard({ guesses, answer, turn }) {
//   const keyId = useId();
//   const currentSubmittedGuess = checkGuess(guesses[turn - 1], answer);
//   console.log(currentSubmittedGuess);
//   function checkKeyStatus(letter, guessArray) {
//     if (guessArray === null) {
//       return;
//     }
//     const keyStatus = guessArray.find((key) => key.letter === letter);
//     return keyStatus ? keyStatus.status : "";
//   }
//   function RenderKeys() {
//     return KeysArray.map((keys, index) => {
//       return (
//         <div key={index} className="key-wrapper">
//           {keys.map((key) => {
//             const status = checkKeyStatus(key, currentSubmittedGuess);
//             return (
//               <div
//                 key={keyId + key}
//                 className={`${
//                   key.length > 1 ? "submit-key" : "letter-key"
//                 } ${status}`}
//               >
//                 {key}
//               </div>
//             );
//           })}
//         </div>
//       );
//     });
//   }
//   return (
//     <div className="keyboard-wrapper">
//       <RenderKeys />
//     </div>
//   );
// }
