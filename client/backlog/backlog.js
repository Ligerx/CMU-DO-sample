import { Template } from 'meteor/templating';
import { Tasks } from '../../imports/api/tasks.js';

import './backlog.html';

Template.body.onCreated(function bodyOnCreated() {
  // this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});

Template.body.events({
  'submit .new-task'(event) {
    console.log('attempting insert...');
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    console.log('The Text is: ' + text);

    // Insert a task into the collection
    // Tasks.insert({
    //   text,
    //   createdAt: new Date(), // current time
    // });


    // Clear form
    target.text.value = '';
  },
});

// Template.task.events({
//   'click .toggle-checked'() {
//     // Set the checked property to the opposite of its current value
//     Tasks.update(this._id, {
//       $set: { checked: ! this.checked },
//     });
//   },
//   'click .delete'() {
//     Tasks.remove(this._id);
//   },
// });
