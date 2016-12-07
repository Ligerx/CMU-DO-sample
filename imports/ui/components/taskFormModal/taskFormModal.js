import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './taskFormModal.html';
import '../newTaskForm/newTaskForm.js';
import '../editTaskForm/editTaskForm.js';

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

  selectedTasks() {
    // Trying this to make it update whenever the session is updated
    let temp = Session.get('numTasksSelected');

    // FIXME: Using setTimeout is a hack to get this working
    //        This is being rerun whenever Session is updated, but
    //        session ends up updating BEFORE the .selected class gets applied to the DOM.
    //        You would be searching for something that hasn't been applied yet.
    //        By waiting a little bit before searching the dom, it seems to fix the problem.
    Meteor.setTimeout(function() {
      const selectedTasks = $('.task.selected');
      const selectedIDs = selectedTasks.map(function(index, element) {
        return $(element).data('id');
      }).toArray();

      return Tasks.find({"_id": { "$in": selectedIDs }});
    }, 10);
  },

});

Template.taskFormModal.events({
  // 'click .temporary-edit-button'() {
  //   console.log('temporary-edit-button clicked');

  //   const selectedTasks = $('.task.selected');

  //   const selectedIDs = selectedTasks.map(function(index, element) {
  //     return $(element).data('id');
  //   }).toArray();

  //   const tasks = Tasks.find({"_id": { "$in": selectedIDs }}).fetch();

  //   tasks.forEach(function(task) {
  //     console.log(task);
  //   });
  // },

});
