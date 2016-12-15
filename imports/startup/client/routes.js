import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { DocHead } from 'meteor/kadira:dochead';
// import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/pages/dashboard.js';
import '../../ui/pages/history.js';
import '../../ui/pages/home.js';

// Import to override accounts templates
// import '../../ui/accounts/accounts-templates.js'; // TODO: set up user accounts


let metaInfo = {name: 'viewport', content: 'width=device-width, initial-scale=1'};
DocHead.setTitle("CMU-DO");
DocHead.addMeta(metaInfo);

// Below here are the route definitions
FlowRouter.route('/dashboard', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { page: 'dashboard' });
  },
  name: 'dashboard',
});

FlowRouter.route('/history', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { page: 'history' });
  },
  name: 'history',
});

FlowRouter.route('/home', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { page: 'home' });
  },
  name: 'home',
});

FlowRouter.route('/', {
  triggersEnter: [function(context, redirect) {
    redirect('/home');
  }]
});

// When you enter a new page, reset the number of selected tasks because
// it's a global session variable that doesn't get reset on page change
FlowRouter.triggers.enter([function() {
  Session.set('numTasksSelected', 0);
}]);

// Redirect if logged in
FlowRouter.triggers.enter([function(context, redirect) {
  if(Meteor.loggingIn() || Meteor.userId()) {
    redirect('/dashboard');
  }
}], { except: ["dashboard", "history"] });

// Redirect if not logged in
FlowRouter.triggers.enter([function(context, redirect) {
  if(!Meteor.userId()) {
    redirect('/');
  }
}], { only: ["dashboard", "history"] });

Accounts.onLogout(function() {
  $('.collapse').collapse('hide');
  FlowRouter.go("/");
});

Accounts.onLogin(function() {
  $('.collapse').collapse('hide');
  FlowRouter.go("/dashboard");
});
