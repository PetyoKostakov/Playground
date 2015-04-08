requirejs.config({
  paths: {
    //tries to load jQuery from Google's CDN first and falls back
    //to load locally
    "jquery": ["../../bower_components/jquery/jquery",
                "libs/jquery/jquery"],
    "underscore": "../../bower_components/underscore/underscore",
    "backbone": "../../bower_components/backbone/backbone",
    "text": "../../bower_components/requirejs-text/text"
  },
  shim: {
    "backbone": {
      //loads dependencies first
      deps: ["jquery", "underscore"],
      //custom export name, this would be lowercase otherwise
      exports: "backbone"
    }
  }
});


define(["backbone", "text!/app/templates/temp.html"/*, "../lib/aui/js/aui", "../lib/aui/js/aui-experimental"*/], function (Backbone, temp) {
  var AppView = Backbone.View.extend({
    // el - stands for element. Every view has a element associate in with HTML
    //      content will be rendered.
    template: _.template(temp),
    el: '#content',
    // It's the first function called when this view it's instantiated.
    initialize: function () {
      this.render();
    },
    // $el - it's a cached jQuery object (el), in which you can use jQuery functions
    //       to push content. Like the Hello World in this case.
    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });
  var appView = new AppView();
});
