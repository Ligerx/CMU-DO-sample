import { Tasks } from './tasks/tasks.js'
import './tasks/methods.js'

if (Meteor.isServer) {
  console.log("PUBLISHING TASKS!!!");
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({ user_id: this.userId });
  });
}

export { Tasks }
