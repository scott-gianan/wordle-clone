import React from "react";
//Components
import Guess from "../Guess/Guess";
import SubmittedGuess from "../SubmittedGuess/SubmittedGuess";
//dependencies
import { range } from "lodash";
function GuessResults({ tentativeGuess, turn, guesses, answer }) {
  return range(6).map((num) => {
    const submittedGuess = guesses[num];
    return submittedGuess ? (
      <SubmittedGuess
        key={num}
        submittedGuess={submittedGuess}
        answer={answer}
      />
    ) : (
      <Guess
        key={num}
        tentativeGuess={num === turn ? tentativeGuess : ""}
        turn={turn}
        guesses={guesses}
      />
    );
  });
}
export default GuessResults;
