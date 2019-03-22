/* eslint-disable no-undef */
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Games } from "../lib/games.js";
import Counter from "./Counter.jsx";

function isGameEnd() {
  if (Session.get("inGame")) {
    let myGame = Games.findOne();

    if (myGame !== undefined) {
      if (myGame.status === "end") {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
}

class CanvasPaint extends Component {
  redraw() {
    const ctx = this.canvas.getContext("2d");

    if (this.props.game !== undefined && this.props.game[0] !== undefined) {
      let movesArr = this.props.game[0].moves;
      for (let p = 0; p < movesArr.length; p++) {
        if (movesArr[p].playerID === Meteor.userId()) {
          ctx.fillStyle = "blue";
        } else {
          ctx.fillStyle = "red";
        }
        ctx.fillRect(movesArr[p].moveX, movesArr[p].moveY, 5, 5);
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

    // console.log(
    //   "Click on " + x + " , " + y + " by user: " + Meteor.user().username
    // );

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
        <div> 
          <br />
          {"Imitate the sketch in the middle of the canvas"}
          <img src={"imgs/Drawing1.png"} height = "20%" width = "20%" alt="sketch"/>
        </div>
        <br />
        <canvas
          width="400"
          height="400"
          style={{ backgroundColor: "#eee" }}
          ref={canvas => (this.canvas = canvas)}
          onClick={this.onClick.bind(this)}
        />
        <br />
        <div>
          {this.props.isGameEnd ? (
            <div>
              <h2 className="text-center subtitle">
                <span className="text-center">&nbsp;{"Game End!"}&nbsp;</span>
              </h2>{" "}
            </div>
          ) : (
            <Counter />
          )}
        </div>
      </div>
    );
  }
}

CanvasPaint.propTypes = {
  game: PropTypes.arrayOf(PropTypes.object).isRequired,
  isGameEnd: PropTypes.bool
};

export default withTracker(() => {
  Meteor.subscribe("Games");
  Meteor.subscribe("MyGame");

  return {
    //Games.find({}).fetch()
    game: Games.find({}).fetch(),
    isGameEnd: isGameEnd()
  };
})(CanvasPaint);
