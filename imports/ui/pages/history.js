import { Template } from 'meteor/templating';
import { Tasks } from '../../api/api.js';

import './history.html';
import '../components/taskList/taskList.js';

Template.history.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
});

Template.history.helpers({
  completedTasks() {
    return Tasks.find({
      completed_on: { $ne:null }
    }, {
      sort: { completed_on: -1 }
    });
  },
});
