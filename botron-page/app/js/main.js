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


define(["backbone", "js/collections/IssuesCollection.js", "js/views/SplitAppView.js"],
function (Backbone, Issues, SplitAppView) {
  var pageSize = 15,
      pageNum = 1;

  $.ajax( {
    url: "/splitApp",
    data: { pageNumber: pageNum, per_page: pageSize }
  })
    .done(function (data) {
      //TODO remove gloval objects
      issues = new Issues(data.issues, {
        pageSize: pageSize,
        currentPage: pageNum
      });
      // needed for pagination
      issues.state.currentPage = pageNum; // encapsulation???
      issues.state.totalRecords = data.total;
      issues.state.pageSize = pageSize;
      
      splitApp = new SplitAppView({
        el: '#content',
        collection: issues
      });
    })
    .fail(function () {
      alert("error while GET split app data");
    });
});
