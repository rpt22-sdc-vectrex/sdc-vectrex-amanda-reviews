/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReviewHeader from './ReviewHeader';
import ReviewBody from './ReviewBody';
import ProductInfo from './ProductInfo';

class ReviewList extends React.Component {
  render() {
    const { props } = this;
    return (
      props.reviewData.reviewsArray.map((review) => (
        <div key={review.username}>
          <ReviewHeader info={review} />
          <ReviewBody info={review} />
          <ProductInfo
            itemName={props.reviewData.itemName}
            mainImage={props.reviewData.mainImage}
          />
          {/* <Picture /> */}
        </div>
      ))
    );
  }
}

export default ReviewList;
