//dependencies
import { range } from "lodash";
//css
import "./Guess.css";

function Guess({ tentativeGuess, turn, guesses }) {
  return (
    <p className="guess">
      {range(5).map((num) => {
        const letter = tentativeGuess[num];
        return letter ? (
          <span className="cell" key={num}>
            {letter}
          </span>
        ) : (
          <span className="cell" key={num}></span>
        );
      })}
    </p>
  );
}
export default Guess;
