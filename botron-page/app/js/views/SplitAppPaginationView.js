define(["backbone", "text!/templates/SplitAppPaginationTemplate.html"],
function (Backbone, paginationTmpl) {
  var Pagination = Backbone.View.extend({
    initialize: function () {
      this.render();
    },
    events: {
      "click .next-page": "nextPage",
      "click .prev-page": "prevPage"
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
      this.collection.getNextPage();
    },
    prevPage: function () {
      this.collection.getPreviousPage();
    }
  });
  
  return Pagination;
}); 