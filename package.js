Package.describe({
    name: "mrt:template-session2",
    summary: "The TemplateSession provides reactive variables for template instances.",
    version: "0.3.9",
    git: "https://github.com/frozeman/meteor-template-session2.git"
});


Package.onUse(function (api) {
    api.versionsFrom('METEOR@0.9.1');

    // core
    api.use('reactive-var', 'client');
    api.use('underscore', 'client');

    api.export('TemplateSession');

    // FILES
    api.addFiles('TemplateSession.js', 'client');
});

Package.onTest(function (api) {
    // api.use('mrt:template-session2');
    // api.use('tinytest');
    // api.addFiles('TemplateSession_tests.js', 'client');
});