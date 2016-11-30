import { Meteor } from 'meteor/meteor';
import { Tasks } from './tasks.js';

Meteor.methods({
  'tasks.insert'(name, due_on = null, is_sorted = false, is_urgent = false, is_important = false) {
    console.log('In tasks.insert');

    // Make sure the user is logged in before inserting a task
    if (! this.userId) { throw new Meteor.Error('not-authorized'); }
    if (! name) { throw new Meteor.Error('task-name-blank'); }

    console.log('Task should have been inserted');
    console.log('User id is:');
    console.log(this.userId);

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

  // 'tasks.remove'(taskId) {

  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can delete it
  //     throw new Meteor.Error('not-authorized');
  //   }

  //   Tasks.remove(taskId);
  // },
  // 'tasks.setChecked'(taskId, setChecked) {

  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can check it off
  //     throw new Meteor.Error('not-authorized');
  //   }


  'tasks.update' (taskId, completed_on) {
    // Tasks.update( {taskId: taskId }, {completed_on: completed_on});
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

  // },
  // 'tasks.setPrivate'(taskId, setToPrivate) {

  //   const task = Tasks.findOne(taskId);

  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }

  //   Tasks.update(taskId, { $set: { private: setToPrivate } });
  // },
});
