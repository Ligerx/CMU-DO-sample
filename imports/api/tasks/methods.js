import { Meteor } from 'meteor/meteor';
import { Tasks } from './tasks.js';

Meteor.methods({
  'tasks.insert'(name, due_on = null, is_sorted = false, is_urgent = false, is_important = false) {
    // console.log('In tasks.insert');

    // Make sure the user is logged in before inserting a task
    if (! this.userId) { throw new Meteor.Error('not-authorized'); }
    if (! name) { throw new Meteor.Error('task-name-blank'); }

    // console.log('Task should have been inserted');
    // console.log('User id is:');
    // console.log(this.userId);

    Tasks.insert({
      user_id: this.userId,
      created_on: new Date(),
      name,
      due_on,
      is_sorted,
      is_urgent,
      is_important,
    });
  },

  'tasks.massUpdate' (taskIds, name, due_on = null, is_sorted = true, is_urgent = false, is_important = false) {
    if (! this.userId) { throw new Meteor.Error('not-authorized'); }
    if (! name) { throw new Meteor.Error('task-name-blank'); }

    Tasks.update({
      "_id": { "$in": taskIds }
    },
    { '$set': {
        name,
        due_on,
        is_sorted,
        is_urgent,
        is_important,
      }
    },
    {
      'multi': true
    });
   },

  'tasks.toggle_completed' (taskId) {
    const task = Tasks.findOne({ _id: taskId });

    // console.log(taskId);
    // console.log(task);
    // console.log(this.userId);
    // console.log(task.user_id);

    if (this.userId !== task.user_id) { throw new Meteor.Error('not-authorized'); }

    // Toggle between null and a new date depending on if the current completed_on exists (falsy)
    const newCompletedOn = task.completed_on ? null : new Date();
    Tasks.update({ _id: taskId }, { $set: { completed_on: newCompletedOn } });
  },

  // Link to the boiler plate code from the tutorial if you wanna copy-pasta some stuff:
  // https://github.com/meteor/simple-todos/blob/master/imports/api/tasks.js

});
