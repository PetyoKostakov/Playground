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
            this.el.innerHTML = this.template(this.model.toJSON());
        }
    });
});