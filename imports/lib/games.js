import { Mongo } from "meteor/mongo";
//import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { gameLogic } from "./gameLogic.js";

export const Games = new Mongo.Collection("games");

Meteor.methods({
  "games.play"() {
    const game = Games.findOne({ status: "waiting" });

    if (game === undefined) {
      console.log("no game found, Starting a new Game");
      gameLogic.newGame();
    } else if (
      game !== undefined &&
      game.player1 !== this.userId &&
      game.player2 === ""
    ) {
      console.log("Join Game");
      gameLogic.joinGame(game);
    }
  },

  "games.makeMove"(x, y) {
    let game = Games.findOne({ status: this.userId });

    if (game !== undefined) {
      gameLogic.addNewMove(x, y);

      if (gameLogic.checkIfGameWasWon()) {
        gameLogic.setGameResult(game._id, this.userId);
      } else {
        if (game.movesX.length === 8) {
          gameLogic.setGameResult(game._id, "tie");
        } else {
          gameLogic.updateTurn(game);
        }
      }
    }
  }
});
