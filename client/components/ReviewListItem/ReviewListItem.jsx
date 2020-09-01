import React from 'react';
import PropTypes from 'prop-types';
import ReviewHeader from '../ReviewHeader/ReviewHeader';
import ReviewBody from '../ReviewBody/ReviewBody';
import ProductInfo from '../ProductInfo/ProductInfo';
import Container from './ReviewListItem.styles';

const ReviewListItem = (props) => {
  const { review } = props;
  return (
    <Container>
      <ReviewHeader
        userPicture={review.userPicture}
        user_profile_url={review.user_profile_url}
        username={review.username}
        date={review.date}
      />
      <ReviewBody
        rating={review.rating}
        text={review.text}
        reviewPicture={review.reviewPicture}
      />
      <ProductInfo
        itemName={review.itemName}
        mainImage={review.mainImage}
        product_id={review.product_id}
      />
    </Container>
  );
};

ReviewListItem.defaultProps = {
  review: {},
};

ReviewListItem.propTypes = {
  review: PropTypes.shape({
    userPicture: PropTypes.string,
    user_profile_url: PropTypes.string,
    username: PropTypes.string,
    date: PropTypes.string,
    rating: PropTypes.number,
    text: PropTypes.string,
    reviewPicture: PropTypes.string,
    itemName: PropTypes.string,
    mainImage: PropTypes.string,
    product_id: PropTypes.number,
  }),
};

export default ReviewListItem;
