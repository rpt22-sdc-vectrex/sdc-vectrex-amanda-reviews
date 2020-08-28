import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import Stars from './Stars';
import Carousel from './Carousel';
import Pager from './Pager';
import Theme from './Theme';

const serverUrl = 'http://localhost:8888';

export const MainHeading = styled.h3`
  font-family: ${({ theme: { fonts } }) => `${fonts[1]}`};
  font-size: 26px;
  font-weight: 300;
`;

// width should be width: 100% if rendered with proxy, otherwise 830px for development
const Container = styled.div`
  font-weight: 300;
  font-family: ${(props) => props.theme.fonts[0]};
  line-height: 150%;
  letter-spacing: 0.4px;
  width: 830px;
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
      isDropdownOpen: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSortByClick = this.handleSortByClick.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
  }

  componentDidMount() {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1) || 1;
    Promise.all([
      axios.get(`${serverUrl}/review-summary/${id}`),
      axios.get(`${serverUrl}/review-list/${id}`),
      axios.get(`${serverUrl}/reviews-pictures/${id}`),
    ])
      .then(([reviewSummary, reviewList, reviewPictures]) => {
        this.setState({
          ...reviewSummary.data,
          reviewList: reviewList.data,
          reviewPictures: reviewPictures.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSortByClick(e) {
    e.preventDefault();
    const sort = e.target.value;
    this.setState((state) => ({
      sortBy: sort,
      pageNumber: 1,
      isDropdownOpen: !state.isDropdownOpen,
    }));
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1) || 1;
    axios.get(`${serverUrl}/review-list/${id}`, {
      params: {
        pageNumber: 1,
        sortBy: sort,
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

  handleDropdownClick() {
    this.setState((state) => ({
      isDropdownOpen: !state.isDropdownOpen,
    }));
  }

  handlePageClick(pageNum) {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1) || 1;
    this.setState({
      pageNumber: pageNum,
    });
    const { sortBy } = this.state;
    axios.get(`${serverUrl}/review-list/${id}`, {
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
      <Theme>
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
          <Dropdown
            isOpen={state.isDropdownOpen}
            handleDropdownClick={this.handleDropdownClick}
            handleSortByClick={this.handleSortByClick}
          />
          <Pager
            handlePageClick={this.handlePageClick}
            reviewList={state.reviewList}
            activePage={state.pageNumber}
            totalPages={Math.ceil(state.productCount / 4)}
          />
          <Carousel allImages={state.reviewPictures} />
        </Container>
      </Theme>
    );
  }
}

// TODO: change 4 to a variable
// TODO: switch between productCount or storeCount
