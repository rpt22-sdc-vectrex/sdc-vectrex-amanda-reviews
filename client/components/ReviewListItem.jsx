import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReviewHeader from './ReviewHeader';
import ReviewBody from './ReviewBody';
import ProductInfo from './ProductInfo';

const Container = styled.div`
  padding: 6px;
  margin: 24px 0 30px;
`;

const ReviewListItem = (props) => {
  const { review } = props;
  return (
    <Container>
      <ReviewHeader info={review} />
      <ReviewBody info={review} />
      <ProductInfo info={review} />
    </Container>
  );
};

ReviewListItem.defaultProps = {
  review: {},
};

ReviewListItem.propTypes = {
  review: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.oneOf([null]),
  ])),
};

export default ReviewListItem;
