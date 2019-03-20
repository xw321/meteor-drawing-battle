import { CanvasPaint } from "./CanvasPaint.jsx";
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

class Battle extends Component {
  componentDidMount() {
    Meteor.subscribe("Games");
  }

  render() {
    return (
      <div>
        <div>Ready to battle</div>
        <br />
        <div>{CanvasPaint}</div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    //points: Points.find({}).fetch()
  };
})(Battle);
