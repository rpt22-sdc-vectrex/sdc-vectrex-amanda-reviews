/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class ReviewHeader extends React.Component {
  render() {
    const { props } = this;
    return (
      <div>
        <img alt="profile" src={props.info.userPicture} />
        <a href={props.info.user_profile_url}>{props.info.username}</a>
        <span>{props.info.date}</span>
      </div>
    );
  }
}

export default ReviewHeader;
