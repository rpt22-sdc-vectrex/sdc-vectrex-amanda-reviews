/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import Menu from './Menu';

const Container = styled.div`
  margin-bottom: 24px;
  overflow: visible;
  width: auto;
  padding-left: 0px;
`;

const DropdownCont = styled.div`
  justify-content: flex-end;
  display: flex;
  box-sizing: border-box;
  margin-top: 6px;

`;

// border: ${(props) => (props.isOpen ? '1px solid #dedede' : 'none')};
// border-radius: 12px;

class ReviewTab extends React.Component {
  render() {
    const { props } = this;
    return (
      <Container>
        <Menu
          storeCount={props.storeCount}
          productCount={props.productCount}
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
  }
}

export default ReviewTab;
