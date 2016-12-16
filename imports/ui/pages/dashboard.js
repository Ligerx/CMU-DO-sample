import { Template } from 'meteor/templating';
import { Tasks } from '../../api/api.js';

import './dashboard.html';
// import './tour.js';
import '../components/taskList/taskList.js';
import '../components/taskFormModal/taskFormModal.js';
// import './hopscotch.min.js';

Template.dashboard.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
  Meteor.subscribe("userData"); // subscribe to additional user fields
});

// Define the tour!
Template.dashboard.rendered = function(){
  var tour = {
  id: "cmu-tour",
  steps: [
    {
      title: "Welcome to CMU-DO!",
      content: "This is a guided tool that will teach you how to manage your tasks.",
      target: "start",
      placement: "bottom"
    },
    {
      title: "Unsorted Tasks",
      content: "When you create a new task, by default they get put here for you to prioritize later.",
      target: "unsorted",
      placement: "bottom"
    },
    {
      title: "Urgent and Important Tasks",
      content: "These tasks demand immediate attention and heavily impact your personal or academic goals. An example would be a big project due in 3 days.",
      target: "urgent-and-important",
      placement: "bottom"
    },
    {
      title: "Urgent Tasks",
      content: "These tasks are last minute, but may not be impactful towards your long term goals. An example would be responding to an email.",
      target: "urgent",
      placement: "bottom"
    },
    {
      title: "Important Tasks",
      content: "These tasks fulfill long term goals, but do not demand immediate attention. An example of this include planning a trip.",
      target: "important",
      placement: "bottom"
    },
    {
      title: "Someday Tasks",
      content: "These are neither important or urgent. An example would be playing videogames in the student lounge.",
      target: "someday",
      placement: "bottom"
    },
    {
      title: "Adding a New Task",
      content: "Now lets see how you can add a task!",
      target: "modal-button",
      placement: "top",
      onNext: ["showModal"],
    },
    {
      title: "Adding a New Task",
      content: "To create a task, first write the task name here.",
      target: "text",
      placement: "bottom",
      delay: "500",
      // onNext: ["showModal"],
    },
    {
      title: "Adding a New Task",
      content: "On this row, you can set a priority and a due date for a task, although these are optional.",
      target: "select-priority",
      placement: "bottom",
      onNext: ["closeModal"],
    },
    {
      title: "Congratulations!",
      content: "Now you're all set to start using CMU-DO!",
      target: "start",
      placement: "bottom",
    },
  ]
  };
  // Start the tour!
  hopscotch.registerHelper('showModal', function(){
    $('.modal').modal('show');
  });
  hopscotch.registerHelper('closeModal', function(){
    $('.modal').modal('hide');
  });

  if(Meteor.user() && !Meteor.user().completedOnboarding) {
    hopscotch.startTour(tour);

    // TODO: this listener is never destroyed
    hopscotch.listen('end', () => {
      Meteor.call('users.completeOnboarding', Meteor.userId());
    });
  }
}

Template.dashboard.helpers({
  allTasks() {
    return Tasks.find();
  },

  filteredTasks(kw = { hash: {} }) {
    // Use this helper to find tasks that satisfy certain params
    // e.g. to find only important tasks, you could use {{ #each singleTask in (test is_important=true) }}
    // Default values are found on the line below.
    // You can read about what kw is here: http://blazejs.org/api/spacebars.html#Helper-Arguments
    // console.log(kw);

    let { is_sorted = true, is_urgent = false, is_important = false } = kw.hash;
    // console.log('Filtering tasks // sorted ' + is_sorted + ', urgent ' + is_urgent + ', important ' + is_important);

    let blah = {is_sorted, is_urgent, is_important};
    // console.log(blah);

    return Tasks.find({
      completed_on: null,
      is_sorted,
      is_urgent,
      is_important,
    });
  },

});
