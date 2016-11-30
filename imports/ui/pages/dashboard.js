import { Template } from 'meteor/templating';
import { Tasks } from '../../api/api.js';

import './dashboard.html';
import '../components/newTask/newTask.js';
import '../components/task/task.js';

Template.dashboard.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
});

Template.dashboard.helpers({
  allTasks() {
    return Tasks.find();
  },

  filteredTasks(kw = { hash: {} }) {
    // Use this helper to find tasks that satisfy certain params
    // e.g. to find only important tasks, you could use {{ #each singleTask in (test is_important=true) }}
    // Default values are found on the line below.
    // You can read about what kw is here: http://blazejs.org/api/spacebars.html#Helper-Arguments
    console.log(kw);

    let { is_sorted = true, is_urgent = false, is_important = false } = kw.hash;
    console.log('Filtering tasks // sorted ' + is_sorted + ', urgent ' + is_urgent + ', important ' + is_important);

    let blah = {is_sorted, is_urgent, is_important};
    console.log(blah);

    return Tasks.find({
      is_sorted,
      is_urgent,
      is_important,
    });
  },

  // Meteor.publish('urgent', function sort() {
  //   return Tasks.find({}, {sort: {is_urgent: 1}})
  // })

  // Meteor.publish('important', function sort() {
  //   return Tasks.find({}, {sort: {is_important: 1}})
  // })

  // Meteor.publish('sort', function sort() {
  //   return Tasks.find({}, {sort: {is_urgent: 1, is_important: 1}})
  // })
});
