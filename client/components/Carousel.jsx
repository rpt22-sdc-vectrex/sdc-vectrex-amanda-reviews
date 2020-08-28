/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
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
  list-style: none;
  padding: 0px;
  display: flex;
  flex-wrap: nowrap;
  transform: translate(${(props) => props.translate}px, 0);
  transition: transform 0.3s ease-out;
`;

// transform: translate(${(props) => props.translate}px, 0);
// transform: translate(${(props) => `${props.translate}px;`}, 0);
//   left: ${(props) => props.translate};

const ListItem = styled.li`
  padding: 0 9px 9px;
  box-sizing: border-box;
  max-width: 25%;
  flex-basis: 25%;
  flex-grow: 1;
  flex-shrink: 0;
`;
  // &:nth-child(1) {
  //   padding-left: 0;
  //   left: 0;
  // }
  // &:nth-child(4) {
  //   padding-right: 0;
  // }

const ReviewImageListItem = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

const ButtonLeft = styled.button`
  position: absolute;
  top: 48%;
  left: 0%;
  margin-left: 24px;
  height: 48px;
  width: 48px;
  padding: 12px;
  border-radius: 24px;
  background-color: #fff;
  border: none;
  outline: none;
  z-index: 1;
`;

const SvgLeft = styled.svg`
  height: 20px;
  width: 20px;
`;

const ButtonRight = styled.button`
  position: absolute;
  top: 48%;
  left: 100%;
  margin-left: -67px;
  height: 48px;
  width: 48px;
  padding: 12px;
  border-radius: 24px;
  background-color: #fff;
  border: none;
  outline: none;
`;

const SvgRight = styled.svg`
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
    }), () => console.log(this.state));
  }

  handleRightArrowClick() {
    this.setState((state) => ({
      firstItemIndex: state.firstItemIndex + 4,
      translate: state.translate - 828,
    }), () => console.log(this.state));
  }

  render() {
    const { props } = this;
    const { state } = this;
    return (
      <Container>
        <Heading>Photos from reviews</Heading>
        {/* Arrow conditional: */}
        {state.firstItemIndex > 0
          && <ButtonLeft translate={state.translate} aria-label="arrow" type="button" onClick={() => this.handleLeftArrowClick()}><SvgLeft fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="3 3 18 18" aria-hidden="true" focusable="false"><path d="M16,21a0.994,0.994,0,0,1-.664-0.253L5.5,12l9.841-8.747a1,1,0,0,1,1.328,1.494L8.5,12l8.159,7.253A1,1,0,0,1,16,21Z" /></SvgLeft></ButtonLeft>}
        <CarouselOuter>
          <CarouselInner translate={state.translate}>
            {props.allImages.map((image) => (
              <ListItem key={image[0]}>
                <ReviewImageListItem alt="review" src={image[1]} />
              </ListItem>
            ))}
          </CarouselInner>
        </CarouselOuter>
        {/* Arrow conditional: */}
        {state.firstItemIndex + 4 < props.allImages.length
          && <ButtonRight translate={state.translate} aria-label="arrow" type="button" onClick={() => this.handleRightArrowClick()}><SvgRight fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8,21a1,1,0,0,1-.664-1.747L15.5,12,7.336,4.747A1,1,0,0,1,8.664,3.253L18.5,12,8.664,20.747A0.994,0.994,0,0,1,8,21Z" /></SvgRight></ButtonRight>}
      </Container>
    );
  }
}

export default Carousel;
