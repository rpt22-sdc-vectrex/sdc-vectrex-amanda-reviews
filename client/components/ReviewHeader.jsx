import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import Link from './Link';
import ImageSmall from './ImageSmall';

const Container = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.colors.middleGray};
  margin-bottom: 6px;
`;

const ReviewHeader = (props) => {
  const { info } = props;
  return (
    <Container>
      <ImageSmall alt="profile" src={info.userPicture} bRadius="18px" />
      <Link href={info.user_profile_url}>{info.username}</Link>
      { moment(info.date).format('ll')}
    </Container>
  );
};

ReviewHeader.defaultProps = {
  info: {},
  userPicture: 'http://placehold.it/36x36',
  user_profile_url: 'http://placehold.it/179x179',
  username: '',
  date: '2019-10-05T07:00:00.000Z',
};

ReviewHeader.propTypes = {
  info: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
    PropTypes.oneOf([null]),
  ]),
  userPicture: PropTypes.string,
  user_profile_url: PropTypes.string,
  username: PropTypes.string,
  date: PropTypes.string,
};

export default ReviewHeader;
