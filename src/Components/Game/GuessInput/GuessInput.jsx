import { useEffect, useState } from "react";
import KeyBoard from "../Keyboard/Keyboard";
import "./GuessInput.css";

function GuessInput() {
  const [guess, setGuess] = useState("");

  //start of effect for keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.code;
      const letter = key.slice(key.length - 1, key.length);

      if (guess.length === 5) {
        if (key === "Backspace") {
          setGuess((prevGuess) => prevGuess.slice(0, prevGuess.length - 1));
        }
        return;
      }

      if (key.includes("Key")) {
        setGuess((prevGuess) => prevGuess + letter);
      } else if (key === "Backspace") {
        setGuess((prevGuess) => prevGuess.slice(0, prevGuess.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess]);
  //end of effect for keyboard event listener

  return (
    <>
      <h1>{guess}</h1>
      <KeyBoard />
    </>
  );
}

export default GuessInput;
