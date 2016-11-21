import { Template } from 'meteor/templating';
import { Tasks } from '../../api/api.js';

import './dashboard.html';
import '../components/newTask/newTask.js';
import '../components/task/task.js';

Template.dashboard.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
});

Template.dashboard.helpers({
  tasks() {
    return Tasks.find();
  },
});
