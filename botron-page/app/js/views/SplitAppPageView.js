define(["backbone", "text!/templates/SplitAppPageTemplate.html"],
function (Backbone, pageTemplate) {
    return Backbone.View.extend({
        template: _.template(pageTemplate),
       /* events: {
            "click .next-item": "nextItem",
            "click .prev-item": "prevItem"
        },*/
        initialize: function () {
            this.render();
        },
        render: function () {
            var collection = this.model.collection,
                totalRecords = collection.state.totalRecords,
                modelIndex = collection.indexOf(this.model),
                currentPage = collection.state.currentPage;

            //this.model.set("position", modelIndex + 1);
            //this.model.set("totalRecords", collection.state.totalRecords);
            
            var obj = {
                position: ((currentPage - 1) * 10) + modelIndex + 1,
                totalRecords: collection.state.totalRecords
            };
            //this.collection.state.currentPosition(obj.position);

            this.el.innerHTML = this.template(_.extendOwn(obj, this.model.attributes));
        }
        /*nextItem: function () {
            var collection = this.model.collection,
                currentPage = collection.state.currentPage,
                nextModel = collection.at(currentPage);

            collection.state.currentPage++;
            this.parent.renderPageView(nextModel);
        },
        prevItem: function () {
            debugger;
        }*/
    });
});