/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';
import Stars from './Stars';
import ReviewImage from './ReviewImage';

const Container = styled.div`
  display: flex;
`;

const TextContainer = styled.div`
  margin-left: 48px;
  margin-right: 48px;
  flex: 3 1;
`;

const ImageContainer = styled.div`
  flex: 1 1;
`;

const Paragraph = styled.p`
  margin-top: 0px;
  margin-bottom: 16px;
  padding-right: 30px;
  color: ${(props) => props.theme.colors.dark_gray};
`;

class ReviewBody extends React.Component {
  render() {
    const { props } = this;
    return (
      <Container>
        <TextContainer>
          <Stars rating={props.info.rating} />
          <Paragraph>{props.info.text}</Paragraph>
        </TextContainer>
        {/* conditional expression in jsx, short circuit - it's like break in for loops ->
        bcz it's an expression it could be used inside a return statement */}
        {props.info.reviewPicture && (
        <ImageContainer>
          <ReviewImage alt="user_uploaded" src={props.info.reviewPicture} />
        </ImageContainer>
        )}
      </Container>
    );
  }
}

export default ReviewBody;
