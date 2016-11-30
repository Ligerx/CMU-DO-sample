import { Template } from 'meteor/templating';
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
});

Template.task.events({
  'click .toggle-checked'() {
    Meteor.call('tasks.toggle_completed', this.task._id);
  },
});
