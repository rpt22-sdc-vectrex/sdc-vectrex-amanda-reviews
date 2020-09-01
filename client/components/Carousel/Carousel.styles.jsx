import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Heading = styled.h4`
  font-weight: 300;
  margin-bottom: 12px;
  line-height: 28px;
  padding: 9px;
`;

export const CarouselOuter = styled.div`
  overflow-x: hidden;
  position: relative;
`;

export const CarouselInner = styled.ul`
  margin-top: 0;
  list-style: none;
  padding: 0px;
  display: flex;
  flex-wrap: nowrap;
  transform: translate(${(props) => props.translate}%, 0);
  transition: transform 0.3s ease-out;
`;

export const ListItem = styled.li`
  padding: 0 9px 9px;
  box-sizing: border-box;
  max-width: 25%;
  flex-basis: 25%;
  flex-grow: 1;
  flex-shrink: 0;
`;

export const ReviewImageListItem = styled.img`
  width: 100%;
  border-radius: 6px;
`;

export const ButtonLeft = styled.button`
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

export const ButtonRight = styled.button`
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

export const Svg = styled.svg`
  height: 24px;
  width: 24px;
`;
