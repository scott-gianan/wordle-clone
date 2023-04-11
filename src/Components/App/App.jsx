import "./App.css";
import Game from "../Game/Game";
import Header from "../Header/Header.jsx";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="game-wrapper">
        <Game />
      </div>
    </div>
  );
}

export default App;
