import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import {DocHead} from 'meteor/kadira:dochead';
// import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/pages/dashboard.js';
import '../../ui/pages/history.js';
import '../../ui/pages/home.js';
import '../../ui/pages/login.js';
import '../../ui/pages/register.js';

// Import to override accounts templates
// import '../../ui/accounts/accounts-templates.js'; // TODO: set up user accounts


let metaInfo = {name: 'viewport', content: 'width=device-width, initial-scale=1'};
DocHead.setTitle("CMU-DO");
DocHead.addMeta(metaInfo);

// Below here are the route definitions
FlowRouter.route('/dashboard', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { page: 'dashboard' });
  }
});

FlowRouter.route('/history', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { page: 'history' });
  }
});

FlowRouter.route('/home', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { page: 'home' });
  }
});

FlowRouter.route('/login', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { page: 'login' });
  }
});

FlowRouter.route('/register', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { page: 'register' });
  }
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
