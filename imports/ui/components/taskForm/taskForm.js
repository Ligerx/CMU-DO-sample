import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './taskForm.html';

Template.datepicker.rendered = function() {
  const datepicker = this.$('#datepicker');

  datepicker.datepicker({
    autoclose: true,
    todayHighlight: true,
  });
};

Template.datepicker.onRendered(function() {
  this.autorun(function() {
    const datepicker = Template.instance().$(".datepicker");
    const date = Template.currentData().date;

    // console.log('updating date picker to date: ' + date);
    if(date) {
      datepicker.datepicker("update", date);
    }
    else {
      datepicker.val('').datepicker("update");
    }
  });
});

Template.taskForm.onCreated(function() {
  this.currentPriority = new ReactiveVar( 'No Priority' );
});

Template.taskForm.onRendered(function() {
  this.autorun(function() {
    const priorityLabel = Template.instance().$("#select-priority");
    const priorityState = Template.instance().currentPriority;

    const selectedTasks = Template.currentData().selectedTasks;
    if(!selectedTasks) { return; }

    const importantArray = selectedTasks.fetch().map(function(task) {
      return task.is_important;
    });
    const urgentArray = selectedTasks.fetch().map(function(task) {
      return task.is_urgent;
    });
    const sortedArray = selectedTasks.fetch().map(function(task) {
      return task.is_sorted;
    });

    const sameImportant = arraySame(importantArray);
    const sameUrgent = arraySame(urgentArray);
    const sameSorted = arraySame(sortedArray);

    console.log('Inside taskform onRendered autorun');
    console.log(sameImportant);
    console.log(sameUrgent);
    console.log(sameSorted);

    if(sameImportant && sameUrgent && sameSorted) {
      const important = importantArray[0];
      const urgent = urgentArray[0];
      const sorted = sortedArray[0];

      if(important && urgent) {
        priorityState.set('Important and Urgent');
      }
      else if(important) {
        priorityState.set('Important');
      }
      else if(urgent) {
        priorityState.set('Urgent');
      }
      else if(sorted) {
        priorityState.set('Someday');
      }
      else {
        priorityState.set('No Priority');
      }
    }
    else {
      priorityState.set('No Priority');
    }
    // priorityLabel.text(priorityState.get());
  });
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

  isEditing() {
    const instance = Template.instance();
    const selectedTasks = instance.data.selectedTasks;

    return selectedTasks ? true : false;
  },

  date() {
    const instance = Template.instance();
    const selectedTasks = instance.data.selectedTasks;
    if(!selectedTasks) { return null; }

    const dates = selectedTasks.fetch().map(function(task) {
      return task.due_on;
    });

    const datesAsNumbers = dates.map(function(date) {
      return date ? date.getTime() : null;
    });

    // console.log(dates);
    if(arraySame(datesAsNumbers)) {
      // console.log('Dates are the same: ' + dates[0]);
      return dates[0];
    }
    else {
      // console.log('Dates are not the same, passing in null');
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

function arraySame(array) {
  if(!array) { return false; }

  const first = array[0];

  return array.every(function(element) {
    return element == first;
  });
}
