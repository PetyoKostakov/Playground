define(["backbone", "js/collections/IssuesCollection.js", "js/views/SplitAppIssueView.js", "js/views/SplitAppPageView.js", "text!/templates/SplitAppTemplate.html", "js/views/SplitAppPaginationView.js", "text!/templates/temp.html"],
function (Backbone, Issues, IssueView, Page, splitAppTmpt, Pagination, temp) {
  var SplitAppView = Backbone.View.extend({
    template: _.template(splitAppTmpt),
    events: {
      "click .bt-split-cont-nav-sort": "toggleSort"
    },
    initialize: function () {
      this.listenTo(this.collection, 'change', this.rerender);//TODO do not work for some reason
      this.listenTo(this.collection, 'sync', this.rerender);
      
      this.render();
    },
    childViews: {},
    render: function () {
      //TODO refactor use template for jenerating all these
      var template = this.$el.html(this.template()),
        $navContUlEl = this.$('.bt-split-cont-nav > .bt-split-cont-nav-ul'),
        $paginationCont = this.$('.bt-split-cont-nav-pagination'),
        $pageCont = this.$('.bt-split-cont-page');

      this.addIssues($navContUlEl);
      this.childViews.paginationView = new Pagination({el: $paginationCont, collection: this.collection, parent: this});
      this.childViews.pageView = new Page({el: $pageCont, model: this.collection.models[0], parent: this})

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