import "script!jquery";
import Router from "project_name/router";
import Authenticator from "project_name/authenticator";

var router = new Router({
  appContainer: $("[data-id=app]"),
  authenticator: new Authenticator("internal_scan_app", {
    baseUrl: "https://dev-accounts.smchcn.net/Auth/SMI/oauth/authorize",
    clientId: "internal_scan_app",
    redirectUrl: "https://localhost:9003/#/loginSuccess",
    responseType: "token",
    scopes: ["documents", "identity", "needs", "workflow"]
  }),
});
Backbone.history.start();
