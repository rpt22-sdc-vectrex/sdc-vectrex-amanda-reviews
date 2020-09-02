/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  colors: {
    darkGray: '#222222',
    middleGray: '#595959',
    lightGray: '#b1b1b1',
    paleGray: '#aaaaaa',
  },
  // TODO : make it an object
  fonts: ['Roboto', 'GuardianEgypt'],
};

const FontsStyle = createGlobalStyle`
  @font-face {
    font-family: 'GuardianEgypt';
    src: url('GuardianEgyp-Light-Web.woff2') format('woff2'),
         url('GuardianEgyp-Light-Web.woff') format('woff');
    font-weight:  300;
    font-style:   normal;
    font-stretch: normal;
  }
`;

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <FontsStyle />
    {children}
  </ThemeProvider>
);

export default Theme;
