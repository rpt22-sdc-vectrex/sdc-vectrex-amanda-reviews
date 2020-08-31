import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from './Link';
import ImageSmall from './ImageSmall';

const Container = styled.div`
  margin-left: 48px;
  font-size: 13px;
`;

const Paragraph = styled.p`
  margin-top: 0px;
  margin-bottom: 3px;
  color: ${(props) => props.theme.colors.middleGray};
`;

const ProductInfo = (props) => {
  const { info } = props;
  return (
    <Container>
      <Paragraph>Purchased item:</Paragraph>
      <ImageSmall alt="product" src={info.mainImage} />
      <Link href={`/${info.product_id}`}>{`${info.itemName.slice(0, 60)}...`}</Link>
    </Container>
  );
};

ProductInfo.defaultProps = {
  info: {},
  mainImage: '',
  itemName: '',
  product_id: 1,
};

ProductInfo.propTypes = {
  info: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.oneOf([null]),
  ])),
  mainImage: PropTypes.string,
  itemName: PropTypes.string,
  product_id: PropTypes.number,
};

export default ProductInfo;
