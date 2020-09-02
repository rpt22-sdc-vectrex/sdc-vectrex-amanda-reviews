import React from 'react';
import PropTypes from 'prop-types';
import ArrowButton from '../shared/ArrowButton';
import {
  Container,
  Heading,
  CarouselInner,
  CarouselOuter,
  ListItem,
  ReviewImageListItem,
  Svg,
} from './Carousel.styles';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstItemIndex: 0,
      translate: 0,
    };
  }

  handleLeftArrowClick() {
    this.setState((state) => ({
      firstItemIndex: state.firstItemIndex - 4,
      translate: state.translate + 100,
    }));
  }

  handleRightArrowClick() {
    this.setState((state) => ({
      firstItemIndex: state.firstItemIndex + 4,
      translate: state.translate - 100,
    }));
  }

  render() {
    const { props } = this;
    const { state } = this;
    return (
      <Container>
        <Heading>Photos from reviews</Heading>
        {state.firstItemIndex > 0
          && (
          <ArrowButton isLeft translate={state.translate} aria-label="arrow" type="button" onClick={() => this.handleLeftArrowClick()}>
            <Svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M16,21a0.994,0.994,0,0,1-.664-0.253L5.5,12l9.841-8.747a1,1,0,0,1,1.328,1.494L8.5,12l8.159,7.253A1,1,0,0,1,16,21Z" />
            </Svg>
          </ArrowButton>
          )}
        <CarouselOuter>
          <CarouselInner translate={state.translate}>
            {props.reviewPictures.map((image) => (
              <ListItem key={image[0]}>
                <ReviewImageListItem alt="review" src={image[1]} />
              </ListItem>
            ))}
          </CarouselInner>
        </CarouselOuter>
        {state.firstItemIndex + 4 < props.reviewPictures.length
          && (
          <ArrowButton isLeft={false} translate={state.translate} aria-label="arrow" type="button" onClick={() => this.handleRightArrowClick()}>
            <Svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M8,21a1,1,0,0,1-.664-1.747L15.5,12,7.336,4.747A1,1,0,0,1,8.664,3.253L18.5,12,8.664,20.747A0.994,0.994,0,0,1,8,21Z" />
            </Svg>
          </ArrowButton>
          )}
      </Container>
    );
  }
}

Carousel.propTypes = {
  reviewPictures: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.oneOf([null]),
  ])).isRequired,
};

export default Carousel;
