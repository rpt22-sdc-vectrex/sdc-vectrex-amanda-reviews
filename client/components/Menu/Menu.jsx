import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  MenuButton,
  Badge,
} from './Menu.styles';

const Menu = (props) => (
  <Container>
    <MenuButton
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
