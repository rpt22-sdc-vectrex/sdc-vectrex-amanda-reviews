import React from 'react';
import axios from 'axios';
import ReviewTab from '../ReviewTab/ReviewTab';
import Carousel from '../Carousel/Carousel';
import ReviewPager from '../ReviewPager/ReviewPager';
import MainHeader from '../MainHeader/MainHeader';
import ReviewsWidgetContainer from './ReviewsWidget.styles';

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
      username: '',
      text: '',
      review_id: 0
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSortByClick = this.handleSortByClick.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    const id = ReviewsWidget.getId();

    axios.get(`/review-summary/${id}`)
      .then((reviewSummary) => {
        console.log('💥 reviewSummary: ', reviewSummary);
        this.setState({
          ...reviewSummary.data,
        });
      });
    axios.get(`/review-list/${id}`)
      .then((reviewList) => {
        this.setState({
          reviewList: reviewList.data,
        });
      });
    axios.get(`/reviews-pictures/${id}`)
      .then((reviewPictures) => {
        this.setState({
          reviewPictures: reviewPictures.data,
        });
      });
    axios.get(`/reviews-service/${id}`)
      .then((reviews) => {
        console.log('reviews data by review id: ', reviews.data);
        this.setState({
          username: reviews.data.username,
          text: reviews.data.text,
          review_id: reviews.data.review_id,
        });
      });
  }

  static getId() {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1) || 1;
    return id;
  }

  getReviews(id, pageNumber, sortBy, store) {
    axios.get(`/review-list/${id}`, {
      params: {
        pageNumber,
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

  handleSortByClick(e) {
    const sort = e.target.value;
    this.setState((state) => ({
      sortBy: sort,
      pageNumber: 1,
      isDropdownOpen: !state.isDropdownOpen,
    }));
    const id = ReviewsWidget.getId();
    const { activeTab } = this.state;
    this.getReviews(id, 1, sort, activeTab === 'shopReviews');
  }

  handleDropdownClick() {
    this.setState((state) => ({
      isDropdownOpen: !state.isDropdownOpen,
    }));
  }

  handlePageClick(pageNum) {
    const id = ReviewsWidget.getId();
    this.setState({
      pageNumber: pageNum,
    });
    const { sortBy, activeTab } = this.state;
    this.getReviews(id, pageNum, sortBy, activeTab === 'shopReviews');
  }

  handleMenuClick(tab) {
    this.setState({
      activeTab: tab,
      pageNumber: 1,
    });
    const id = ReviewsWidget.getId();
    const { sortBy } = this.state;
    const store = tab === 'shopReviews';
    this.getReviews(id, 1, sortBy, store);
  }

  render() {
    const { state } = this;
    const reviewPerPage = 4;
    const totalPages = state.activeTab === 'productReviews' ? Math.ceil(state.productReviewCount / reviewPerPage) : Math.ceil(state.storeReviewCount / reviewPerPage);
    return (
      <ReviewsWidgetContainer>
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
      </ReviewsWidgetContainer>
    );
  }
}


// rating: reviews.data.rating,
