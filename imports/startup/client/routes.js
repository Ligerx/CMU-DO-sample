import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
// import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/layout.html';
import '../../ui/pages/backlog.html';
import '../../ui/pages/dashboard.html';

// Import to override accounts templates
// import '../../ui/accounts/accounts-templates.js'; // TODO: set up user accounts

// Below here are the route definitions
FlowRouter.route('/dashboard', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { page: 'dashboard' });
    }
});

FlowRouter.route('/backlog', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { page: 'backlog' })
    }
});
