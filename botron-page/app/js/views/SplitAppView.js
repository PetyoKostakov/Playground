define(["backbone", "js/collections/IssuesCollection.js", "js/views/SplitAppIssueView.js", "text!/templates/SplitAppTemplate.html", "js/views/SplitAppPaginationView.js", "text!/templates/temp.html"],
function (Backbone, Issues, IssueView, splitAppTmpt, Pagination, temp) {
  var SplitAppView = Backbone.View.extend({
    template: _.template(splitAppTmpt),
    events: {
      "click .bt-split-cont-nav-sort": "toggleSort"
    },
    initialize: function () {
      this.childViews.paginationView = new Pagination({collection: this.collection});
      this.render();
    },
    childViews: {},
    render: function () {
      var template = this.$el.html(this.template()),
        $navContUlEl = this.$('.bt-split-cont-nav > .bt-split-cont-nav-ul'),
        $paginationCont = this.$('.bt-split-cont-nav-pagination');

      this.addIssues($navContUlEl);
      //$paginationCont.innerHTML(Pagination)

      return this;
    },
    rerender: function () {
      this.el.innerHTML = '';
      this.render();

      return this;
    },
    addIssues: function ($el) {
      this.collection.forEach(function (issue) {
        issue.view = new IssueView({model: issue, el: $el});
        $el.append(issue.view.render().el);
      });
    },
    addIssue: function () {

    },
    toggleSort: function () {
      var collection = this.collection;

      collection.sortDirection = collection.sortDirection * -1;
      collection.sort();
      this.rerender();
    }
  });
  
  return SplitAppView;
});