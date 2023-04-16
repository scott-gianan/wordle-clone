import React from "react";
//React Hooks
import { useState, useEffect } from "react";
//Components
import GuessResults from "./GuessResults/GuessResults";
import GuessInput from "./GuessInput/GuessInput";
import ResetButton from "./ResetButton/ResetButton";
//Assets
import WordData from "../../assets/WordData";
//third parties
import toast from "react-simple-toasts";
import Confetti from "react-confetti";

function Game() {
  const [tentativeGuess, setTentativeGuess] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [answer, setAnswer] = useState("");
  const [turn, setTurn] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [isGameWon, setIsGameWon] = useState(false);
  useEffect(() => {
    const randomWord = WordData[Math.floor(Math.random() * WordData.length)];
    setAnswer(randomWord.toUpperCase());
  }, []);
  //I will probably keep this effect so that i'll know what is the answer
  useEffect(() => {
    console.log({ answer });
  }, [answer]);
  useEffect(() => {
    if (turn === 6) {
      toast(
        `You used up all your number of tries. 
        Click the reset button to try again!`,
        {
          time: 5000,
          position: "bottom-center",
          clickable: true,
          clickClosable: true,
        }
      );
      setIsGameRunning(false);
    }
  }, [turn]);
  function handleSubmitGuess(submittedGuess) {
    if (submittedGuess === answer) {
      toast(`Congratulations! you guessed the right word!`, {
        time: 5000,
        position: "bottom-center",
        clickable: true,
        clickClosable: true,
      });
      setIsGameRunning(false);
      setIsGameWon(true);
      setGuesses((prevGuesses) => [...prevGuesses, submittedGuess]);
      return;
    }
    setGuesses((prevGuesses) => [...prevGuesses, submittedGuess]);
    setTurn((prevTurn) => prevTurn + 1);
  }
  function handleEnterGuess(...nextTentGuess) {
    setTentativeGuess(nextTentGuess);
  }
  function handleButtonClick() {
    setTurn(0);
    setGuesses([]);
    setTentativeGuess([]);
    setIsGameWon(false);
    setAnswer(() => {
      const randomWord = WordData[Math.floor(Math.random() * WordData.length)];
      return randomWord.toUpperCase();
    });
    setIsGameRunning(true);
  }
  return (
    <>
      {isGameWon && <Confetti />}
      <GuessResults
        answer={answer}
        submittedGuess={guesses}
        tentativeGuess={tentativeGuess}
        turn={turn}
        guesses={guesses}
      />
      {isGameRunning ? (
        <GuessInput
          submitGuess={handleSubmitGuess}
          enterTentativeGuess={handleEnterGuess}
          guesses={guesses}
          answer={answer}
        />
      ) : (
        <ResetButton onClick={handleButtonClick} />
      )}
    </>
  );
}

export default Game;
