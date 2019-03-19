// not useful now, will be used when playing feature is up

// work in progress, added readyPlay method for testing

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

Meteor.methods({
  "user.takeRest"() {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    // update user status field to be "ready"
    Users.update(Meteor.userId(), { $set: { type: "rest" } });
  }
});
// if (Meteor.isServer) {
//   Meteor.publish("drawings", function messagesPublish() {
//     return Messages.find(
//       {},
//       {
//         limit: 10,
//         sort: {
//           createdAt: -1
//         }
//       }
//     );
//   });
// }

// Meteor.methods({
//   "drawings.insert"(message) {
//     check(message, String);

//     // Make sure the user is logged in before inserting a task
//     if (!this.userId) {
//       throw new Meteor.Error("not-authorized");
//     }

//     Messages.insert({
//       message: message,
//       createdAt: Date.now(),
//       owner: Meteor.user().username
//     });
//   }
// });
