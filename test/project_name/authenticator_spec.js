import Authenticator from "project_name/authenticator";

describe("Authenticator", () => {

  var stubAutoRefresh = () => {
    var fakeAutoRefresh = jasmine.createSpyObj('fakeAutoRefresh', ['register']);
    spyOn(Dash.OAuth, "AutoRefresh").and.returnValue(fakeAutoRefresh);
    return fakeAutoRefresh;
  };

  var stubRedirector = () => {
    var fakeRedirector = jasmine.createSpyObj("fakeRedirector", ["redirect", "register"]);
    spyOn(Dash, "Redirector").and.returnValue(fakeRedirector);
    return fakeRedirector;
  };

  var authenticator = () => {
    return new Authenticator('eyasdfJ0eXAiOi', {});
  };

  describe("Checking for a logged in user", () => {

    var fakeAutoRefresh;

    beforeEach(() => {
      fakeAutoRefresh = stubAutoRefresh();
    });

    describe("when there is a valid token", () => {
      it("registers the auto refresh", () => {
        spyOn(Dash.OAuth.TokenAccessor, "get").and.returnValue("Some Token");

        stubRedirector();

        authenticator().authenticate(() => {}, '');

        expect(fakeAutoRefresh.register).toHaveBeenCalled();
      });

      it("executes the callback", () => {
        spyOn(Dash.OAuth.TokenAccessor, "get").and.returnValue("Some Token");
        stubRedirector();

        var callback = jasmine.createSpy();

        authenticator().authenticate(callback, '');

        expect(callback).toHaveBeenCalled();
      });
    });

    describe("when there is no token", () => {
      it("requests access", () => {
        var url = 'some url';
        spyOn(Dash.OAuth.TokenAccessor, "get").and.returnValue(null);
        spyOn(Dash.OAuth, "UrlGenerator").and.returnValue(() => { var generate = {url: url, state: 'blah'}});
        var accessRequester = { requestAccess: () => {} };
        var requestAccessSpy = spyOn(accessRequester, "requestAccess");
        spyOn(Dash.OAuth, "AccessRequester").and.returnValue(accessRequester);

        stubRedirector();

        authenticator().authenticate(() => {}, '');

        expect(requestAccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe("parseBrowserLocation", () => {
    it("replaces escaped '#' with '#' for iOS Chrome workaround", () => {
      spyOn(Dash.Browser.Location, "hash").and.returnValue("localhost:9000/#/%23access_token=123&other_attribute=12");
      var _authenticator = authenticator();
      var oauthResponse = spyOn(Dash.OAuth, "Response");

      _authenticator._parseBrowserLocation();

      expect(oauthResponse).toHaveBeenCalledWith("localhost:9000/#/#access_token=123&other_attribute=12");
    });
  });
});
