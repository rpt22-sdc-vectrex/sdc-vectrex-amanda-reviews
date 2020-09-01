import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars/Stars';
import ReviewImage from '../shared/ReviewImage';
import {
  Container,
  TextContainer,
  Paragraph,
  ImageContainer,
} from './ReviewBody.styles';

const ReviewBody = (props) => (
  <Container>
    <TextContainer>
      <Stars rating={props.rating} />
      <Paragraph>{props.text}</Paragraph>
    </TextContainer>
    {props.reviewPicture && (
    <ImageContainer>
      <ReviewImage alt="user_uploaded" src={props.reviewPicture} />
    </ImageContainer>
    )}
  </Container>
);

ReviewBody.defaultProps = {
  rating: 0,
  text: '',
  reviewPicture: '',
};

ReviewBody.propTypes = {
  rating: PropTypes.number,
  text: PropTypes.string,
  reviewPicture: PropTypes.string,
};

export default ReviewBody;
