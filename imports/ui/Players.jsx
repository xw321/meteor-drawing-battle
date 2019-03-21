// this file should be redenred when a user logged in.
// it should display current user infomation (done), and all other logged in users info (TODO)

import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import CanvasPaint from "./CanvasPaint.jsx";
import { Session } from "meteor/session";
import { Games } from "../lib/games.js";

function getOpponentName() {
  if (Session.get("inGame")) {
    console.log("in game true");
    let myGame = Games.findOne();
    if (myGame.status === "waiting") {
      return "";
    } else {
      return myGame.player1 === Meteor.userId()
        ? "Opponent player : " +
            Meteor.users.find({ _id: myGame.player2 }).fetch()[0].username
        : "Opponent player : " +
            Meteor.users.find({ _id: myGame.player1 }).fetch()[0].username;
    }
  } else {
    return "";
  }
}

function setStatus() {
  if (Session.get("inGame")) {
    console.log("in game true");
    let myGame = Games.findOne();

    if (myGame.status === "waiting") {
      // this.setState({
      //   status: "Looking for an opponent..."
      // });
      return "Looking for an opponent...";
    } else if (myGame.status === Meteor.userId()) {
      // this.setState({
      //   status: "Your turn"
      // });
      return "Your turn";
    } else if (myGame.status !== Meteor.userId() && myGame.status !== "end") {
      // this.setState({
      //   status: "opponent's turn"
      // });
      return "opponent's turn";
    } else if (myGame.result === Meteor.userId()) {
      // this.setState({
      //   status: "Your Won"
      // });
      return "Your won";
    } else if (
      myGame.status === "end" &&
      myGame.result !== Meteor.userId() &&
      myGame.result !== "tie"
    ) {
      // this.setState({
      //   status: "Your lost"
      // });
      return "Your lost";
    } else if (myGame.result === "tie") {
      // this.setState({
      //   status: "tie"
      // });
      return "tie";
    } else {
      // this.setState({
      //   status: "..."
      // });
      return "...";
    }
  } else {
    return "not played yet, what you waiting for?";
  }
}

class Players extends Component {
  constructor(props) {
    super(props);

    this.setStatus = this.setStatus.bind(this);
    this.state = {
      isReady: false,
      status: "not played yet, what you waiting for?"
    };
  }

  componentDidMount() {
    Meteor.subscribe("Games");
    this.setStatus();
  }

  readyPlayer(event) {
    Session.set("inGame", true);
    Meteor.call("games.play");
    Meteor.subscribe("MyGame");
    this.setStatus();
    console.log("on btn clik event " + event);
    console.log("curr status " + this.state.status);
  }

  setStatus() {
    if (Session.get("inGame")) {
      console.log("in game true");
      let myGame = Games.findOne();

      if (myGame.status === "waiting") {
        // this.setState({
        //   status: "Looking for an opponent..."
        // });
        return "Looking for an opponent...";
      } else if (myGame.status === Meteor.userId()) {
        // this.setState({
        //   status: "Your turn"
        // });
        return "Your turn";
      } else if (myGame.status !== Meteor.userId() && myGame.status !== "end") {
        // this.setState({
        //   status: "opponent's turn"
        // });
        return "opponent's turn";
      } else if (myGame.result === Meteor.userId()) {
        // this.setState({
        //   status: "Your Won"
        // });
        return "Your won";
      } else if (
        myGame.status === "end" &&
        myGame.result !== Meteor.userId() &&
        myGame.result !== "tie"
      ) {
        // this.setState({
        //   status: "Your lost"
        // });
        return "Your lost";
      } else if (myGame.result === "tie") {
        // this.setState({
        //   status: "tie"
        // });
        return "tie";
      } else {
        // this.setState({
        //   status: "..."
        // });
        return "...";
      }
    }
  }

  // takeRest(event) {
  //   Meteor.call("user.takeRest", (err, res) => {
  //     if (err) {
  //       alert("There was error , check the console");
  //       console.log(err);
  //       return;
  //     }

  //     console.log("change user status", res);
  //   });
  //   event.preventDefault();
  //   console.log("button Clicked" + JSON.stringify(Meteor.user()));
  // }

  // test
  // renderPlayers() {
  //   return this.props.players.map(m => (
  //     <div className="card" key={m._id}>
  //       {m.username} : {m.type}
  //     </div>
  //   ));
  // }

  render() {
    return (
      <div>
        <div>Playing as: &nbsp;{Meteor.user().username}</div>
        <div>Your points: &nbsp;{Meteor.user().points}</div>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.readyPlayer.bind(this)}
        >
          Play!
        </button>
        <br />
        <br />
        <div>Game Status : {this.props.status}</div>
        <br />
        <div>{this.props.opponent}</div>
        <br />
        <div>
          {this.props.status === "not played yet, what you waiting for?" ? (
            <div>----</div>
          ) : (
            <CanvasPaint />
          )}
        </div>
      </div>
    );
  }
}

Players.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  opponent: PropTypes.string.isRequired
};

export default withTracker(() => {
  Meteor.subscribe("userData");
  Meteor.subscribe("userStatus");
  Meteor.subscribe("userList");
  Meteor.subscribe("MyGame");
  return {
    points: Meteor.users
      .find(
        { _id: Meteor.userId() },
        {
          fields: { points: 1 }
        }
      )
      .fetch(),
    user: Meteor.user(),
    players: Meteor.users.find({ type: "ready" }).fetch(),
    status: setStatus(),
    opponent: getOpponentName()
  };
})(Players);
