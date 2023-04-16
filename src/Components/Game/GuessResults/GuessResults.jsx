//Components
import Guess from "../Guess/Guess";
import SubmittedGuess from "../SubmittedGuess/SubmittedGuess";
//dependencies
import { range } from "lodash";
//css
import "./GuessResults.css";
function GuessResults({ tentativeGuess, turn, guesses, answer }) {
  return (
    <div className="guess-board">
      {range(6).map((num) => {
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
      })}
    </div>
  );
}
export default GuessResults;
