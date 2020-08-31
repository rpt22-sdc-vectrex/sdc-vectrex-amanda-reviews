import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import Menu from './Menu';

const Container = styled.div`
  margin-bottom: 20px;
  overflow: visible;
  width: auto;
  padding-left: 0px;
`;

const DropdownCont = styled.div`
  justify-content: flex-end;
  display: flex;
  box-sizing: border-box;
  margin-top: 6px;
  width: 830px;
`;

const ReviewTab = (props) => (
  <Container>
    <Menu
      storeCount={props.storeCount}
      productCount={props.productCount}
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
  productCount: PropTypes.number.isRequired,
  storeCount: PropTypes.number.isRequired,
};

export default ReviewTab;
