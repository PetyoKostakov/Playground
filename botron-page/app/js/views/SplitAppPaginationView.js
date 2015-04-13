define(["backbone", "text!/templates/SplitAppPaginationTemplate.html"],
function (Backbone, paginationTmpl) {
  var Pagination = Backbone.View.extend({
    initialize: function () {
      this.render();
    },
    events: {
      "click .next-page": "nextPage",
      "click .prev-page": "prevPage",
      "click .pagination-nav-number": "_navigateToPage"
    },
    template: _.template(paginationTmpl),
    render: function () {
      var collection = this.collection,
        currentPage = collection.state.currentPage,
        totalObject = collection.state.totalRecords,
        perPage = collection.state.pageSize;

      this.el.innerHTML = this.template({
        pageCount: parseInt(totalObject/perPage),
        currentPage: currentPage
      });
    },
    nextPage: function () {
      var collection = this.collection; 
      debugger;
      collection.getNextPage().done(function (data) {
        collection.fetch();
      });
    },
    prevPage: function () {
      debugger;
      this.collection.getPreviousPage().done(function (data) {
        debugger;
      });
    },
    _navigateToPage: function (e) {
      this.collection.getPage(parseInt(e.target.innerText));
    }
  });
  
  return Pagination;
}); 