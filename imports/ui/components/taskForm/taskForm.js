import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './taskForm.html';

Template.datepicker.rendered = function() {
  this.$('#datepicker').datepicker({
    autoclose: true,
    todayHighlight: true,
  });
};

// Template.choosePriority.helpers({
//   taskCount: function() {
//     //Change later
//     return Tasks.find().count();
//   },
// });

Template.taskForm.onCreated(function() {
  this.currentPriority = new ReactiveVar( 'No Priority' );
});

Template.taskForm.helpers({
  printPriority() {
    return Template.instance().currentPriority.get();
  },

  name() {
    const instance = Template.instance();
    const selectedTasks = instance.data.selectedTasks;

    if(selectedTasks && selectedTasks.count() == 1) {
      return selectedTasks.fetch()[0].name;
    }
    else {
      return null;
    }
  },

  nameDisabled() {
    const instance = Template.instance();
    const selectedTasks = instance.data.selectedTasks;

    if (selectedTasks && selectedTasks.count() > 1) {
      return 'disabled';
    }
    else {
      return null;
    }
  },

});

Template.taskForm.events({
  'click .submit-close'(event){
    event.stopPropagation();
    // console.log('closing modal');
    $('.modal').modal('hide');
  },

  'click #select-priority'(event){
    event.stopPropagation();
    $(".priority-select").css('visibility', 'visible');
  },

  'change .prioritySelect'(event, template){
    event.stopPropagation();

    // console.log(event.currentTarget.value);
    switch(event.currentTarget.value) {
      case '1':
        template.currentPriority.set('Important and Urgent');
        break;
      case '2':
        template.currentPriority.set('Important');
        break;
      case '3':
        template.currentPriority.set('Urgent');
        break;
      case '4':
        template.currentPriority.set('Someday');
        break;
    }

    hidePrioritySelect(template);
    deselectPrioritySelect(template);
  },

  'submit .task-form'(event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    var is_urgent = false;
    var is_important = false;
    var is_backlog = false;
    const name = target.name.value;
    const date = target.date.value;
    const priority = template.currentPriority.get();

    // console.log('The radio value is: ' + radioValue);
    if(priority == "Important and Urgent"){
      is_important = true;
      is_urgent = true;
    }
    if(priority == "Important") {
      is_important = true;
      is_urgent = false;
    }
    if(priority == "Urgent") {
      is_important = false;
      is_urgent = true;
    }
    if(priority == "Someday") {
      is_important = false;
      is_urgent = false;

      is_backlog = true;
    }

    var is_sorted = is_urgent || is_important || is_backlog;

    // console.log('before submitting to server');
    // console.log('is_sorted: ' +is_sorted);
    // console.log('is_urgent: ' +is_urgent);
    // console.log('is_important: ' +is_important);

    // Trigger the callback to the parent template
    template.data.onSubmit(name, date, is_sorted, is_urgent, is_important, function() {
      // On success, clear form
      target.name.value = '';
      target.date.value = '';

      // Clear the priority selection
      hidePrioritySelect(template);
      deselectPrioritySelect(template);
      resetPriorityState(template);

      // Remove all task selection if applicable
      $('.task').removeClass('selected');

      // Clear the session counter
      Session.set('numTasksSelected', 0);
    });
  },

});

Template.taskForm.onDestroyed(function() {
  // The Bootstrap modal closes asynchronously.
  // So when the template is destroyed, the modal has not completely closed.
  // To fix this, manually destroy it.
  const modal = this.$('.modal');
  modal.removeClass('fade');
  modal.modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
});



function hidePrioritySelect(template) {
  let prioritySelect = template.$(".priority-select");
  prioritySelect.css('visibility', 'hidden');

}

function deselectPrioritySelect(template) {
  let prioritySelect = template.$(".priority-select");
  prioritySelect.children('input[type="radio"]').each(function(index, element) {
    $(element).prop('checked', false);
  });
}

function resetPriorityState(template) {
  template.currentPriority.set('No Priority');
}
