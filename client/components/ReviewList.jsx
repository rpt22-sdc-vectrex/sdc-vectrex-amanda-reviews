/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
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

export default ReviewList;
