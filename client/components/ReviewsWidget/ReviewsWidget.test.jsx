import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import ReviewsWidget from './ReviewsWidget';
import MainHeader from '../MainHeader/MainHeader';
import ReviewTab from '../ReviewTab/ReviewTab';
import ReviewPager from '../ReviewPager/ReviewPager';
import Carousel from '../Carousel/Carousel';
import { REVIEW_LIST, REVIEW_SUMMARY, REVIEW_PICTURES } from '../../../testUtils/mockData';

const moxios = require('moxios');

const TEST_THEME = {
  colors: {
    darkGray: '#222222',
    middleGray: '#595959',
    lightGray: '#b1b1b1',
    paleGray: '#aaaaaa',
  },
  fontSize: {
    extraSmall: '13px',
    small: '14px',
    normal: '16px',
    large: '26px',
  },
  fontWeight: {
    light: '300',
    regular: '400',
    boldish: '500',
    bold: '700',
  },
  fontShorthand: {
    baseMain: '300 16px/150% Roboto',
    smallMain: '300 13px/150% Roboto',
    boldMain: '500 13px/150% Roboto',
    badgeMain: '400 13px/1 Roboto',
    baseHeading: '300 26px/42px GuardianEgypt, Merriweather, serif',
  },
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

// useful helper: console.log(wrapper.debug());
describe('ReviewsWidget component rendering tests', () => {
  it('component renders without crashing', () => {
    shallow(<ReviewsWidget />);
  });

  it('should render the inner component: MainHeader', () => {
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    expect(wrapper.find(MainHeader).length).toEqual(1);
  });

  it('should render the inner component: ReviewTab', () => {
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    expect(wrapper.find(ReviewTab).length).toEqual(1);
  });

  it('should render the inner component: ReviewPager', () => {
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    expect(wrapper.find(ReviewPager).length).toEqual(1);
  });

  it('should render the inner component: Carousel', () => {
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    expect(wrapper.find(Carousel).length).toEqual(1);
  });
});

describe('ReviewsWidget initial state tests', () => {
  it('initial value of rating in state should be 0', () => {
    const wrapper = shallow(<ReviewsWidget />);
    expect(wrapper.state('rating')).toEqual(0);
  });

  it('initial value of activeTab in state should be productReviews', () => {
    const wrapper = shallow(<ReviewsWidget />);
    expect(wrapper.state('activeTab')).toEqual('productReviews');
  });

  it('initial value of isDropdownOpen in state should be true', () => {
    const wrapper = shallow(<ReviewsWidget />);
    expect(wrapper.state('isDropdownOpen')).toEqual(false);
  });
});

describe('Fetching and updating', () => {
  beforeEach(() => {
    // Mock the browser URL of product ID 2
    window.location = {
      pathname: '/some/path/2',
    };

    moxios.install();
    moxios.stubRequest('http://localhost:8888/review-summary/2', {
      status: 200,
      response: REVIEW_SUMMARY,
    });
    moxios.stubRequest('http://localhost:8888/review-list/2', {
      status: 200,
      response: REVIEW_LIST,
    });
    moxios.stubRequest('http://localhost:8888/reviews-pictures/2', {
      status: 200,
      response: REVIEW_PICTURES,
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch review data and update state', (done) => {
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    moxios.wait(() => {
      expect(wrapper.state('reviewList')).toEqual(REVIEW_LIST);
      expect(wrapper.find('MainHeader').prop('rating')).toEqual(4);
      done();
    });
  });

  it('should pass the right number of total product pages to ReviewPager', (done) => {
    const wrapper = shallowWithTheme(<ReviewsWidget />, TEST_THEME);
    moxios.wait(() => {
      expect(wrapper.find('ReviewPager').prop('totalPages')).toEqual(7);
      done();
    });
  });

  it('should update the tab and pages after clicking the shop tab', (done) => {
    const wrapper = mountWithTheme(<ReviewsWidget />, TEST_THEME);
    moxios.wait(() => {
      wrapper.find('Menu').find('button').find({ value: 'shopReviews' }).simulate('click');
      moxios.wait(() => {
        expect(wrapper.find('ReviewTab').prop('activeTab')).toEqual('shopReviews');
        expect(wrapper.find('ReviewPager').prop('totalPages')).toEqual(22);
        done();
      });
    });
  });
});
