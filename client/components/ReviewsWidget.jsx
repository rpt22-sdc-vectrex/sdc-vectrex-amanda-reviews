import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewList from './ReviewList';
import Dropdown from './Dropdown';
import Stars from './Stars';
import Carousel from './Carousel';
import Pager from './Pager';

const MainHeading = styled.h3`
  font-family: ${({ theme: { fonts } }) => `${fonts[1]}`};
  font-size: 26px;
`;

export default class ReviewsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    axios.get(`/reviews/all/${id}`)
      .then((response) => {
        this.setState({
          reviewData: response.data,
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
        <MainHeading>68 reviews</MainHeading>
        <Stars />
        <div>
          <button type="button" className="itemReviews">
            Reviews for this item
            <span>{state.reviewData.reviewsArray.length}</span>
          </button>
          <button type="button" className="shopReviews">
            Reviews for this shop
            <span>68</span>
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
