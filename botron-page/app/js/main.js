requirejs.config({
  paths: {
    //tries to load jQuery from Google's CDN first and falls back
    //to load locally
    "jquery": ["../bower_components/jquery/jquery",
                "libs/jquery/jquery"],
    "underscore": "../bower_components/underscore/underscore",
    "backbone": "../bower_components/backbone/backbone",
    "text": "../bower_components/requirejs-text/text",
    "backbone.paginator": "../bower_components/backbone.paginator/lib/backbone.paginator"
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


define(["backbone", "text!/templates/temp.html", "backbone.paginator"],
function (Backbone, temp, PageableCollection) {

  //var Issues = Backbone.PageableCollection.extend({
  var Issues = Backbone.Collection.extend({
    //url: "https://api.github.com/search/issues",
    url: "/issues",

    // Initial pagination states
    // state: {
    //   pageSize: 15,
    //   sortKey: "updated",
    //   order: 1
    // },
    //
    // // You can remap the query parameters from `state` keys from
    // // the default to those your server supports
    // queryParams: {
    //   totalPages: null,
    //   totalRecords: null,
    //   sortKey: "sort",
    //   //q: "state:closed repo:jashkenas/backbone"
    // },
    //
    // parseState: function (resp, queryParams, state, options) {
    //   return {totalRecords: resp.total_count};
    // },
    //
    // parseRecords: function (resp, options) {
    //   return resp.items;
    // }

  });

  issues = new Issues().fetch().then(function (data) {
    debugger;
  });

  var AppView = Backbone.View.extend({
    template: _.template(temp),
    el: '#content',
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });
  var appView = new AppView();
});
