/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';

const DropDownContainer = styled.div`
  
`;

const DropDownHeader = styled.button`
  
`;

const DropDownSortBy = styled.div`
  
`;

const DropDownList = styled.div`

`;

const ListItem = styled.button`
  display:block;
`;

class Dropdown extends React.Component {
  render() {
    const { props } = this;
    return (
      <DropDownContainer>
        <DropDownHeader
          type="button"
          onClick={(e) => {
            e.preventDefault();
            props.handleDropdownClick();
          }}
        >
          Sort by:
        </DropDownHeader>
        <DropDownSortBy>
          {props.isOpen
            && (
              <DropDownList>
                <ListItem type="button" value="rating" onClick={props.handleSortByClick}>
                  Recommended
                </ListItem>
                <ListItem type="button" value="date" onClick={props.handleSortByClick}>
                  Newest
                </ListItem>
              </DropDownList>
            )}
        </DropDownSortBy>
      </DropDownContainer>
    );
  }
}

export default Dropdown;
