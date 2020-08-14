/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Stars from './Stars';

class ReviewBody extends React.Component {
  render() {
    return (
      <div>
        <Stars />
        <p>text here</p>
      </div>
    );
  }
}

export default ReviewBody;
