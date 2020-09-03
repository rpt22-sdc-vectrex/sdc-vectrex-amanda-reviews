import React from 'react';
import PropTypes from 'prop-types';
import ReviewList from '../ReviewList/ReviewList';
import PageList from '../PageList/PageList';

const ReviewPager = (props) => (
  <div>
    <ReviewList reviewListInfo={props.reviewList} />
    <PageList
      handlePageClick={props.handlePageClick}
      activePage={props.activePage}
      totalPages={props.totalPages}
    />
  </div>
);

ReviewPager.propTypes = {
  reviewList: PropTypes.arrayOf(PropTypes.shape({
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
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};

export default ReviewPager;
