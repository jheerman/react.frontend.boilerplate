import Router from "project_name/router";
import $ from "jquery";
import jasmine_jquery from "jasmine-jquery";
import FakeAuthenticator from "fakes/authenticator";

describe("Router", () => {

  describe("Showing the landing page", () => {
    var fixtures, container

    beforeEach(() => {
      fixtures = setFixtures('<div data-id="some-container"></div><div data-id="templates"><div data-id="landing-page">{{header}}</div></div>');
      container = fixtures.find("[data-id=some-container]");
    })

    it("renders the landing page view", () => {
      var authenticator = new FakeAuthenticator({
        loggedIn: true
      })
      var router = new Router({
        authenticator: authenticator,
        appContainer: container
      });

      router.showLandingPage();

      expect(container.text()).toContain("Hello world");
    });

    it("does not render the landing page view", () => {
      var authenticator = new FakeAuthenticator({
        loggedIn: false
      })
      var router = new Router({
        authenticator: authenticator,
        appContainer: container
      });

      router.showLandingPage();

      expect(container.text()).not.toContain("Hello world");
    })
  });

});
