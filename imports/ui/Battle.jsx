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
        <img
          className="border border-primary"
          src={
            "https://cdn.pixabay.com/photo/2013/07/18/10/58/happy-163657_1280.jpg"
          }
          alt="given img"
          width="400"
          height="400"
        />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    //points: Points.find({}).fetch()
  };
})(Battle);
