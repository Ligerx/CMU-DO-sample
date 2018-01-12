import { Tasks } from './tasks/tasks.js'
import './tasks/methods.js'

if (Meteor.isServer) {
  // Only publish tasks that belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({ user_id: this.userId });
  });

  // Publish additional information from the User collection
  Meteor.publish("userData", function () {
    if (this.userId) {

      // console.log("In API.js, testing what's sent to the client")
      // console.log(Meteor.users.find({_id: this.userId},
                               // {fields: {'completedOnboarding': 1}}).fetch());

      return Meteor.users.find({_id: this.userId},
                               {fields: {'completedOnboarding': 1}});
    } else {
      this.ready();
    }
  });
}

export { Tasks }
