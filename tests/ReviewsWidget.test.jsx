import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import ReviewsWidget, { MainHeading } from '../client/components/ReviewsWidget';
import Dropdown from '../client/components/Dropdown';
import Carousel from '../client/components/Carousel';
import { REVIEW_DATA } from './mockData';

const moxios = require('moxios');

const TEST_THEME = {
  colors: {
    darkGray: '#222222',
    middleGray: '#595959',
    lightGray: '#b1b1b1',
  },
  fonts: ['Roboto', 'Merriweather'],
};

const getThemeProviderWrappingComponent = (theme) => ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export const shallowWithTheme = (component, theme) => shallow(component, {
  wrappingComponent: getThemeProviderWrappingComponent(theme),
});

export const mountWithTheme = (component, theme) => {
  const wrapper = mount(component, {
    wrappingComponent: getThemeProviderWrappingComponent(theme),
  });

  return wrapper;
};

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
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    expect(wrapper.find(MainHeading)).toHaveLength(1);
  });

  it('should fetch review data and update state', (done) => {
    moxios.stubRequest('/reviews/all/2', {
      status: 200,
      response: REVIEW_DATA,
    });
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    moxios.wait(() => {
      expect(wrapper.state('reviewData')).toEqual(REVIEW_DATA);
      done();
    });
  });

  it('should render the inner component: Dropdown', () => {
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    expect(wrapper.find(Dropdown).length).toEqual(1);
  });

  it('should render the inner component: Carousel', () => {
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    expect(wrapper.find(Carousel).length).toEqual(1);
  });
});
