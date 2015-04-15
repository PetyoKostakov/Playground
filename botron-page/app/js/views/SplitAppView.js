define(["backbone", "js/collections/IssuesCollection.js", "js/views/SplitAppIssueView.js", "js/views/SplitAppPageView.js", "text!/templates/SplitAppTemplate.html", "js/views/SplitAppPaginationView.js", "text!/templates/temp.html"],
function (Backbone, Issues, IssueView, Page, splitAppTmpt, Pagination, temp) {
  var SplitAppView = Backbone.View.extend({
    template: _.template(splitAppTmpt),
    events: {
      "click .bt-split-cont-nav-sort": "toggleSort",
      "click li.bt-list-el": "clickListItem"
    },
    clickListItem: function (e) {
      if (this.curruntSelected) {
        $(this.curruntSelected).removeClass('selected');
      }
      var model = this.collection.get(e.currentTarget.id);
      
      this.curruntSelected = e.currentTarget;

      $(e.currentTarget ).addClass("selected");
      this.renderPageView(model);
    } ,
    initialize: function () {
      this.listenTo(this.collection, 'change', this.rerender);//TODO do not work for some reason
      this.listenTo(this.collection, 'sync', this.rerender);
      
      this.render();
    },
    childViews: {
      paginationView: {},
      pageView: {}
    },
    render: function () {
      //TODO refactor use template for generating all these
      this.$el.html(this.template());

      var $navContUlEl = this.$('.bt-split-cont-nav > .bt-split-cont-nav-ul'),
          $paginationCont = this.$('.bt-split-cont-nav-pagination');

      this.renderIssues($navContUlEl);
      this.childViews.paginationView = new Pagination({el: $paginationCont, collection: this.collection, parent: this});
      this.childViews.pageView = new Page({el: this.$('.bt-split-cont-page'), model: this.collection.models[0]});
      this.childViews.pageView.parent = this;

      return this;
    },
    rerender: function () {
      this.el.innerHTML = '';
      this.render();

      return this;
    },
    //todo comment
    _getModelListNumber: function (model) {
        model.current = this.collection.indexOf(model);
    },
    toggleSort: function () {
      var collection = this.collection;

      collection.sortDirection = collection.sortDirection * -1;
      collection.sort();
      this.rerender();
    },
    // RENDERING CHILDS
    renderPageView: function (model) {
      model.view.$el.addClass("selected");
      this.childViews.pageView.model = model;
      this.childViews.pageView.render();
    },
    renderIssues: function ($el) {
      var that = this; //TODO get rid of this
      
      this.collection.forEach(function (issue) {
        issue.view = new IssueView({model: issue, el: $el, parent: that});
        issue.view.parent = that;
        $el.append(issue.view.render().el);
      });
    }
  });
  
  return SplitAppView;
});