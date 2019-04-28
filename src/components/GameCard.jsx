import React, { Component } from "react";

import { deleteGame, editGame } from "../game-service";

import "../styles/GameCard.scss";

export default class GameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      image: "",
      edit: false
    };
  }

  // Call the unsplash API everytime a new GameCard component is mounted
  // this is to try to get unique images for each card (duplicates can still happen)
  componentDidMount = async () => {
    fetch("https://source.unsplash.com/collection/2348098/512x512")
      .then(res => {
        this.setState({
          image: res.url
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  inputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  deleteGame = async id => {
    await deleteGame(id);
    this.props.getGames();
  };

  editGame = async (id, newName) => {
    if (this.state.inputValue != "") {
      this.setState({
        inputValue: ""
      });
      await editGame(id, newName);
    }
    this.props.getGames();
    this.editMode();
  };

  // toggle between viewing the game cards and editing them
  editMode = () => {
    this.setState(prevState => ({
      edit: !prevState.edit
    }));
  };

  render() {
    return (
      <div className="gameCard">
        <img src={this.state.image} alt={this.props.name} />
        {this.state.edit ? (
          <input
            placeholder={this.props.name}
            value={this.state.inputValue}
            onChange={e => this.inputChange(e)}
          />
        ) : (
          <label>{this.props.name}</label>
        )}

        <div className="buttonContainer">
          <button
            className="editButton"
            onClick={() => {
              this.state.edit
                ? this.editGame(this.props.gameId, this.state.inputValue)
                : this.editMode();
            }}
          >
            {this.state.edit ? "Save" : "Edit"}
          </button>

          <button
            className="deleteButton"
            onClick={() => {
              this.state.edit
                ? this.editMode()
                : this.deleteGame(this.props.gameId);
            }}
          >
            {this.state.edit ? "Cancel" : "Delete"}
          </button>
        </div>
      </div>
    );
  }
}
