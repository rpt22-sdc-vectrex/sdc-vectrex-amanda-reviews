import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import Stars from './Stars';
import Carousel from './Carousel';
import Pager from './Pager';

export const MainHeading = styled.h3`
  font-family: ${({ theme: { fonts } }) => `${fonts[1]}`};
  font-size: 26px;
  font-weight: 300;
`;

const Container = styled.div`
  font-weight: 300;
`;

export default class ReviewsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeCount: 0,
      rating: 0,
      productCount: 0,
      reviewList: [],
      reviewPictures: [],
      pageNumber: 1,
      sortBy: 'rating',
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    // const queryString = window.location.pathname;
    // var id = url.substring(url.lastIndexOf('/') + 1);
    const id = 70;
    Promise.all([
      axios.get(`/review-summary/${id}`),
      axios.get(`/review-list/${id}`),
      axios.get(`/reviews-pictures/${id}`),
    ])
      .then(([reviewSummary, reviewList, reviewPictures]) => {
        this.setState({
          ...reviewSummary.data,
          reviewList: reviewList.data,
          reviewPictures: reviewPictures.data,
        }, () => console.log(this.state));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageClick(pageNum) {
    console.log('page', pageNum);
    // const queryString = window.location.pathname;
    // var id = url.substring(url.lastIndexOf('/') + 1);
    const id = 70;
    this.setState({
      pageNumber: pageNum,
    });
    const { sortBy } = this.state;
    axios.get(`/review-list/${id}`, {
      params: {
        pageNumber: pageNum,
        sortBy,
      },
    })
      .then((response) => {
        this.setState({
          reviewList: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { state } = this;
    return (
      <Container>
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
        <Pager
          handlePageClick={this.handlePageClick}
          reviewList={state.reviewList}
          activePage={state.pageNumber}
          totalPages={Math.ceil(state.productCount / 4)}
        />
        <Carousel allImages={state.reviewPictures} />
      </Container>
    );
  }
}

// {/* TODO: don't hardcode Limit 4
//     TODO: switch between productCount or storeCount */}
