import { Tasks } from './tasks/tasks.js'
import './tasks/methods.js'

if (Meteor.isServer) {
  // Only publish tasks that belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({ user_id: this.userId });
  });

  console.log("PUBLISHING TASKS!!!");
}

export { Tasks }
