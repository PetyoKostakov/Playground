define(["backbone", "text!/templates/SplitAppPageTemplate.html"],
function (Backbone, pageTemplate) {
    return Backbone.View.extend({
        template: _.template(pageTemplate),
        events: {
            "click .next-item": "nextItem",
            "click .prev-item": "prevItem"
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var collection = this.model.collection,
                totalRecords = collection.state.totalRecords,
                modelIndex = collection.indexOf(this.model),
                currentPage = collection.state.currentPage,
                pageSize = collection.state.pageSize;

            var obj = {
                position: ((currentPage - 1) * pageSize) + modelIndex + 1,
                totalRecords: totalRecords,
                issuesFrom: ((currentPage - 1) * pageSize),
                issuesTo: ((currentPage - 1) * pageSize) + pageSize
            };
            //this.collection.state.currentPosition(obj.position);

            this.el.innerHTML = this.template(_.extendOwn(obj, this.model.attributes));
        },
        nextItem: function () {
          //TODO export this into function DRY
            var collection = this.model.collection,
                selectedAtIndex = collection.state.selectedElAtIndex,
                nextModel = collection.at(selectedAtIndex + 1);

            collection.state.selectedElAtIndex = this.model.collection.indexOf(nextModel);
            this.parent.renderPageView(nextModel);
        },
        prevItem: function () {
          //TODO export this into function DRY
          var collection = this.model.collection,
            selectedAtIndex = collection.state.selectedElAtIndex,
            nextModel = collection.at(selectedAtIndex - 1);

          collection.state.selectedElAtIndex = this.model.collection.indexOf(nextModel);
          this.parent.renderPageView(nextModel);
        },
    });
});