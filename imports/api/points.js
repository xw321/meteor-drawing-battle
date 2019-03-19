// work in progress, added readyPlay method for testing

//import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Users = Meteor.users;

Meteor.methods({
  "user.readyPlay"() {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    // update user status field to be "ready"
    Users.update(Meteor.userId(), { $set: { type: "ready" } });
  }
});
