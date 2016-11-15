import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './newTask.html';

Template.newTask.events({
  'submit .new-task'(event) {
    console.log('attempting insert...');
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    console.log('The Text is: ' + text);

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    console.log('Num tasks is now: ' + Tasks.find().count());

    // Clear form
    target.text.value = '';
  },
});
