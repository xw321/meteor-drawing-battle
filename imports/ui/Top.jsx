import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

// SImply displaying top 10 players sorting by their points
class Top extends Component {
  renderPlayers() {
    return this.props.players.map(m => (
      <div className="card" key={m._id}>
        {m.username} : {m.points}
      </div>
    ));
  }

  render() {
    return (
      <div>
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
