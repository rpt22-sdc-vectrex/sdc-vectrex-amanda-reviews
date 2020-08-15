/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class ProductInfo extends React.Component {
  render() {
    const { props } = this;
    return (
      <div>
        <p>Purchased item:</p>
        <img alt="product" src={props.mainImage} />
        <p>{props.itemName}</p>
      </div>
    );
  }
}

export default ProductInfo;
