// not useful now, will be used when playing feature is up

import { Mongo } from "meteor/mongo";
// import { Meteor } from "meteor/meteor";
// import { check } from "meteor/check";

export const Points = new Mongo.Collection("points");

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
