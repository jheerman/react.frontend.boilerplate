import path from "path";
import foo from "project_name/foo";
import _ from "underscore";

describe("Foo", function() {
  //Can import node packages
  it("should import path", function() {
    expect(path).not.toBe(null);
  });

  //Can import foo
  it("should import foo", function() {
    expect(foo()).toEqual("Hello world")
  });

  it("has underscore", function() {
      var doubled = _.map([1, 2, 3], function(number) {
        return number * 2;
      });
      expect(doubled).toEqual([2, 4, 6])
  });
});
