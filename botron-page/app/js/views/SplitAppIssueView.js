define(["backbone", "text!/templates/IssueViewTemplate.html"],
function (Backbone, issueTmpt) {
  var IssueView = Backbone.View.extend({
    template: _.template(issueTmpt),
    render: function () {
      this.$el.append(this.template(this.model.toJSON()));
      return this;
    }
  });
  
  return IssueView;
});