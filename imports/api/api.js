import { Tasks } from './tasks/tasks.js'
import './tasks/methods.js'

if (Meteor.isServer) {
  console.log("PUBLISHING TASKS!!!");
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({ owner: this.userId });
  });

  Meteor.publish('urgent', function sort() {
    return Tasks.find({}, {sort: {is_urgent: 1}})
  })

  Meteor.publish('important', function sort() {
    return Tasks.find({}, {sort: {is_important: 1}})
  })

  Meteor.publish('sort', function sort() {
    return Tasks.find({}, {sort: {is_urgent: 1, is_important: 1}})
  })
}



export { Tasks }
