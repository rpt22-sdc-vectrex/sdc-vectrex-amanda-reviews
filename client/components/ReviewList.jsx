import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReviewHeader from './ReviewHeader';
import ReviewBody from './ReviewBody';
import ProductInfo from './ProductInfo';

const Container = styled.div`
  padding: 6px;
  margin: 24px 0;
`;

class ReviewList extends React.Component {
  render() {
    const { props } = this;
    return (
      props.reviewData.reviewsArray.map((review) => (
        <Container key={review.username}>
          <ReviewHeader info={review} />
          <ReviewBody info={review} />
          <ProductInfo
            itemName={props.reviewData.itemName}
            mainImage={props.reviewData.mainImage}
          />
        </Container>
      ))
    );
  }
}

ReviewList.propTypes = {
  reviewData: PropTypes.objectOf(PropTypes.object).isRequired,
  itemName: PropTypes.string.isRequired,
  mainImage: PropTypes.string.isRequired,
};

export default ReviewList;
