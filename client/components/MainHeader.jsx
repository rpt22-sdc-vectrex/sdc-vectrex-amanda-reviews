/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';
import Stars from './Stars';

const MainHeading = styled.h3`
  font-family: ${(({ theme: { fonts } }) => `${fonts[1]}`)};
  font-size: 26px;
  font-weight: 300;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  line-height: 42px;
  margin: 0 6px 0 0;
`;

class MainHeader extends React.Component {
  render() {
    const { props } = this;
    return (
      <div>
        <MainHeading>
          {props.storeCount}
          {' '}
          reviews
        </MainHeading>
        <Stars rating={props.rating} />
      </div>
    );
  }
}

export default MainHeader;
