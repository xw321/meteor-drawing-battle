import { Meteor } from "meteor/meteor";
import { Games } from "./games.js";

const rec = new Array(400);
for (let i = 0; i < rec.length; i++) {
  rec[i] = new Array(400);
}
for(let i = 0; i < 400; i++){
  for(let j = 0; j < 400; j++){
    if((i >= 69 && i < 330) && (j >=69 && j <130)){
      rec[i][j] = 1;
    }
    else if((i >= 69 && i < 330) && (j >=269 && j <330)){
      rec[i][j] = 1;
    }
    else if((i >= 69 && i < 130) && (j >=129 && j <270)){
      rec[i][j] = 1;
    }
    else if((i >= 269 && i < 330) && (j >=129 && j <270)){
      rec[i][j] = 1;
    } else{
      rec[i][j] = 0;
    }
  }
}

class GameLogic {
  newGame() {
    if (!this.userIsAlreadyPlaying()) {
      Games.insert({
        player1: Meteor.userId(),
        player2: "",
        moves: [],
        status: "waiting",
        result: "",
        gameStartAt: 0
      });
    }
  }

  userIsAlreadyPlaying() {
    const game = Games.findOne({
      $or: [{ player1: Meteor.userId() }, { player2: Meteor.userId() }]
    });

    if (game !== undefined) return true;

    return false;
  }

  joinGame(game) {
    if (game.player2 === "" && Meteor.userId() !== undefined) {
      Games.update(
        { _id: game._id },
        {
          $set: {
            player2: Meteor.userId(),
            status: game.player1,
            gameStartAt: Date.now()
          }
        }
      );
    }
  }

  addNewMove(x, y) {
    console.log("gameLogic ----new move added. X: " + x + " Y: " + y);
    Games.update(
      { status: Meteor.userId() },
      {
        $push: {
          moves: { playerID: Meteor.userId(), moveX: x, moveY: y }
        }
      }
    );
  }

  setGameResult(gameId, result) {
    Games.update(
      { _id: gameId },
      {
        $set: {
          result: result,
          status: "end"
        }
      }
    );
  }

  updateTurn(game) {
    let nextPlayer;

    if (game.player1 === Meteor.userId()) nextPlayer = game.player2;
    else nextPlayer = game.player1;

    Games.update(
      { status: Meteor.userId() },
      {
        $set: {
          status: nextPlayer
        }
      }
    );
  }

  //TODO: need to check with original sketch, and return the winner's userId
  checkWinner() {
    const game = Games.findOne({ status: Meteor.userId() });
    let pts1 = 0;
    let pts2 = 0;
    for(let i=0; i<game.moves.length; i=i+2){
      if(rec[game.moves.Object.moveX, game.moves.Object.moveY] ===1) pts1++;
  
    }
    for(let j=1; j<game.moves.length; j=j+2){
      if(rec[game.moves.Object.moveX, game.moves.Object.moveY] ===1) pts2++;

    }
    if (pts1 >= pts2) {
      return game.player1;
    }
    else {
      return game.player2;
    } 
  }

  removeGame(gameId) {
    Games.remove({ _id: gameId });
  }

  removePlayer(gameId, player) {
    Games.update({ _id: gameId }, { $set: { [player]: "" } });
  }
}

export const gameLogic = new GameLogic();
