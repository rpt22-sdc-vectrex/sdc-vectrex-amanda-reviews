import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewList from './components/ReviewList';
import Dropdown from './components/Dropdown';
import Stars from './components/Stars';
import Carousel from './components/Carousel';
import Pager from './components/Pager';

class App extends React.Component {
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
      // .then((resp) => { console.log(resp); return resp; })
      .then((response) => {
        this.setState({
          reviewData: response.data,
        }, () => console.log(this.state.reviewData));
      });
  }

  render() {
    const { state } = this;
    return (
      <div>
        <h3>68 reviews</h3>
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

ReactDOM.render(<App />, document.getElementById('reviews'));
