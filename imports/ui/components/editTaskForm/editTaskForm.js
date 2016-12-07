import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './editTaskForm.html';
import '../taskForm/taskForm.js';

Template.editTaskForm.helpers({
  handleSubmit() {
    return function(name, date, is_sorted, is_urgent, is_important, successCallback) {
      console.log('editTaskForm: handling submit!');

      const taskIds = this.selectedTasks.map(function(task) {
        return task._id;
      });

      Meteor.call('tasks.massUpdate', taskIds, name, date, is_sorted, is_urgent, is_important, function(error) {
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
