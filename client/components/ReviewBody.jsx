import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Stars from './Stars';
import ReviewImage from './ReviewImage';

const Container = styled.div`
  display: flex;
`;

const TextContainer = styled.div`
  margin: 0 48px;
  flex: 3 1;
`;

const ImageContainer = styled.div`
  flex: 1 1;
`;

const Paragraph = styled.p`
  margin: 0 0 16px 0;
  padding-right: 30px;
  color: ${(props) => props.theme.colors.darkGray};
`;

const ReviewBody = (props) => {
  const { info } = props;
  return (
    <Container>
      <TextContainer>
        <Stars rating={info.rating} />
        <Paragraph>{info.text}</Paragraph>
      </TextContainer>
      {/* conditional expression in jsx, short circuit - it's like break in for loops ->
        bcz it's an expression it could be used inside a return statement */}
      {info.reviewPicture && (
        <ImageContainer>
          <ReviewImage alt="user_uploaded" src={info.reviewPicture} />
        </ImageContainer>
      )}
    </Container>
  );
};

ReviewBody.propTypes = {
  info: PropTypes.arrayOf(PropTypes.object).isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  reviewPicture: PropTypes.string.isRequired,
};

export default ReviewBody;
