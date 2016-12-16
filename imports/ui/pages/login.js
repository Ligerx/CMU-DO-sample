import { Template } from 'meteor/templating';

import './login.html';

Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailVar = event.target.loginEmail.value;
    var passwordVar = event.target.loginPassword.value;
    Meteor.loginWithPassword(emailVar, passwordVar);
    console.log("Form submitted.");
  }
});

