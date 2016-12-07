import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './newTaskForm.html';
import '../taskForm/taskForm.js';

Template.newTaskForm.helpers({
  handleSubmit() {
    return function(name, date, is_sorted, is_urgent, is_important, successCallback) {
      console.log('newTaskForm: handling submit!');

      Meteor.call('tasks.insert', name, date, is_sorted, is_urgent, is_important, function(error) {
        if(error) {
          // Maybe some validation error here.
          // e.g. say that a task name is required.
        }
        else {
          successCallback();
        }
      });

      console.log('Num tasks is now: ' + Tasks.find().count());
    }
  }
});
