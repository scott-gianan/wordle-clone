import KeysArray from "../../../assets/Keyboard";
import { useId } from "react";
import "./Keyboard.css";
function KeyBoard(guesses, answer) {
  const keyId = useId();

  function RenderKeys() {
    return KeysArray.map((keys, index) => {
      return (
        <div key={index} className="key-wrapper">
          {keys.map((key) => {
            return (
              <div
                key={keyId + key}
                className={`${key.length > 1 ? "submit-key" : "letter-key"}`}
              >
                {key}
              </div>
            );
          })}
        </div>
      );
    });
  }
  return (
    <div className="keyboard-wrapper">
      <RenderKeys />
    </div>
  );
}

export default KeyBoard;
