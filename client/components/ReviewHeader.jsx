/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Link from './Link';
import ImageSmall from './ImageSmall';

const Container = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.colors.middle_gray};
  margin-bottom: 6px;
`;

// eslint-disable-next-line react/prefer-stateless-function
class ReviewHeader extends React.Component {
  render() {
    const { props } = this;
    return (
      <Container>
        <ImageSmall alt="profile" src={props.info.userPicture} bRadius="18px" />
        <Link href={props.info.user_profile_url}>{props.info.username}</Link>
        { moment(props.info.date).format('ll')}
      </Container>
    );
  }
}

export default ReviewHeader;
