import { Template } from 'meteor/templating';
// import { Tasks } from '../../../api/api.js';

import './navbar.html';

Template.navbar.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
  }
});


Template.navbar.helpers({
	email(){
		console.log(Meteor.user());
		return Meteor.user().email;
	}
});
