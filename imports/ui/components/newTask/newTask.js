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
  printPriority() {
  //// This is broken, similar method in task.js you might want to refer to
  //   const task = this.task;
  //   const array = [];

  //   const priorities = {
  //     'is_important': 'Important',
  //     'is_urgent': 'Urgent',
  //   }

  //   priorities.forEach(function({val, print}) {
  //     if( task[val] ) { array.push(print); }
  //   });

  //   return array.join(' and ');
  // },
    return "Still implementing."
  }
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
