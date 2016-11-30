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
  Meteor.publish('urgent', function sort() {
    return Tasks.find({}, {sort: {is_urgent: 1}})
  })

  Meteor.publish('important', function sort() {
    return Tasks.find({}, {sort: {is_important: 1}})
  })

  Meteor.publish('sort', function sort() {
    return Tasks.find({}, {sort: {is_urgent: 1, is_important: 1}})
  })
});
