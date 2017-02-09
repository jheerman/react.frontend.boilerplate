import LandingPage from 'components/LandingPage';
import React from 'react';
import {shallow,find} from 'enzyme';

describe('LandingPage Component', function() {
	var component, wrapper;

	beforeEach(() => {
		component = <LandingPage/>;
		wrapper = shallow(component);
	});

	it('react import should work', () => {
		expect(React).not.toBe(null);
	});

	it('landing page import should work', () => {
		expect(LandingPage).not.toBe(null);
	});

	it("renders 'Hello World'", () => {
		let el = wrapper.find(".foo");
		expect(el).not.toBe(undefined);
		expect(el.props().children).toEqual("Hello World!");
	});
});
