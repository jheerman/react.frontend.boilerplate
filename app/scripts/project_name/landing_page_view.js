import Backbone from "backbone";
import template from "project_name/landing_page_template.ejs";
import "script!underscore";
import "script!dash-banner.js";

class LandingPageView extends Backbone.View {

  events() {
      return {
        "click [data-action=flash-banner]": "flashBanner"
      }
  };

  render() {
    this.$el.html(template({
      header: "Hello world"
    }));
    return this;
  };

  flashBanner() {
    DashBanner.View.flashSuccess("Hello")
  };

};

module.exports = LandingPageView;
