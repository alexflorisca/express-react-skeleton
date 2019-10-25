/**
 * Tests follow this principles outlined here by Kent C Dodds
 * https://kentcdodds.com/blog/why-i-never-use-shallow-rendering
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { CSSTransition } from 'react-transition-group';
import { HiddenMessage } from './HiddenMessage';

jest.mock('react-transition-group', () => {
	return {
		CSSTransition: jest.fn(({ children }) => children)
	}
})

describe("HiddenMessage Component", () => {
	test("hide after button click with initialShow true", () => {
		const testRenderer = TestRenderer.create(<HiddenMessage initialShow={true} />);
		const testInstance = testRenderer.root;
		const buttonInstance = testInstance.findByType('button');
		
		buttonInstance.props.onClick();

		const CSSTransitionInstance = testInstance.findByType(CSSTransition);
		expect(CSSTransitionInstance.props.in).toBe(false);
	});

	test("show after button click with initialShow false", () => {
		const testRenderer = TestRenderer.create(<HiddenMessage initialShow={false} />);
		const testInstance = testRenderer.root;
		const buttonInstance = testInstance.findByType('button');

		buttonInstance.props.onClick();
		const CSSTransitionInstance = testInstance.findByType(CSSTransition);
		expect(CSSTransitionInstance.props.in).toBe(true);
	})
});
