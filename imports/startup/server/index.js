// This defines a starting set of data to be loaded if the app is loaded with an empty db.
// import '../imports/startup/server/fixtures.js';

// This file configures the Accounts package to define the UI of the reset password email.
// import '../imports/startup/server/reset-password-email.js';

// Set up some rate limiting and other important security settings.
// import '../imports/startup/server/security.js';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import { Tasks } from'../../api/api.js';

// Really not sure where to put this, so I'm sticking it here...
// When the user is created, add a completedOnboarding attribute
Accounts.onCreateUser(function(options, user) {

  console.log("beginning of onCreateUser server function");
  console.log(options);
  console.log(user);

  // Default behavior that needs to be included
  if (options.profile){
    user.profile = options.profile;
  }

  // Adding the attribute to track if they need onboarding
  // user.completedOnboarding = false; // guest accounts seem to be wiping this for some reason...
  user.profile['completedOnboarding'] = false;

  // Since these are new guest users, they have no data
  // prepopulate some tasks for them
  insertTasks(prepopulatedTasks, user._id)


  console.log("end of onCreateUser server function");
  console.log(user);

  return user;
});


let insertTasks = function(tasks, user_id) {
  tasks.forEach(function({name, is_sorted, is_urgent, is_important, due_on, completed_on}) {
    Tasks.insert({
      created_on: new Date(),
      user_id,
      name,
      is_sorted,
      is_urgent,
      is_important,
      due_on,
      completed_on
    });
  });
};


// Pulled some data from the original CMU-DO's database. Sample account test1@cmu.edu, password
let prepopulatedTasks = [
  { "name": "Restudy induction for Concepts",
    "is_sorted": true,
    "is_urgent": true,
    "is_important": false,
    "due_on": "2016-12-18T00:00:00.000Z",
    "completed_on": "2016-12-16T08:00:52.471Z"},
  { "name": "Write up 112 documentation",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true,
    "due_on": "2016-12-10T00:00:00.000Z",
    "completed_on": "2016-12-16T08:00:37.258Z"},
  {"name": "Record 112 my video",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true,
    "due_on": "2016-12-10T00:00:00.000Z",
    "completed_on": "2016-12-16T08:11:55.750Z"},
  {"name": "Get someone to review my essay",
    "is_sorted": true,
    "is_urgent": true,
    "is_important": true,
    "due_on": "2016-12-30T00:00:00.000Z"},
  {"name": "Hand in my interp essay",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true,
    "due_on": "2016-12-09T00:00:00.000Z"},
  {    "name": "Join more clubs",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": false},
  {    "name": "Do more hackathons",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": false,
    "completed_on": "2016-12-16T08:00:48.195Z"},
  { "name": "Draft interp essay",
    "is_sorted": true,
    "is_urgent": true,
    "is_important": true,
    "completed_on": "2016-12-16T08:00:42.714Z"},
  {"name": "Call parents",
    "is_sorted": true,
    "is_urgent": true,
    "is_important": false},
  { "name": "Get off waitlist",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": false},
  {"name": "Study for stats final",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true},
  { "name": "112 final project",
    "is_sorted": false,
    "is_urgent": false,
    "is_important": false,
    "completed_on": "2016-12-16T08:12:51.660Z"},
  {"name": "112 bug fixes",
    "is_sorted": true,
    "is_urgent": true,
    "is_important": true,
    "completed_on": "2016-12-16T08:13:47.455Z"},
  {"name": "112 write up",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true,
    "completed_on": "2016-12-16T08:13:49.397Z"},
  {"name": "Record video for 112",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true,
    "completed_on": "2016-12-16T08:13:50.075Z"},
  {"name": "Post 112 project on my site",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": false,
    "completed_on": "2016-12-16T08:13:54.437Z"},
  {"name": "do 112",
    "is_sorted": false,
    "is_urgent": false,
    "is_important": false,
    "completed_on": "2016-12-16T17:23:25.039Z"},
  {"name": "Fixing bugs",
    "is_sorted": true,
    "is_urgent": true,
    "is_important": true,
    "due_on": "2016-12-17T00:00:00.000Z",
    "completed_on": "2016-12-16T17:24:52.019Z"},
  {"name": "Record 112 video",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true,
    "due_on": "2016-12-21T00:00:00.000Z",
    "completed_on": "2016-12-16T17:24:49.746Z"},
  {"name": "112 documentation",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true,
    "due_on": "2016-12-21T00:00:00.000Z",
    "completed_on": "2016-12-16T17:24:49.098Z"},
  {"name": "112 final project",
    "is_sorted": false,
    "is_urgent": false,
    "is_important": false,
    "completed_on": "2016-12-16T17:48:00.599Z"},
  { "name": "112 bug fixes",
    "is_sorted": true,
    "is_urgent": true,
    "is_important": true,
    "completed_on": "2016-12-16T17:48:48.959Z"},
  {"name": "112 video",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true,
    "completed_on": null},
  {"name": "112 documentation",
    "is_sorted": true,
    "is_urgent": false,
    "is_important": true,
    "completed_on": null},
];
