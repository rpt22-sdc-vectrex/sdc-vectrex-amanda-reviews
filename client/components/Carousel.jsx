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
          {props.reviewData.reviewsArray.map((review) => {
            if (review.reviewPicture) {
              return (
                <li><img alt="review" src={review.reviewPicture} /></li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  }
}

export default Carousel;
