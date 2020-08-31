import React from 'react';
import PropTypes from 'prop-types';
import ReviewList from './ReviewList';
import PageList from './PageList';

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
  reviewList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ])).isRequired,
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};

export default ReviewPager;
