The `TemplateSession` provides reactive variables for template instances.
The `TemplateSession` object makes reactive property transfers between helpers and callbacks possible.

! Requires at least meteor version 0.8.3-rc5

<!-- Demo: http://templatesession2demo.meteor.com -->

Installation
============

    $ mrt add template-session2

Usage
=====

The `TemplateSession` provides reactive variables for template instances.

Note! The reactive variables, are not preserved over hot code reloads, like the Meteor `Session` object does.


To set and get properties inside template helpers, hooks and events do as follow:

    // set a property
    TemplateSession.set('myProperty', 'myValue');

    // to get it inside a helper, or callback
    TemplateSession.get('myProperty');

In case you want to use the TemplateSession inside a callback where you also have access to the template instance, you can pass the template instance as the first object, as seen below:

	'click .do-something': function(e, template){

		Posts.insert({
			...
		}, function(error){
			if(!error)
				TemplateSession.set(template, 'myVariable', 'myValueToSet');
			else
				alert(error);
		});


	}


API Docs
========

### TemplateSession.get([template], propertyName)

When get is called it creates a `Deps.Dependency.depend()` for that key in the store.


### TemplateSession.set([template], propertyName, value)

When set is called every depending reactive function where `TemplateSession.get()` with the same key is called will rerun.
