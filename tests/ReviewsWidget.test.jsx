import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ReviewsWidget from '../client/components/ReviewsWidget';

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<ReviewsWidget />);
  });
});
