import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
// import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/pages/dashboard.js';
import '../../ui/pages/history.js';

// Import to override accounts templates
// import '../../ui/accounts/accounts-templates.js'; // TODO: set up user accounts

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

FlowRouter.route('/', {
  triggersEnter: [function(context, redirect) {
    redirect('/dashboard');
  }]
});
