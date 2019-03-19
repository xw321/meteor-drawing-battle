// not useful now, will be cleaned later.

//import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Users = Meteor.users;

Meteor.methods({
  "user.readyPlay"() {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Users.update(Meteor.userId(), { $set: { status: "ready" } });
  }
});
