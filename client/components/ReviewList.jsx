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

class ReviewList extends React.Component {
  render() {
    const { props } = this;
    return (
      props.reviewData.map((review) => (
        <Container key={review.username}>
          <ReviewHeader info={review} />
          <ReviewBody info={review} />
          <ProductInfo
            itemName={review.itemName}
            mainImage={review.mainImage}
            id={review.id}
          />
        </Container>
      ))
    );
  }
}

ReviewList.propTypes = {
  reviewData: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ])).isRequired,
};

export default ReviewList;
