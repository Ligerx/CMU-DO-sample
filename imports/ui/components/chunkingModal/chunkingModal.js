import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './chunkingModal.html';

Template.chunkingModal.events({
  'submit .chunking-form' () {
    // TODO: all chunking behavior

    // Remove all task selection if applicable
    $('.task').removeClass('selected');

    // Clear the session counter
    Session.set('numTasksSelected', 0);
  },
});

Template.chunkingModal.helpers({
  taskName() {
    // You are passed selectedTasks, but you only should be getting one task
    // Manually pull it out
    const selectedTasks = Template.currentData().selectedTasks;
    console.log(selectedTasks.fetch());
    console.log(selectedTasks.count());
    if(!selectedTasks || selectedTasks.count() !== 1) {
      console.log("Inside chunkingModal helper taskName. Did not receive one task. ERROR!");
      return;
    }

    const task = selectedTasks.fetch()[0];
    return task.name;
  }
});

Template.chunkingModal.onDestroyed(function() {
  // The Bootstrap modal closes asynchronously.
  // So when the template is destroyed, the modal has not completely closed.
  // To fix this, manually destroy it.
  const modal = this.$('.modal');
  modal.removeClass('fade');
  modal.modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
});
