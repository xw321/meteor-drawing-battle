import { Mongo } from "meteor/mongo";
//import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { gameLogic } from "./gameLogic.js";

export const Games = new Mongo.Collection("games");

Meteor.methods({
  "games.play"() {
    const game = Games.findOne({ status: "waiting" });

    if (game === undefined) {
      console.log("no waiting game found, Starting a new Game");
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
      console.log("games.makeMove --- Find Game!!");
      let currtime = Date.now();
      if (currtime - game.gameStartAt <= 15000) {
        gameLogic.addNewMove(x, y);
        gameLogic.updateTurn(game);
      } else {
        // time is up, need to check who is winner
        // winner variable is a userId
        let winner = gameLogic.checkWinner();
        gameLogic.setGameResult(game._id, winner);
      }
    }
  }
});
