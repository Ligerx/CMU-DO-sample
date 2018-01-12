import { Template } from 'meteor/templating';
// import { Tasks } from '../../../api/api.js';

import './navbar.html';

Template.navbar.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();

      // Also reload the page. This probably lets the onboarding reset.
      location.reload();
  }
});


Template.navbar.helpers({
	email(){
		console.log(Meteor.user());
		return Meteor.user().emails[0].address;
	}
});
