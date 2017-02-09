import "script!dash.js/dist/dash.min.js";

export default class {
  constructor(id, config) {
    this.id = id;
    this.config = config;
  }

  authenticate(callback, redirectUrl) {
    var token = Dash.OAuth.TokenAccessor.get(this.id)
    var urlGenerator = new Dash.OAuth.UrlGenerator(this.config)
    if (token) {
      new Dash.Redirector().redirect();
      (new Dash.OAuth.AutoRefresh(this.id, urlGenerator)).register();
      callback();
    } else {
      new Dash.Redirector(redirectUrl).register();
      (new Dash.OAuth.AccessRequester(urlGenerator)).requestAccess();
    }
  }

  captureToken(callback) {
    var response = this._parseBrowserLocation()
    if (!response.isValidState()) {
      return callback()
    } else {
      Dash.OAuth.TokenAccessor.set(this.id, response.token(), parseInt(response.expiresIn()))
      if (Dash.OAuth.AutoRefresh.isFlagSet()) {
        return Dash.OAuth.AutoRefresh.expireFlag()
      } else {
        return callback()
      }
    }
  }

  logout() {
    Dash.OAuth.TokenAccessor.expire(this.id)
    var logoutUrl = "https://dev-accounts.smchcn.net/Auth/Signout?redirectUrl=https://localhost:9003"
    Dash.Browser.Location.change(logoutUrl)
  }

  _parseBrowserLocation() {
    var url = Dash.Browser.Location.hash().replace('%23', '#');
    return new Dash.OAuth.Response(url || '#');
  }
};
