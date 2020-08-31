import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(34, 34, 34, 0.15);
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #222;
`;

const MenuButton = styled.button`
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
  ::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: -2px;
    width: 0;
    border-bottom: 2px solid rgba(34, 34, 34, 0.5);
    left: 50%;
    transform: translateX(-50%);
    transition: width 200ms cubic-bezier(0.54, 0, 0.54, 1);
    ${(props) => props.isActive && `
    width: 100%;
    border-bottom-color: #222222;
    `}
  }
  &:hover::after {
    width: 100%;
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

const Menu = (props) => (
  <Container>
    <MenuButton
      type="button"
      value="productReviews"
      isActive={props.activeTab === 'productReviews'}
      onClick={(e) => {
        e.preventDefault();
        props.handleMenuClick(e.target.value);
      }}
    >
      Reviews for this item
      {' '}
      <Badge>{props.productReviewCount}</Badge>
    </MenuButton>
    <MenuButton
      type="button"
      value="shopReviews"
      isActive={props.activeTab === 'shopReviews'}
      onClick={(e) => {
        e.preventDefault();
        props.handleMenuClick(e.target.value);
      }}
    >
      Reviews for this shop
      {' '}
      <Badge>{props.storeReviewCount}</Badge>
    </MenuButton>
  </Container>
);

Menu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  productReviewCount: PropTypes.number.isRequired,
  storeReviewCount: PropTypes.number.isRequired,
};

export default Menu;
