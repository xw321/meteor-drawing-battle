import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import "../../client/main.css";

// SImply displaying top 10 players sorting by their points
class Top extends Component {
  renderPlayers() {
    return this.props.players.map(m => (
      /*
      <div className="row" key={m._id}>
        <div className="card text-white bg-secondary mb-3 col-3" max-width="10rem" >
          <img className="card-img-top" src="imgs/3.jpeg" height="30%" width="30%" alt="Card image cap"/>
          <div className ="card-body">
            <p> Name: {m.username} </p>
            <p> Points: {m.points} </p>
          </div>
        </div>
      </div>
      */
      <div className="top" key={m._id}>
        <div className="Comment  bg-white" >
          <span className="font-weight-bold"> 👤 </span>
          <br />
          <span className="font-weight-bold">Name: {m.username} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Points: {m.points}</span>
          <br />
          <br />
          <br />
        </div>
      </div>
      
    ));
  }

  render() {
    return (
      <div className="top">
        <br />
        <br />
        <div> {this.renderPlayers()}</div>

        <br />
      </div>
    );
  }
}

Top.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  Meteor.subscribe("userList");
  return {
    players: Meteor.users
      .find(
        {},
        {
          limit: 10,
          sort: {
            points: -1
          }
        }
      )
      .fetch()
  };
})(Top);
