/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Stars from './Stars';

class ReviewBody extends React.Component {
  render() {
    const { props } = this;
    return (
      <div>
        <Stars />
        <p>{props.info.text}</p>
      </div>
    );
  }
}

export default ReviewBody;
