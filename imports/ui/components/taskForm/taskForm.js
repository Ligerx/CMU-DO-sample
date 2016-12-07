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

Template.choosePriority.helpers({
  taskCount: function() {
    //Change later
    return Tasks.find().count();
  },
});

Template.taskForm.onCreated(function() {
  this.currentPriority = new ReactiveVar( 'No Priority' );

  // if(this.selectedTasks && this.selectedTasks.fetch().length == 1) {
  //   this.$('.task-name').val(this.selectedTasks.fetch()[0].name);
  // }

  // if(this.selectedTasks) {
  //   this.selectedTasks.forEach(function(task) {
  //     console.log(task._id);
  //   });
  // }
});

Template.taskForm.onRendered(function() {
  console.log("In taskForm onRendered");
  console.log(this.selectedTasks);

  if(this.selectedTasks && this.selectedTasks.fetch().length == 1) {
    this.$('.task-name').val(this.selectedTasks.fetch()[0].name);
  }
});

Template.taskForm.helpers({
  printPriority() {
    return Template.instance().currentPriority.get();
  }
});

Template.taskForm.events({
  'click .submit-close'(event){
    event.stopPropagation();
    console.log('closing modal');
    $('.modal').modal('hide');
  },

  'click #select-priority'(event){
    event.stopPropagation();
    $(".priority-select").css('visibility', 'visible');
  },

  'change .prioritySelect'(event, template){
    event.stopPropagation();

    console.log(event.currentTarget.value);
    switch(event.currentTarget.value) {
      case '1':
        template.currentPriority.set('Important');
        break;
      case '2':
        template.currentPriority.set('Urgent');
        break;
      case '3':
        template.currentPriority.set('Important');
        break;
      case '4':
        template.currentPriority.set('Someday');
        break;
    }
  },

  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    var is_urgent = false;
    var is_important = false;
    var is_backlog = false;
    const name = target.name.value;
    const date = target.date.value;
    const radioValue = event.target.priority.value;

    console.log('The radio value is: ' + radioValue);
    if(radioValue == "1"){
      is_important = true;
      is_urgent = true;
    }
    if(radioValue == "2") {
      is_important = true;
    }
    if(radioValue == "3") {
      is_urgent = true;
    }
    if(radioValue == "4") {
      is_backlog = true;
    }

    var is_sorted = is_urgent || is_important || is_backlog;

    // Trigger the callback to the parent template
    this.onSubmit(name, date, is_sorted, is_urgent, is_important, function() {
      // On success, clear form
      target.name.value = '';
      target.date.value = '';

      // TODO: 'clear' the priority selection

      // Remove all task selection if applicable
      $('.task').removeClass('selected');

      // Clear the session counter
      // FIXME: I was running into problems where doing this would make the modal
      // backdrop not disappear. I'm guessing it is because something is being removed
      // from the dom before everything could be run. It probably has to do with the animation time.
      // So use a setTimeout here to attempt to fix it.
      Meteor.setTimeout(function() {
        Session.set('numTasksSelected', 0);
      }, 1000);
    });
  },

});
