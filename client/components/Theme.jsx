import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  colors: {
    darkGray: '#222222',
    middleGray: '#595959',
    lightGray: '#b1b1b1',
    paleGray: '#aaaaaa',
  },
  fontSize: {
    extraSmall: '13px',
    small: '14px',
    normal: '16px',
    large: '26px',
  },
  fontWeight: {
    light: '300',
    regular: '400',
    boldish: '500',
    bold: '700',
  },
  fontShorthand: {
    baseMain: '300 16px/150% Roboto',
    smallMain: '300 13px/150% Roboto',
    boldMain: '500 13px/150% Roboto',
    badgeMain: '400 13px/1 Roboto',
    baseHeading: '300 26px/42px GuardianEgypt, Merriweather, serif',
  },
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

Theme.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
  ]).isRequired,
};

export default Theme;
