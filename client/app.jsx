import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from './components/ReviewList';
import Dropdown from './components/Dropdown';
import Stars from './components/Stars';
import Carousel from './components/Carousel';
import Pager from './components/Pager';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: [],
    };
  }

  componentDidMount() {
    // fetch data, research how to get id from url
  }

  render() {
    const { state } = this;
    return (
      <div>
        <h3>68 reviews</h3>
        <Stars />
        <div>
          <button type="button" className="itemReviews">
            Reviews for this item 25
          </button>
          <button type="button" className="shopReviews">
            Reviews for his shop 68
          </button>
        </div>
        <Dropdown />
        <ReviewList reviewData={state.reviewData} />
        <Pager />
        <Carousel />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('reviews'));
