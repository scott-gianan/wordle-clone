// reacc hooks
import { useEffect, useState } from "react";
//dependencies
import toast from "react-simple-toasts";
//components
import KeyBoard from "../Keyboard/Keyboard";
//css
import "./GuessInput.css";

function GuessInput({
  submitGuess,
  enterTentativeGuess,
  guesses,
  answer,
  turn,
}) {
  const [guess, setGuess] = useState("");
  //start of effect for keyboard event listener
  useEffect(() => {
    //console.log("keydown event");
    //start of callback function for keydown event listener
    const handleKeyDown = (event) => {
      const key = event.code; //KeyA, KeyB...etc.
      const letter = key.slice(key.length - 1, key.length);
      //this if statement will prevent the user to enter anymore letters unless it's the ENTER key (submit guess) or Backspace key
      if (guess.length === 5) {
        if (key === "Backspace") {
          setGuess((prevGuess) => prevGuess.slice(0, prevGuess.length - 1));
        } else if (key === "Enter") {
          submitGuess(guess);
          setGuess("");
        }
        return;
      }
      //this if statement will run if the entered key is a letter and backspace.
      //if the key entered is enter and the guess entered is less than 5, there will be a warning in the console.
      //TODO: include a banner/alert for the user if the entered letters is less than 5
      if (key.includes("Key")) {
        setGuess((prevGuess) => prevGuess + letter);
      } else if (key === "Backspace") {
        setGuess((prevGuess) => prevGuess.slice(0, prevGuess.length - 1));
      } else if (key === "Enter" && guess.length < 5) {
        toast("Not Enough Letters", {
          time: 1000,
          position: "top-center",
          clickable: true,
          clickClosable: true,
        });
        return;
      }
    };
    //end of callback function for keydown event listener
    window.addEventListener("keydown", handleKeyDown);
    enterTentativeGuess(...guess);
    //clean up function for useEffect
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess]);
  //end of effect for keyboard event listener

  //start of effect for click event listener
  useEffect(() => {
    //start of callback function for window click event listener
    const handleClick = (event) => {
      const clickedTile = event.target;
      const allowedTiles =
        clickedTile.className.includes("letter-key") || //letters and backspace
        clickedTile.className.includes("submit-key"); //submit key is enter
      //this if statement checks if the user clicked the allowed tile (letters, backspace and enter)
      if (allowedTiles) {
        //will prevent the user to add another letter to the guess is already at 5 letters unless it's the backspace tile or the enter tile
        if (guess.length === 5) {
          if (clickedTile.textContent === "⬅") {
            setGuess((prevGuess) => prevGuess.slice(0, prevGuess.length - 1));
          } else if (clickedTile.textContent === "ENTER") {
            submitGuess(guess);
            setGuess("");
          }
          return;
        } else if (clickedTile.textContent === "⬅") {
          setGuess((prevGuess) => prevGuess.slice(0, prevGuess.length - 1));
        } else {
          if (clickedTile.textContent === "ENTER" && guess.length < 5) {
            toast("Not Enough Letters", {
              time: 1000,
              position: "top-center",
              clickable: true,
              clickClosable: true,
            });
            return;
          }
          setGuess((prevGuess) => prevGuess + clickedTile.textContent);
        }
      }
      //end of if statement
    };
    //end of callback function for window click event listener
    window.addEventListener("click", handleClick);
    enterTentativeGuess(...guess);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [guess]);
  //end of effect for click event listener
  return (
    <>
      <KeyBoard guesses={guesses} answer={answer} turn={turn} />
    </>
  );
}

export default GuessInput;
