import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Heading = styled.h4`
  font-weight: 300;
  margin-bottom: 12px;
  line-height: 28px;
  padding: 9px;
`;

const CarouselOuter = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const CarouselInner = styled.ul`
  margin-top: 0;
  list-style: none;
  padding: 0px;
  display: flex;
  flex-wrap: nowrap;
  transform: translate(${(props) => props.translate}px, 0);
  transition: transform 0.3s ease-out;
`;

const ListItem = styled.li`
  padding: 0 9px 9px;
  box-sizing: border-box;
  max-width: 25%;
  flex-basis: 25%;
  flex-grow: 1;
  flex-shrink: 0;
`;

const ReviewImageListItem = styled.img`
  width: 100%;
  border-radius: 6px;
`;

const ButtonLeft = styled.button`
  position: absolute;
  top: 50%;
  left: 0%;
  margin-left: 24px;
  margin-top: -12px;
  height: 48px;
  width: 48px;
  padding: 12px;
  border-radius: 24px;
  background-color: #fff;
  border: none;
  outline: none;
  z-index: 1;
`;

const ButtonRight = styled.button`
  position: absolute;
  top: 50%;
  left: 100%;
  margin-left: -67px;
  margin-top: -12px;
  height: 48px;
  width: 48px;
  padding: 12px;
  border-radius: 24px;
  background-color: #fff;
  border: none;
  outline: none;
`;

const Svg = styled.svg`
  height: 24px;
  width: 24px;
`;

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
      translate: state.translate + 828,
    }));
  }

  handleRightArrowClick() {
    this.setState((state) => ({
      firstItemIndex: state.firstItemIndex + 4,
      translate: state.translate - 828,
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
          <ButtonLeft translate={state.translate} aria-label="arrow" type="button" onClick={() => this.handleLeftArrowClick()}>
            <Svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M16,21a0.994,0.994,0,0,1-.664-0.253L5.5,12l9.841-8.747a1,1,0,0,1,1.328,1.494L8.5,12l8.159,7.253A1,1,0,0,1,16,21Z" />
            </Svg>
          </ButtonLeft>
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
          <ButtonRight translate={state.translate} aria-label="arrow" type="button" onClick={() => this.handleRightArrowClick()}>
            <Svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M8,21a1,1,0,0,1-.664-1.747L15.5,12,7.336,4.747A1,1,0,0,1,8.664,3.253L18.5,12,8.664,20.747A0.994,0.994,0,0,1,8,21Z" />
            </Svg>
          </ButtonRight>
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
