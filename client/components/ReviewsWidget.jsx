import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewTab from './ReviewTab';
import Carousel from './Carousel';
import ReviewPager from './ReviewPager';
import Theme from './Theme';
import MainHeader from './MainHeader';

const serverUrl = 'http://localhost:8888';

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
      storeReviewCount: 0,
      rating: 0,
      productReviewCount: 0,
      reviewList: [],
      reviewPictures: [],
      pageNumber: 1,
      sortBy: 'rating',
      isDropdownOpen: false,
      activeTab: 'productReviews',
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSortByClick = this.handleSortByClick.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
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
    const { activeTab } = this.state;
    axios.get(`${serverUrl}/review-list/${id}`, {
      params: {
        pageNumber: 1,
        sortBy: sort,
        store: activeTab === 'shopReviews',
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
    const { sortBy, activeTab } = this.state;
    axios.get(`${serverUrl}/review-list/${id}`, {
      params: {
        pageNumber: pageNum,
        sortBy,
        store: activeTab === 'shopReviews',
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

  handleMenuClick(tab) {
    this.setState({
      activeTab: tab,
    });
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1) || 1;
    const { sortBy } = this.state;
    const store = tab === 'shopReviews';
    axios.get(`${serverUrl}/review-list/${id}`, {
      params: {
        pageNumber: 1,
        sortBy,
        store,
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
    const totalPages = state.activeTab === 'productReviews' ? Math.ceil(state.productReviewCount / 4) : Math.ceil(state.storeReviewCount / 4);
    return (
      <Theme>
        <Container>
          <MainHeader rating={state.rating} storeReviewCount={state.storeReviewCount} />
          <ReviewTab
            isOpen={state.isDropdownOpen}
            handleDropdownClick={this.handleDropdownClick}
            handleSortByClick={this.handleSortByClick}
            storeReviewCount={state.storeReviewCount}
            productReviewCount={state.productReviewCount}
            sortBy={state.sortBy}
            activeTab={state.activeTab}
            handleMenuClick={this.handleMenuClick}
          />
          <ReviewPager
            handlePageClick={this.handlePageClick}
            reviewList={state.reviewList}
            activePage={state.pageNumber}
            totalPages={totalPages}
          />
          <Carousel reviewPictures={state.reviewPictures} />
        </Container>
      </Theme>
    );
  }
}

// TODO: change 4 to a variable
