import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../../../api/api.js';

import './task.html';

Template.task.helpers({
  date() {
    // console.log('blah');
    // console.log(this);
    // console.log(this.task);
    const due_on = this.task.due_on;
    if(! due_on) { return ''; }

    const curr_date = due_on.getDate();
    const curr_month = due_on.getMonth() + 1; //Months are zero based
    const curr_year = due_on.getFullYear();
    return curr_month + "/" + curr_date + "/" + curr_year;
  },

  isCompleted() {
    // Coerce the date value into a boolean
    return !!this.task.completed_on;
  },

  log() {
    console.log(this);
  },

  printPriority() {
    // TODO: Maybe make this a global helper to be more DRY
    //       newTask.js has a method like this.

    //// This is broken
    // const task = this.task;
    // const array = [];
    // const priorities = {
    //   'is_important': 'Important',
    //   'is_urgent': 'Urgent',
    // }

    // priorities.forEach(function({val, print}) {
    //   if( task[val] ) { array.push(print); }
    // });

    // return array.join(' and ');

    const task = this.task;
    if(task.is_important && task.is_urgent) {
      return "Important and Urgent";
    }
    else if(task.is_important) {
      return "Important";
    }
    else if(task.is_urgent) {
      return "Urgent";
    }
    else {
      return "";
    }
  },

  taskSelected() {
    const instance = Template.instance();
    return instance.state.get('taskSelected');
  }
});

Template.task.events({
  'click .toggle-checked'() {
    Meteor.call('tasks.toggle_completed', this.task._id);
  },

  'click .task'(event, instance) {
    // It seems that when you click the checkbox, that handles the event and
    // it does not propagage to this one, which is what we wanted anyway.
    let currentlySelected = instance.state.get('taskSelected');

    updateNumTaskSelected(!currentlySelected);
    instance.state.set('taskSelected', !currentlySelected);

  },
});

Template.task.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.set('taskSelected', false);
});

// Update the session to count the number of tasks selected.
function updateNumTaskSelected(shouldIncrement) {
  const numTasksSelected = Session.get('numTasksSelected') || 0;

  if(shouldIncrement) {
    Session.set('numTasksSelected', numTasksSelected + 1);
  }
  else {
    Session.set('numTasksSelected', numTasksSelected - 1);
  }

  console.log('Number of tasks selected: ' + Session.get('numTasksSelected'));
}
