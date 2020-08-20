import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ReviewsWidget from './components/ReviewsWidget';
import Theme from './components/Theme';

// width will be changed to 100%
const Container = styled.div`
  width: 810px;
  font-family: ${(props) => props.theme.fonts[0]};
  line-height: 150%;
  letter-spacing: 0.4px;
`;

ReactDOM.render(
  <Theme>
    <Container>
      <ReviewsWidget />
    </Container>
  </Theme>,
  document.getElementById('reviews'),
);
