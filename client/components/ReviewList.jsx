/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReviewHeader from './ReviewHeader';
import ReviewBody from './ReviewBody';
import ProductInfo from './ProductInfo';

class ReviewList extends React.Component {
  render() {
    return (
      <div>
        <ReviewHeader />
        <ReviewBody />
        <ProductInfo />
        {/* <Picture /> */}
      </div>
    );
  }
}

export default ReviewList;
