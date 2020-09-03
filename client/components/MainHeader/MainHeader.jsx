import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars/Stars';
import MainHeading from './MainHeader.styles';

const MainHeader = (props) => (
  <div>
    <MainHeading>
      {props.storeReviewCount}
      {' '}
      reviews
    </MainHeading>
    <Stars rating={props.rating} />
  </div>
);

MainHeader.propTypes = {
  storeReviewCount: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default MainHeader;
