import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './editTaskForm.html';
import '../taskForm/taskForm.js';

Template.editTaskForm.helpers({
  handleSubmit() {
    // let instance = Template.instance();
    // let self = this;

    return function(name, date, is_sorted, is_urgent, is_important, successCallback) {
      // console.log(instance);
      // console.log(instance.selectedTasks.fetch());
      // console.log('self is:');
      // console.log(self);

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
          console.log('Task Edited.');
          successCallback();
        }
      });
    }
  }
});
