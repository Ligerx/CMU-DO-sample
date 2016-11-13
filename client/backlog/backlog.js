import { Template } from 'meteor/templating';
import { Tasks } from '../../imports/api/tasks.js';

import './backlog.html';

Template.backlog.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
});

Template.backlog.helpers({
  tasks() {
    return Tasks.find();
  },
});

Template.backlog.events({
  'submit .new-task'(event) {
    console.log('attempting insert...');
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    console.log('The Text is: ' + text);

    // Insert a task into the collection
    Meteor.call('tasks.insert', text)

    // Clear form
    target.text.value = '';
  },
});
