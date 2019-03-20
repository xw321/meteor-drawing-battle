/* eslint-disable no-undef */
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "../imports/api/points.js";
import "../imports/api/methods.js";

Accounts.onCreateUser((options, user) => {
  user.points = 0;
  user.type = "rest";
  user.drawingX = [];
  user.drawingY = [];
  return user;
});

// Server
Meteor.publish("userData", function() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: { points: 1 }
      }
    );
  } else {
    this.ready();
  }
});

Meteor.publish("userList", function() {
  return Meteor.users.find({});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});

// Meteor.publish("Games", function gamesPublication() {
//   return Games.find(
//     { status: "waiting" },
//     {
//       fields: {
//         status: 1,
//         player1: 1,
//         player2: 1
//       }
//     }
//   );
// });

// Meteor.publish("MyGame", function myGamePublication() {
//   return Games.find({
//     $or: [{ player1: this.userId }, { player2: this.userId }]
//   });
// });

// UserStatus.events.on("connectionLogout", fields => {
//   const game = Games.findOne({
//     $or: [{ player1: fields.userId }, { player2: fields.userId }]
//   });

//   if (game != undefined) {
//     if (game.status !== "waiting" && game.status !== "end") {
//       if (game.player1 === fields.userId) {
//         gameLogic.setGameResult(game._id, game.player2);
//         gameLogic.removePlayer(game._id, "player1");
//       } else if (game.player2 === fields.userId) {
//         gameLogic.setGameResult(game._id, game.player1);
//         gameLogic.removePlayer(game._id, "player2");
//       }
//     } else {
//       if (game.player1 === "" || game.player2 === "") {
//         gameLogic.removeGame(game._id);
//       } else {
//         if (game.player1 === fields.userId)
//           gameLogic.removePlayer(game._id, "player1");
//         else if (game.player2 === fields.userId)
//           gameLogic.removePlayer(game._id, "player2");
//       }
//     }
//   }
// });

Meteor.startup(() => {});
// const q = new Queue();
// TODO:
// have a readyPlayerQueue, push ready players in it, while queue.size >=2, pop 2 players and rediect
// them to another page to do cavas drawing
// that page should be only accessblbe by those two players

// let user1 = Meteor.users.find({ username: "test0" });
// let user2 = Meteor.users.find({ username: "test1" });

// console.log("player 1: " + user1);
// console.log("player 2: " + user2);
