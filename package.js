Package.describe({
    summary: "The TemplateSession provides reactive variables for template instances.",
    version: "0.3.5",
    git: "https://github.com/frozeman/meteor-template-session2.git"
});


Package.on_use(function (api) {

	api.versionsFrom('METEOR-CORE@0.9.0');

    // third party
    api.use('underscore', 'client');

    api.export('TemplateSession');

    // FILES
    api.add_files('TemplateSession.js', 'client');
});

Package.on_test(function (api) {

    api.use('template-session2');
    api.use('tinytest');
    api.add_files('TemplateSession_tests.js', 'client');

});