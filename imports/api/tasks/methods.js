import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tasks } from './tasks.js';

Meteor.methods({
  'tasks.insert'(name, due_on, is_urgent, is_important ) {
    // check(text, String);
    new SimpleSchema({
      taskId: {type: Number},
      name: { type: String },
      completed_on: {type: Date, optional: true},
      created_on: {type: Date},
      due_on: { type: Date },
      is_urgent: { type: Boolean},
      is_important: { type: Boolean}
    }).validate({ name, due_on, is_urgent, is_important});
    // Make sure the user is logged in before inserting a task
    // if (! this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Tasks.insert({
      taskId: Math.floor((Math.random() * 10000)),
      name,
      created_on: new Date(),
      due_on,
      is_urgent,
      is_important
      // owner: this.userId,
      // username: Meteor.users.findOne(this.userId).username,
    });
  },
  // 'tasks.remove'(taskId) {
  //   check(taskId, String);

  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can delete it
  //     throw new Meteor.Error('not-authorized');
  //   }

  //   Tasks.remove(taskId);
  // },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);

  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can check it off
  //     throw new Meteor.Error('not-authorized');
  //   }


  'tasks.update' (taskId, completed_on) {
    // Tasks.update( {taskId: taskId }, {completed_on: completed_on});
   },

  'tasks.complete_task' (taskId) {
    Tasks.update({ _id: taskId }, { completed_on: new Date() });
  },

  // },
  // 'tasks.setPrivate'(taskId, setToPrivate) {
  //   check(taskId, String);
  //   check(setToPrivate, Boolean);

  //   const task = Tasks.findOne(taskId);

  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }

  //   Tasks.update(taskId, { $set: { private: setToPrivate } });
  // },
});
