// this file should be redenred when a user logged in.
// it should display current user infomation (done), and all other logged in users info (TODO)

import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
// import { Status } from "../api/points.js";

class Players extends Component {
  findPlayer(event) {
    //TODO
    Meteor.call("user.readyPlay", (err, res) => {
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

  render() {
    return (
      <div>
        <div>Playing as: &nbsp;{Meteor.user().username}</div>
        <div>Your points: &nbsp;{Meteor.user().points}</div>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.findPlayer.bind(this)}
        >
          Play!
        </button>
      </div>
    );
  }
}

Players.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  Meteor.subscribe("userData");
  return {
    points: Meteor.users
      .find(
        { _id: Meteor.userId() },
        {
          fields: { points: 1 }
        }
      )
      .fetch(),
    user: Meteor.user()
  };
})(Players);
