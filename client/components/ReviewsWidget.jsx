import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewList from './ReviewList';
import Dropdown from './Dropdown';
import Stars from './Stars';
import Carousel from './Carousel';
import Pager from './Pager';

export const MainHeading = styled.h3`
  font-family: ${({ theme: { fonts } }) => `${fonts[1]}`};
  font-size: 26px;
`;

export default class ReviewsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeCount: 0,
      rating: 0,
      productCount: 0,
      reviewData: {
        avgRating: 0,
        itemName: '',
        mainImage: '',
        reviewsArray: [],
      },
    };
  }

  componentDidMount() {
    // const queryString = window.location.pathname;
    // var id = url.substring(url.lastIndexOf('/') + 1);
    const id = 2;
    // Promise.all([
    axios.get(`/review-summary/${id}`)
      // axios.get(''),
      // ])
      .then((response) => {
        this.setState({
          ...response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { state } = this;
    return (
      <div>
        <MainHeading>
          {state.storeCount}
          {' '}
          reviews
        </MainHeading>
        <Stars rating={state.rating} />
        <div>
          <button type="button" className="itemReviews">
            Reviews for this item
            {' '}
            {state.productCount}
          </button>
          <button type="button" className="shopReviews">
            Reviews for this shop
            {' '}
            {state.storeCount}
          </button>
        </div>
        <Dropdown />
        <ReviewList reviewData={state.reviewData} />
        <Pager />
        <Carousel reviewData={state.reviewData} />
      </div>
    );
  }
}
