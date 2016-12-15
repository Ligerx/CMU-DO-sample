import { Template } from 'meteor/templating';
import { Tasks } from '../../api/api.js';

import './dashboard.html';
// import './tour.js';
import '../components/taskList/taskList.js';
import '../components/taskFormModal/taskFormModal.js';
// import './hopscotch.min.js';

Template.dashboard.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
});

// Define the tour!
Template.dashboard.rendered = function(){
  var tour = {
  id: "cmu-tour",
  steps: [
    {
      title: "Getting Started with CMU-DO",
      content: "First, lets browse the different categories tasks can go into",
      target: "start",
      placement: "bottom"
    },
    {
      title: "Getting Started with CMU-DO",
      content: "Unsorted is where all tasks go when you create a task and don't assign a priority",
      target: "unsorted",
      placement: "bottom"
    },
    {
      title: "Getting Started with CMU-DO",
      content: "Urgent and Important are tasks that are time-sensitive and must be completed. Ex: An essay"
      + " due at midnight that's worth 50% of your grade",
      target: "urgent-and-important",
      placement: "bottom"
    },
    {
      title: "Getting Started with CMU-DO",
      content: "Urgent are tasks that have imminent deadlines",
      target: "urgent",
      placement: "bottom"
    },
    {
      title: "Getting Started with CMU-DO",
      content: "Important are tasks that need to be completed but not are not time-sensitive",
      target: "important",
      placement: "bottom"
    },
    {
      title: "Getting Started with CMU-DO",
      content: "Someday are tasks that you would like to do at some point",
      target: "someday",
      placement: "bottom"
    },
    {
      title: "Getting Started with CMU-DO",
      content: "Now lets see how you can add tasks",
      target: "modal-button",
      placement: "top",
      onNext: ["showModal"],
    },
    {
      title: "Getting Started with CMU-DO",
      content: "To create a task, first write the task name",
      target: "text",
      placement: "bottom",
      delay: "500",
      // onNext: ["showModal"],
    },
    {
      title: "Getting Started with CMU-DO",
      content: "Then categorize the task by importance and category",
      target: "select-priority",
      placement: "bottom",
      // onNext: ["showModal"],
    },
    {
      title: "Getting Started with CMU-DO",
      content: "Select the date when the task needs to be completed by",
      target: "date",
      placement: "bottom",
      onNext: ["closeModal"],
    },
    {
      title: "Getting Started with CMU-DO",
      content: "Now you're all set to start using CMU-DO",
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
  hopscotch.startTour(tour);
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
