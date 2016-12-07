import { Template } from 'meteor/templating';

import './taskFormModal.html';
import '../newTaskForm/newTaskForm.js';

Template.taskFormModal.helpers({

  tasksAreSelected() {
    const numTasksSelected = Session.get('numTasksSelected') || 0;
    return numTasksSelected > 0 ? true : false;
  },

  editTasksButtonText() {
    const numTasksSelected = Session.get('numTasksSelected') || 0;

    if(numTasksSelected === 1) {
      return 'Edit Task';
    }
    else {
      return 'Edit ' + numTasksSelected + ' Tasks'
    }
  },

});

Template.taskFormModal.events({
  'click .temporary-edit-button'() {
    console.log('temporary-edit-button clicked');

    const selectedTasks = $('.task.selected');

    const selectedIDs = selectedTasks.map(function(index, element) {
      return $(element).data('id');
    }).toArray();

    const tasks = Tasks.find({"_id": { "$in": selectedIDs }}).fetch();

    tasks.forEach(function(task) {
      console.log(task);
    });
  },

});
