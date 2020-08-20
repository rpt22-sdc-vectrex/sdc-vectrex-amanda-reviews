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

ReviewHeader.propTypes = {
  info: PropTypes.arrayOf(PropTypes.object).isRequired,
  userPicture: PropTypes.string.isRequired,
  user_profile_url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default ReviewHeader;
