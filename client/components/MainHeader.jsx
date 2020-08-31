import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Stars from './Stars';

const MainHeading = styled.h3`
  font-family: ${(({ theme: { fonts } }) => `${fonts[1]}`)};
  font-size: 26px;
  font-weight: 300;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  line-height: 42px;
  margin: 0 6px 0 0;
`;

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
