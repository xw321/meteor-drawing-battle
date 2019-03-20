/* eslint-disable no-undef */
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
//import Players from "./Players.jsx";
import { Points } from "../api/points.js";
//import { Template } from "meteor/templating";
//import { Session } from "meteor/session";

class CanvasPaint extends Component {
  redraw() {
    const ctx = this.canvas.getContext("2d");

    ctx.fillStyle = "olive";

    for (const p of this.props.points) {
      ctx.fillRect(p.x, p.y, 5, 5);
    }
  }

  componentDidMount() {
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
    Points.insert({
      x,
      y,
      player: Meteor.user().username
    });
  }

  render() {
    return (
      <div>
        <div>Playing as {Meteor.user().username}</div>
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
  points: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  return {
    points: Points.find({}).fetch()
  };
})(CanvasPaint);
