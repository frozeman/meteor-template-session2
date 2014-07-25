/**
Template helpers

@module package template-store2
**/


/**
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

@class TemplateSession
@constructor
**/
TemplateSession = {

    /**
    Gets the current template instance and returns also the correct keys and values.

    @method _getTemplateInstance
    @param {Object|String} template     The given current template instance
    @param {String} key                 the given key
    @param {Mixed} value                the value to set
    @return {String} The generated key name.
    **/
    _getTemplateInstance: function(template, key, value){
        var _template = null;

        try {
            _template = Blaze.getCurrentView()._templateInstance;
            value = key;
            key = template;

        } catch(e) {
            if(!template)
                throw new Error('Pass the template instance using "call" from inside template hooks and events: TemplateSession.set.call(this|template, \'myProperty\', \'myValue\')');
            else
                _template = template;
        }

        // make sure the template session object exists
        if(_template && !_template._templateSession)
            _template._templateSession = {};

        // create Reactive var, if not existing
        if(!_template._templateSession[key])
            _template._templateSession[key] = new Blaze.ReactiveVar(value);


        // build the keyname
        return {
            key: key, 
            value: value,
            template: _template
        };
    },


    // PUBLIC

    /**
    When get is called we create a `Deps.Dependency.depend()` for that key in the store.

    @method get
    @param {Object} template         the current template instance
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'templateName->myPropertyName'`
    @return {Mixed} The stored value.
    **/
    get: function (template, propertyName) {
        var values = TemplateSession._getTemplateInstance(template, propertyName);

        return values.template._templateSession[values.key].get();
    },


    /**
    When set is called every depending reactive function where `TemplateSession.get()` with the same key is called will rerun.

    @method set
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'templateName->myPropertyName'`
    @param {String|Object} value     If the value is a string with `rerun`, then it will be rerun all dependent functions where get `TemplateInstance.get()` was called.
    @return undefined
    **/
    set: function (template, propertyName, value) {
        var values = TemplateSession._getTemplateInstance(template, propertyName, value);

        values.template._templateSession[values.key].set(values.value);
    }

};