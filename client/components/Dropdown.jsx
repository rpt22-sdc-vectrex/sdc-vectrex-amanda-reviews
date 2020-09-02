/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';

const DropDownContainer = styled.div`
  display: inline-flex;
  position: relative;
`;

const DropDownHeader = styled.button`
  letter-spacing: 0.4px;
  left: 7px;
  position: relative;
  color: #222222;
  font-size: 13px;
  font-family: ${(props) => props.theme.fonts[0]};
  font-weight: 500;
  line-height: 1.4;
  min-height: 36px;
  min-width: 36px;
  padding: 9px 15px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  vertical-align: middle;
  text-transform: none;
  margin: 0;
  z-index: 20;
  border-radius: 24px;
  ::before {
    transition: transform 200ms cubic-bezier(0.345, 0.115, 0.135, 1.42),opacity 150ms ease-out;
    box-shadow: 0 4px 20px rgba(34, 34, 34, 0.15);
    opacity: 0;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    border: inherit;
    border-radius: inherit;
    background: #222222;
    transform: scale(0.7) perspective(1px);
  }
  ${(props) => (props.isOpen ? '' : `
    &:hover::before {
      opacity: 0.075;
      transform: scale(1) perspective(1px);
    }
    &:active::before {
      opacity: 0.15;
      transform: scale(0.95) perspective(1px);
    }
  `)}
  `;

const SvgContainer = styled.span`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  vertical-align: middle;
  width: 24px;
  box-sizing: border-box;
  margin:0;
  font-size: 13px;
  line-height: 1.4;
  color: #222222;
  font: inherit;
  cursor: pointer;
  font-weight: 400;
  text-transform: none;
`;

const TextContainer = styled.span`
  position: relative;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  color: #222222;
  text-align: left;
  cursor: pointer;
  font-weight: 500;
  text-transform: none;
`;

const Svg = styled.svg`
  display:block;
  overflow: hidden;
  fill: currentColor;
  text-align: left;
`;

const DropDownSortBy = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px rgba(34, 34, 34, 0.15) solid;
  box-shadow: 0 4px 20px rgba(34, 34, 34, 0.15);
  min-width: 100%;
  max-width: 300px;
  overflow: hidden;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts[0]};
  max-height: 480px;
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 0;
  padding-top: 40px;
  z-index: 10;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: scaleX(${(props) => (props.isOpen ? 1 : 0.5)}) scaleY(${(props) => (props.isOpen ? 1 : 0.2)}) perspective(1px);
  transform-origin: top left;
  transition: opacity ${(props) => (props.isOpen ? 180 : 0)}ms ease-out, transform ${(props) => (props.isOpen ? 180 : 0)}ms cubic-bezier(0.175, 0.885, 0.4, 1.1);
`;

const ListItem = styled.button`
  font-size: 13px;
  background: none;
  border: none;
  font-weight: 300;
  font-family: ${(props) => props.theme.fonts[0]};
  letter-spacing: inherit;
  cursor: pointer;
  text-align: left;
  outline: none;
  text-decoration: none;
  transition: background-color 100ms ease-out;
  color: #222222;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  max-width: 298px;
  min-width: 100%;
  box-sizing: border-box;
  padding: 12px 18px;
  &:hover {
    background-color: #efefef;
  };
  ${(props) => props.isSelected && `
  ::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Cpath fill%3D%22%23222222%22 d%3D%22M10.55 16.97L6.3 12.7a1 1 0 0 1 1.42-1.42l2.74 2.74 5.8-6.68a1 1 0 0 1 1.5 1.3l-7.2 8.32z%22%2F%3E%3C%2Fsvg%3E");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    margin-right: -2px;
    min-width: 24px;
    width: 24px;
    height: 18px;
    content: "";
  };
  `}
`;

class Dropdown extends React.Component {
  render() {
    const { props } = this;
    return (
      <DropDownContainer>
        <DropDownHeader
          type="button"
          isOpen={props.isOpen}
          onClick={(e) => {
            e.preventDefault();
            props.handleDropdownClick();
          }}
        >
          <TextContainer>
            Sort by:
            {' '}
            {props.sortBy === 'rating' ? 'Recommended' : 'Newest'}
          </TextContainer>
          <SvgContainer>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polygon points="16.5 10 12 16 7.5 10 16.5 10" /></Svg>
          </SvgContainer>
        </DropDownHeader>
        <DropDownSortBy isOpen={props.isOpen}>
          <ListItem isSelected={props.sortBy === 'rating'} type="button" value="rating" onClick={props.handleSortByClick}>
            Recommended
          </ListItem>
          <ListItem isSelected={props.sortBy === 'date'} type="button" value="date" onClick={props.handleSortByClick}>
            Newest
          </ListItem>
        </DropDownSortBy>
      </DropDownContainer>
    );
  }
}

export default Dropdown;
