import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import ReviewsWidget from '../client/components/ReviewsWidget';
import Dropdown from '../client/components/Dropdown';
import Carousel from '../client/components/Carousel';
import { REVIEW_DATA } from './mockData';

const moxios = require('moxios');

describe('ReviewsWidget component tests with Enzyme', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('component renders without crashing', () => {
    shallow(<ReviewsWidget />);
  });

  it('should render inside elements', () => {
    expect(shallow(<ReviewsWidget />).contains(<h3>68 reviews</h3>)).toBe(true);
  });

  it('should fetch review data and update state', (done) => {
    moxios.stubRequest('/reviews/all/2', {
      status: 200,
      response: REVIEW_DATA,
    });
    const wrapper = mount(<ReviewsWidget />);
    moxios.wait(() => {
      expect(wrapper.state('reviewData')).toEqual(REVIEW_DATA);
      done();
    });
  });

  it('should render the inner component: Dropdown', () => {
    const wrapper = mount(<ReviewsWidget />);
    expect(wrapper.find(Dropdown).length).toEqual(1);
  });

  it('should render the inner component: Carousel', () => {
    const wrapper = mount(<ReviewsWidget />);
    expect(wrapper.find(Carousel).length).toEqual(1);
  });
});
