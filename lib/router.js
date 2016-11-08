FlowRouter.route('/example', {
    action: function(params, queryParams) {
        BlazeLayout.render('example');
    }
});

FlowRouter.route('/dashboard', {
    action: function(params, queryParams) {
        console.log("Yeah! Dashboard!");
        BlazeLayout.render('dashboard');
    }
});

FlowRouter.route('/backlog', {
    action: function(params, queryParams) {
        BlazeLayout.render('backlog');
    }
});
