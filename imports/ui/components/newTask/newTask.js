import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './newTask.html';

Template.datepicker.rendered = function() {
  this.$('#datepicker').datepicker({
    autoclose: true,
    todayHighlight: true,
  });
};

Template.newTask.rendered = function() {
  console.log('attempting to render newTask component...');
  $(".setPriority").popover({
    html: true,
    title: 'Select Priority',
    content: function() {
      return $("#popover-content").html();
    }
  });
}

Template.choosePriority.helpers({
  taskCount: function() {
    //Change later
    return Tasks.find().count();
  },
});

Template.newTask.helpers({
  categories: function(){
    return ["Important-Urgent", "Not Important-Urgent", "Important-Nonurgent", "Backlog"]
  },

});

Template.newTask.events({
  'submit .new-task'(event) {
    // console.log('attempting insert...');

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    // console.log(target);
    const name = target.name.value;
    const date = target.date.value; // not sure if I need to pass a string or a Date object?

    // console.log('The task is: ' + name);
    // console.log('The task due date is: ' + date);

    // Insert a task into the collection
    Meteor.call('tasks.insert', name, date, function(error) {
      if(error) {
        // Maybe some validation error here.
        // e.g. say that a task name is required.
      }
      else {
        // Clear form
        target.name.value = '';
        target.date.value = '';
      }
    });

    console.log('Num tasks is now: ' + Tasks.find().count());

  },

});
