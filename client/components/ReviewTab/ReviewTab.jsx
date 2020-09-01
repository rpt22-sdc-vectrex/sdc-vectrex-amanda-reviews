import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';
import Menu from '../Menu/Menu';
import {
  Container,
  DropdownCont,
} from './ReviewTab.styles';

const ReviewTab = (props) => (
  <Container>
    <Menu
      storeReviewCount={props.storeReviewCount}
      productReviewCount={props.productReviewCount}
      activeTab={props.activeTab}
      handleMenuClick={props.handleMenuClick}
    />
    <DropdownCont>
      <Dropdown
        sortBy={props.sortBy}
        isOpen={props.isOpen}
        handleDropdownClick={props.handleDropdownClick}
        handleSortByClick={props.handleSortByClick}
      />
    </DropdownCont>
  </Container>
);

ReviewTab.propTypes = {
  handleSortByClick: PropTypes.func.isRequired,
  handleDropdownClick: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  productReviewCount: PropTypes.number.isRequired,
  storeReviewCount: PropTypes.number.isRequired,
};

export default ReviewTab;
