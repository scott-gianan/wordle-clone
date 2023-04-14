import React from "react";
//React Hooks
import { useState, useEffect } from "react";
//Components
import GuessResults from "./GuessResults/GuessResults";
import GuessInput from "./GuessInput/GuessInput";
//Assets
import WordData from "../../assets/WordData";

function Game() {
  const [tentativeGuess, setTentativeGuess] = useState([]);
  //const [guess, setGuess] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [answer, setAnswer] = useState("");
  const [turn, setTurn] = useState(0);
  useEffect(() => {
    const randomWord = WordData[Math.floor(Math.random() * WordData.length)];
    setAnswer(randomWord.toUpperCase());
  }, []);
  //I will probably keep this effect so that i'll know what is the answer
  useEffect(() => {
    console.log({ answer });
  }, [answer]);
  function handleSubmitGuess(submittedGuess) {
    setGuesses((prevGuesses) => [...prevGuesses, submittedGuess]);
    setTurn((prevTurn) => prevTurn + 1);
  }
  function handleEnterGuess(...nextTentGuess) {
    setTentativeGuess(nextTentGuess);
  }
  return (
    <>
      <GuessResults
        answer={answer}
        submittedGuess={guesses}
        tentativeGuess={tentativeGuess}
        turn={turn}
        guesses={guesses}
      />
      <GuessInput
        submitGuess={handleSubmitGuess}
        enterTentativeGuess={handleEnterGuess}
      />
    </>
  );
}

export default Game;
