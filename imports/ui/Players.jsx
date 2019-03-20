// this file should be redenred when a user logged in.
// it should display current user infomation (done), and all other logged in users info (TODO)

import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      gameID: ""
    };
  }

  readyPlayer(event) {
    Meteor.call("user.addToGame", Meteor.user(), (err, res) => {
      if (err) {
        alert("There was error , check the console");
        console.log(err);
        return;
      }
      console.log("add user to game, ID str is " + JSON.stringify(res));
      if (res != undefined) {
        this.setState({
          gameID: JSON.stringify(res)
        });
      }
    });

    this.setState({
      isReady: true
    });

    event.preventDefault();
    //console.log("button Clicked" + JSON.stringify(Meteor.user()));
  }

  takeRest(event) {
    Meteor.call("user.takeRest", (err, res) => {
      if (err) {
        alert("There was error , check the console");
        console.log(err);
        return;
      }

      console.log("change user status", res);
    });
    event.preventDefault();
    console.log("button Clicked" + JSON.stringify(Meteor.user()));
  }

  // test
  renderPlayers() {
    return this.props.players.map(m => (
      <div className="card" key={m._id}>
        {m.username} : {m.type}
      </div>
    ));
  }

  render() {
    if (this.state.isReady) {
      return <Redirect to={"/play/" + this.state.gameID} />;
    } else {
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.takeRest.bind(this)}
          >
            Take a rest!
          </button>
          <br />
          <div> {this.renderPlayers()}</div>
        </div>
      );
    }
  }
}

Players.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  Meteor.subscribe("userData");
  Meteor.subscribe("userStatus");
  Meteor.subscribe("userList");
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
    players: Meteor.users.find({ type: "ready" }).fetch()
  };
})(Players);
