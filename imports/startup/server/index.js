// This defines a starting set of data to be loaded if the app is loaded with an empty db.
// import '../imports/startup/server/fixtures.js';

// This file configures the Accounts package to define the UI of the reset password email.
// import '../imports/startup/server/reset-password-email.js';

// Set up some rate limiting and other important security settings.
// import '../imports/startup/server/security.js';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import '../../api/api.js';

// Really not sure where to put this, so I'm sticking it here...
// When the user is created, add a completedOnboarding attribute
Accounts.onCreateUser(function(options, user) {
  // Default behavior that needs to be included
  if (options.profile){
    user.profile = options.profile;
  }

  // Adding the attribute to track if they need onboarding
  user.completedOnboarding = false;

  return user;
});
