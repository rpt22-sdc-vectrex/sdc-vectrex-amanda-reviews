import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Heading = styled.h4`
  font-weight: ${(props) => props.theme.fontWeight.light};
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

export const Svg = styled.svg`
  height: 24px;
  width: 24px;
`;
