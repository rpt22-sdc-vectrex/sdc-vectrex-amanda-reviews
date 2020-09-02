import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars/Stars';
import {
  ReviewImage,
  ReviewBodyContainer,
  TextContainer,
  Paragraph,
  ImageContainer,
} from './ReviewBody.styles';

const ReviewBody = (props) => (
  <ReviewBodyContainer>
    <TextContainer>
      <Stars rating={props.rating} />
      <Paragraph>{props.text}</Paragraph>
    </TextContainer>
    {props.reviewPicture && (
    <ImageContainer>
      <ReviewImage alt="user_uploaded" src={props.reviewPicture} />
    </ImageContainer>
    )}
  </ReviewBodyContainer>
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
