/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class Carousel extends React.Component {
  render() {
    const { props } = this;
    return (
      <div>
        <h5>Photos from reviews</h5>
        <ul>
          {props.allImages.map((image) => (
            <li key={image}><img alt="review" src={image} /></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Carousel;
