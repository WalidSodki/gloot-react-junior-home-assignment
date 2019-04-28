import React from "react";
import ReactDOM from "react-dom";

import { getGames, addGame } from "./game-service";
import GameCard from "./components/GameCard";

import "./styles/Index.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      inputValue: ""
    };
  }

  componentDidMount = async () => {
    this.getGames();
  };

  getGames = async () => {
    const games = await getGames();
    this.setState({ games });
  };

  addGame = async name => {
    // Check if input is empty, if not add the game and reset input field
    if (this.state.inputValue != "") {
      this.setState({
        inputValue: ""
      });
      await addGame(name);
      this.getGames();
    }
  };

  inputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  // this function makes it possible to press enter to add a new game (instead of only being able to do it via button press)
  enterKeyDown = e => {
    if (e.key === "Enter") {
      this.addGame(this.state.inputValue);
    }
  };

  render() {
    const { games } = this.state;
    return (
      <>
        <h1>Game Library</h1>

        <div className="addGameContainer">
          <input
            placeholder="Enter name of game"
            value={this.state.inputValue}
            onChange={e => this.inputChange(e)}
            onKeyDown={e => this.enterKeyDown(e)}
          />
          <button onClick={() => this.addGame(this.state.inputValue)}>
            Add game
          </button>
        </div>

        <div className="row">
          {games &&
            games.map(game => (
              <GameCard
                key={game.id}
                gameId={game.id}
                name={game.name}
                getGames={this.getGames}
              />
            ))}
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app-container"));
