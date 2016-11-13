import { Template } from 'meteor/templating';
import { Tasks } from '../../api/api.js';

import './backlog.html';

import '../components/newTask/newTask.js';
import '../components/task/task.js';

Template.backlog.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
});

Template.backlog.helpers({
  tasks() {
    return Tasks.find();
  },
});
