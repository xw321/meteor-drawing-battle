import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "../imports/api/points.js";
import "../imports/api/drawings.js";

Meteor.startup(() => {});

Accounts.onCreateUser((options, user) => {
  user.points = 0;
  user.type = "rest";
  user.drawingX = [];
  user.drawingY = [];
  return user;
});

// Server
Meteor.publish("userData", function() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: { points: 1 }
      }
    );
  } else {
    this.ready();
  }
});

Meteor.publish("userList", function() {
  return Meteor.users.find({});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});

// const q = new Queue();
