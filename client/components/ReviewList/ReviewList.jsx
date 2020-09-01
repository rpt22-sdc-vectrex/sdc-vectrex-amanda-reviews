import React from 'react';
import PropTypes from 'prop-types';
import ReviewListItem from '../ReviewListItem/ReviewListItem';

class ReviewList extends React.Component {
  render() {
    const { props } = this;
    return (
      props.reviewListInfo.map((review) => (
        <ReviewListItem review={review} key={review.username} />
      ))
    );
  }
}

ReviewList.propTypes = {
  reviewListInfo: PropTypes.arrayOf(PropTypes.shape({
    userPicture: PropTypes.string,
    user_profile_url: PropTypes.string,
    username: PropTypes.string,
    date: PropTypes.string,
    rating: PropTypes.number,
    text: PropTypes.string,
    reviewPicture: PropTypes.string,
    mainImage: PropTypes.string,
    itemName: PropTypes.string,
    product_id: PropTypes.number,
  })).isRequired,
};

export default ReviewList;
