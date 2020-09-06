import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ReviewsWidget from './components/ReviewsWidget/ReviewsWidget';
import Theme from './components/Theme';

const ReviewContainer = styled.div`
  margin-right: 10%;
`;

ReactDOM.render(
  <Theme>
    <ReviewContainer>
      <ReviewsWidget />
    </ReviewContainer>
  </Theme>,
  document.getElementById('reviews'),
);
