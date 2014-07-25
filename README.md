The `TemplateSession` provides reactive variables for template instances.
The `TemplateSession` object makes reactive property transfers between helpers and callbacks possible.

! Requires at least meteor version 0.8.3-rc3

<!-- Demo: http://templatesession2demo.meteor.com -->

Installation
============

    $ mrt add template-session2

Usage
=====

The `TemplateSession` provides reactive variables for template instances.

Note! The reactive variables, are not preserved over hot code reloads, like the Meteor `Session` object does.


To set and get properties does as follow:

    // set a property
    TemplateSession.set('myProperty', 'myValue');

    // to get it inside a helper, or callback
    TemplateSession.get('myProperty');


When you want to to get/set TemplateSession from within a event use the following syntax:

    // set a property
    'click button': function(e, template){
        TemplateSession.set(template, 'myProperty', 'myValue');
    }

    // to get it inside a helper, or callback
    'click button': function(e, template){
        TemplateSession.get(template, 'myProperty');
    }


API Docs
========

### TemplateSession.get([template], propertyName)

When get is called it creates a `Deps.Dependency.depend()` for that key in the store.


### TemplateSession.set([template], propertyName, value)

When set is called every depending reactive function where `TemplateSession.get()` with the same key is called will rerun.
