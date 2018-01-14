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

Template.chunking.events({
  'click .add-chunk': function(){
    console.log("clicking works");
    var div = "<input type='text' class='following-chunks form-control' name='name' placeholder='What next?'' />";
    $( ".task-chunk" ).append(div);
  },

  'submit .chunking-form'(event, template) {
    event.preventDefault();
    console.log("attempting submission...");

    var elem = document.getElementById('chunking-form').elements;
    var array = [];

    for(var i = 0; i < elem.length; i++)
        {
          console.log(elem[i].type);
          if(elem[i].type == "text") array.push(elem[i].value);
        }
        Meteor.call('tasks.massInsert', array);

        console.log(template.data.selectedTasks);
        const task = template.data.selectedTasks.fetch()[0];
        Meteor.call('tasks.toggle_completed', task._id);
  },

})
