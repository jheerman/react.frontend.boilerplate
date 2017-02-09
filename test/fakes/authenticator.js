export default class {

  constructor(options) {
    this.loggedIn = options.loggedIn
  }

  authenticate(callback) {
    if (this.loggedIn) {
      callback()
    }
  }

}
