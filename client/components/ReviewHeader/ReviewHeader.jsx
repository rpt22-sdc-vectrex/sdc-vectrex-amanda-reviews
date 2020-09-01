import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from '../shared/Link';
import ImageSmall from '../shared/ImageSmall';
import Container from './ReviewHeader.styles';

const ReviewHeader = (props) => (
  <Container>
    <ImageSmall alt="profile" src={props.userPicture} bRadius="18px" />
    <Link href={props.user_profile_url}>{props.username}</Link>
    { moment(props.date).format('ll')}
  </Container>
);

ReviewHeader.defaultProps = {
  userPicture: 'http://placehold.it/36x36',
  user_profile_url: 'http://placehold.it/179x179',
  username: '',
  date: '2019-10-05T07:00:00.000Z',
};

ReviewHeader.propTypes = {
  userPicture: PropTypes.string,
  user_profile_url: PropTypes.string,
  username: PropTypes.string,
  date: PropTypes.string,
};

export default ReviewHeader;
