/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(34, 34, 34, 0.15);
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #222;
`;

const MenuButton = styled.div`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-align: left;
  outline: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 12px 0;
  margin: 0 12px 0;
  position: relative;
  font-size: 16px;
  box-sizing: border-box;
  text-transform: none;
  &:nth-child(1) {
    margin-left: 0;
  }
`;

const Badge = styled.span`
  background: #eaeaea;
  border-radius: 15px;
  color: inherit;
  display: inline-block;
  word-break: break-word;
  line-height: 1;
  font-size: 13px;
  font-weight: normal;
  padding: 6px 9px;
  min-width: 25px;
  margin-left: 12px !important;
  box-sizing: border-box;
}
`;

class Menu extends React.Component {
  render() {
    const { props } = this;
    return (
      <Container>
        <MenuButton type="button" className="itemReviews">
          Reviews for this item
          {' '}
          <Badge>{props.productCount}</Badge>
        </MenuButton>
        <MenuButton type="button" className="shopReviews">
          Reviews for this shop
          {' '}
          <Badge>{props.storeCount}</Badge>
        </MenuButton>
      </Container>
    );
  }
}

export default Menu;
