/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class Carousel extends React.Component {
  render() {
    return (
      <div>
        <h5>Photos from reviews</h5>
        <ul>
          <li><img alt="img1" src="http://placehold.it/150x150" /></li>
          <li><img alt="img1" src="http://placehold.it/150x150" /></li>
        </ul>
      </div>
    );
  }
}

export default Carousel;
