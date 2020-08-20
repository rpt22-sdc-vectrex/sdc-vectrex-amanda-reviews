/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
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
  color: ${(props) => props.theme.colors.middle_gray};
`;

class ProductInfo extends React.Component {
  render() {
    const { props } = this;
    return (
      <Container>
        <Paragraph>Purchased item:</Paragraph>
        <ImageSmall alt="product" src={props.mainImage} />
        <Link href="http://placehold.it">{`${props.itemName.slice(0, 60)}...`}</Link>
      </Container>
    );
  }
}

export default ProductInfo;
