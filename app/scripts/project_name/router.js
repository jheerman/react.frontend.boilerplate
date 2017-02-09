import Backbone from "backbone";
import LandingPageView from "project_name/landing_page_view";

export default class extends Backbone.Router {

  routes() {
    return {
      "": "showLandingPage",
      "logout": "logout",
      "loginSuccess#access_token=*path": "captureToken",
      "loginSuccess%23access_token=*path": "captureToken",
    };
  }

  constructor(options) {
    super(options);
    this.authenticator = options.authenticator
    this.appContainer = options.appContainer
  }

  showLandingPage() {
    this.authenticator.authenticate(() => {
      var view = new LandingPageView();
      this.appContainer.html(view.render().el);
    })
  }

  logout() {
    this.authenticator.logout()
  }

  captureToken() {
    this.authenticator.captureToken(() => {
      this.navigate("", {
        trigger: true
      })
    })
  }

};
