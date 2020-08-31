/* eslint-disable react/prefer-stateless-function */
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

class ReviewListItem extends React.Component {
  render() {
    const { review } = this.props;
    return (
      <Container>
        <ReviewHeader info={review} />
        <ReviewBody info={review} />
        <ProductInfo
          itemName={review.itemName}
          mainImage={review.mainImage}
          id={review.id}
        />
      </Container>
    );
  }
}

ReviewListItem.defaultProps = {
  review: {},
  itemName: '',
  mainImage: '',
  id: 1,
};

ReviewListItem.propTypes = {
  review: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.oneOf([null]),
  ])),
  itemName: PropTypes.string,
  mainImage: PropTypes.string,
  id: PropTypes.number,
};

export default ReviewListItem;
