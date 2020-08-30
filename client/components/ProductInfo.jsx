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
  const { mainImage, itemName, id } = props;
  return (
    <Container>
      <Paragraph>Purchased item:</Paragraph>
      <ImageSmall alt="product" src={mainImage} />
      <Link href={`/${id}`}>{`${itemName.slice(0, 60)}...`}</Link>
    </Container>
  );
};

ProductInfo.propTypes = {
  mainImage: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ProductInfo;
