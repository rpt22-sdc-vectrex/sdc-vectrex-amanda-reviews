import React from 'react';
import PropTypes from 'prop-types';
import ReviewListItem from './ReviewListItem';

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
  reviewListInfo: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ])).isRequired,
};

export default ReviewList;
