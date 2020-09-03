import React from 'react';
import PropTypes from 'prop-types';
import Link from '../shared/Link';
import ImageSmall from '../shared/ImageSmall';
import {
  ProductInfoContainer,
  Paragraph,
} from './ProductInfo.styles';

const ProductInfo = (props) => (
  <ProductInfoContainer>
    <Paragraph>Purchased item:</Paragraph>
    <ImageSmall alt="product" src={props.mainImage} />
    <Link href={`/${props.product_id}`}>{`${props.itemName.slice(0, 60)}...`}</Link>
  </ProductInfoContainer>
);

ProductInfo.defaultProps = {
  mainImage: '',
  itemName: '',
  product_id: 1,
};

ProductInfo.propTypes = {
  mainImage: PropTypes.string,
  itemName: PropTypes.string,
  product_id: PropTypes.number,
};

export default ProductInfo;
