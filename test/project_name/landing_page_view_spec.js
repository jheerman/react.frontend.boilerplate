import LandingPageView from "project_name/landing_page_view";

describe("LandingPageView", function() {

  describe("Rendering the view", () => {
    it("displays 'Hello world'", function() {
      var view = new LandingPageView();

      view.render();

      expect(view.$el.text()).toContain("Hello world");
    });
  });

  describe('Clicking a button', () => {
    it('flashes a banner', () => {
      var view = new LandingPageView();
      view.render();
      var flashSuccessSpy = spyOn(DashBanner.View, "flashSuccess");

      view.$("[data-action=flash-banner]").click()

      expect(flashSuccessSpy).toHaveBeenCalled()
    });
  });
});
