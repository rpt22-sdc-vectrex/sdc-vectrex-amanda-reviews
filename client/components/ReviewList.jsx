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

ReviewList.defaultProps = {
  itemName: 'Vase',
  mainImage: 'http://placehold.it/75x75',
};

ReviewList.propTypes = {
  reviewData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ])).isRequired,
  itemName: PropTypes.string,
  mainImage: PropTypes.string,
};

export default ReviewList;
