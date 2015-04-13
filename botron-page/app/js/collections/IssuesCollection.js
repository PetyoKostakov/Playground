define(["backbone", "backbone.paginator"],
function (Backbone,PageableCollection) {
  var Issues = Backbone.PageableCollection.extend({
    url: "/issues",
    queryParams: {
      currentPage: 15,
      pageSize: 15,
      pageNumber: 1
    },
    sortAttribute: "summary",
    sortDirection: 1,
    comparator: function(a, b) {

      var a = a.get(this.sortAttribute),
        b = b.get(this.sortAttribute);

      if (a == b) return 0;

      if (this.sortDirection == 1) {
        return a > b ? 1 : -1;
      } else {
        return a < b ? 1 : -1;
      }
    }
  });
  
  return Issues;
});