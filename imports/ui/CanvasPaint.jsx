/* eslint-disable no-undef */
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Games } from "../lib/games.js";

class CanvasPaint extends Component {
  redraw() {
    const ctx = this.canvas.getContext("2d");

    if (this.props.game !== undefined) {
      for (const p of this.props.game[0].moves) {
        if (p.playerID === Meteor.userId()) {
          ctx.fillStyle = "blue";
        } else {
          ctx.fillStyle = "red";
        }
        ctx.fillRect(p.moveX, p.moveY, 5, 5);
      }
    }
  }

  componentDidMount() {
    Meteor.subscribe("Games");
    Meteor.subscribe("MyGame");
    this.redraw();
  }

  componentDidUpdate() {
    this.redraw();
  }

  onClick(evt) {
    // Get the coords
    const x = evt.clientX - this.canvas.offsetLeft,
      y = evt.clientY - this.canvas.offsetTop;

    console.log(
      "Click on " + x + " , " + y + " by user: " + Meteor.user().username
    );

    // Insert in the database. Meteor will automatically redraw the component when the db changes
    // Points.insert({
    //   x,
    //   y,
    //   player: Meteor.user().username
    // });
    Meteor.call("games.makeMove", x, y);
  }

  render() {
    return (
      <div>
        <canvas
          width="400"
          height="400"
          style={{ backgroundColor: "#eee" }}
          ref={canvas => (this.canvas = canvas)}
          onClick={this.onClick.bind(this)}
        />
      </div>
    );
  }
}

CanvasPaint.propTypes = {
  game: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  Meteor.subscribe("Games");
  Meteor.subscribe("MyGame");

  return {
    //Games.find({}).fetch()
    game: Games.find({}).fetch()
  };
})(CanvasPaint);
