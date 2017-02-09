import _ from "underscore";

module.exports = () => {
  var doubled = _.map([1, 2, 3], (number) => {
    return number * 2;
  });
  return "Hello world";
}
