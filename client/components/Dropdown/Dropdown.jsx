import React from 'react';
import PropTypes from 'prop-types';
import {
  DropDownContainer,
  DropDownHeader,
  TextContainer,
  SvgContainer,
  Svg,
  DropDownList,
  ListItem,
} from './Dropdown.styles';

const Dropdown = (props) => (
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
    <DropDownList isOpen={props.isOpen}>
      <ListItem isSelected={props.sortBy === 'rating'} value="rating" onClick={props.handleSortByClick}>
        Recommended
      </ListItem>
      <ListItem isSelected={props.sortBy === 'date'} value="date" onClick={props.handleSortByClick}>
        Newest
      </ListItem>
    </DropDownList>
  </DropDownContainer>
);

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  handleDropdownClick: PropTypes.func.isRequired,
  handleSortByClick: PropTypes.func.isRequired,
};

export default Dropdown;
