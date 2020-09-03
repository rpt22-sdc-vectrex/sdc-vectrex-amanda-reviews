import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from '../shared/Link';
import ImageSmall from '../shared/ImageSmall';
import ReviewHeaderContainer from './ReviewHeader.styles';

const ReviewHeader = (props) => (
  <ReviewHeaderContainer>
    <ImageSmall alt="profile" src={props.userPicture} bRadius="18px" />
    <Link href={props.user_profile_url}>{props.username}</Link>
    {moment(props.date).format('ll')}
  </ReviewHeaderContainer>
);

ReviewHeader.defaultProps = {
  userPicture: '',
  user_profile_url: '',
  username: '',
  date: '',
};

ReviewHeader.propTypes = {
  userPicture: PropTypes.string,
  user_profile_url: PropTypes.string,
  username: PropTypes.string,
  date: PropTypes.string,
};

export default ReviewHeader;
