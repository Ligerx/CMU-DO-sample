import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './newTask.html';

Template.datepicker.rendered = function() {
  this.$('#datepicker').datepicker({
    autoclose: true,
    todayHighlight: true,
  });
};

// Template.newTask.rendered = function() {
//   console.log('attempting to render newTask component...');
//   $(".setPriority").popover({
//     html: true,
//     title: 'Select Priority',
//     content: function() {
//       return $("#popover-content").html();
//     }
//   });
// }

Template.choosePriority.helpers({
  taskCount: function() {
    //Change later
    return Tasks.find().count();
  },
});

Template.newTask.onCreated(function() {
  this.currentPriority = new ReactiveVar( 'No Priority' );
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
    return Template.instance().currentPriority.get();
  }
});

Template.newTask.events({

  'click #select-priority':function(){
    $(".priority-select").css('visibility', 'visible');
  },
  
  'change .prioritySelect': function(event, template){
    console.log(event.currentTarget.value);
    switch(event.currentTarget.value) {
      case '1':
        template.currentPriority.set('Important');
        break;
      case '2':
        template.currentPriority.set('Urgent');
        break;
      case '3':
        template.currentPriority.set('Important');
        break;
      case '4':
        template.currentPriority.set('Someday');
        break;
    }
  },

  'submit .new-task'(event) {
    // console.log('attempting insert...');

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    // console.log(target);
    var is_urgent = false;
    var is_important = false;
    const name = target.name.value;
    const date = target.date.value; // not sure if I need to pass a string or a Date object?
    const radioValue = event.target.priority.value;

    console.log('The radio value is: ' + radioValue);
    if(radioValue == "1"){
      //Important-Urgent
      is_important = true;
      is_urgent = true;
    }
    if(radioValue == "2") {
      //Important
      is_important = true;
    }
    if(radioValue == "3") {
      //Urgent
      is_urgent = true;
    }

    // console.log('The task is: ' + name);
    // console.log('The task due date is: ' + date);

    // Insert a task into the collection
    var s = is_urgent||is_important;
    Meteor.call('tasks.insert', name, date, is_urgent||is_important, is_urgent, is_important, function(error) {
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
