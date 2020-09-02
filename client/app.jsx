import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsWidget from './components/ReviewsWidget/ReviewsWidget';
import Theme from './components/Theme';

ReactDOM.render(
  <Theme>
    <ReviewsWidget />
  </Theme>,
  document.getElementById('reviews'),
);
