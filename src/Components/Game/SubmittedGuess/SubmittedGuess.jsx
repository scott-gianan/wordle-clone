import "./SubmittedGuess.css";
import { checkGuess } from "../../../assets/game-helper";

function SubmittedGuess({ submittedGuess, answer }) {
  const checkSubmittedGuess = checkGuess(submittedGuess, answer);
  return (
    <p className="guess">
      {checkSubmittedGuess.map((letter, index) => {
        return (
          <span className={`cell ${letter.status}`} key={index}>
            {letter.letter}
          </span>
        );
      })}
    </p>
  );
}
export default SubmittedGuess;
